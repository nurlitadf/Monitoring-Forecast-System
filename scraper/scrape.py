import requests
from bs4 import BeautifulSoup
import re
import sys
import os
import pymysql
import datetime

URL = "https://ftp.cpc.ncep.noaa.gov/International/nmme/monthly_nmme_forecast_in_cpt_format/"
CURRENT_YEAR = datetime.datetime.now().year
ID_COORD = {
    'LAT_MIN' : '-12',
    'LAT_MAX' : '7',
    'LONG_MIN' : '94',
    'LONG_MAX' : '142'
}

def is_bounded(lat, lng):
    return ID_COORD['LAT_MIN'] <= lat <= ID_COORD['LAT_MAX'] and ID_COORD['LONG_MIN'] <= lng <= ID_COORD['LONG_MAX'] 

os.system("clear")
db = pymysql.connect(host="localhost", user="root", password="123", database="forecast")
cur = db.cursor()
sql = """SELECT * from data;"""
cur.execute(sql)
res = cur.fetchall()
data = dict()
for item in res:
    key = (item[1], item[7], item[2], item[8]) #model, month, year, type
    value = item[3] #created_date
    data[key] = value

resp = requests.get(URL + '?C=M;O=D')
if not resp.ok:
    print("API fetch failed")
    sys.exit(1)
soup = BeautifulSoup(resp.text, 'html.parser')
anchor = soup.find_all('a')
for anc in anchor:
  res = re.search('href(.)*(' + '|'.join(str(x) for x in range(CURRENT_YEAR - 1, CURRENT_YEAR + 2)) +')\.txt\">', str(anc))
  if res:
    res = res.group(0)
    regex_model_type = re.search('(sst|tmp2m|precip)', res)
    types = regex_model_type.group(0) 
    model = re.search('"(.)*', res[:regex_model_type.start() - 1]).group(0)[1:]
    new_url = URL + res[6:-2]
    frc = requests.get(new_url)
    print(new_url)
    if not frc.ok:
      print("failed fetch forecast data")
      sys.exit(1)
    splitted = frc.text.split(', ')
    predict = "".join(list(splitted[1])[6:]).split('-')
    created = "".join(list(splitted[2])[6:])
    splitted = frc.text.split()
    print(model + " for prediction date: ", predict)
    key = (model, predict[1], predict[0], types)
    will_query = True #change this to true for production
    will_update = False
    try:
      if data[key] >= created:
        will_query = False
      
      will_update = True
    except:
      pass
    if will_query:
      if will_update:
        print("updating...")
      else:
        print("inserting...")
    else:
      print("Skipping :)")
    if will_query == True:
      key = (model, predict[1], predict[0], types)
      data[key] = created
      start_index = splitted.index("cpt:missing=-999.00000000000000") + 362
      txt = splitted[(start_index + 361 * 83):(start_index + 361 * 103)]
      latlng = []
      for i in range(0, len(txt), 361):
        latlng.append(txt[(i + 95):(i + 144)])
      lat_cnt = -12
      for lat in latlng:
        lng_cnt = 94
        for lng in lat:
          if float(lng) != -999:
            if not will_update:
              sql = """insert into data(model, year, created_date, lat, lon, value, month, type) values ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')""" % (model, predict[0], created, lat_cnt, lng_cnt, lng, predict[1], types)
              # print(sql)
              # print("inserting " + model + " for prediction date: " +",".join(predict) + " lat lng: " + str(lat_cnt) + str(lng_cnt))    
              cur.execute(sql)  
            else:
              sql = """update data set created_date = '%s', value = '%s'""" % (created, lng)
              # print("updating " + model + " for prediction date: " + ",".join(predict) + " lat lng: " + str(lat_cnt) + str(lng_cnt))
              cur.execute(sql)
          lng_cnt = lng_cnt + 1
        lat_cnt = lat_cnt + 1
      db.commit()
    
cur.close()
db.close()
