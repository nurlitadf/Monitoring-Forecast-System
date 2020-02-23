import requests
from bs4 import BeautifulSoup
import re
import sys
import os
import pymysql

URL = "https://ftp.cpc.ncep.noaa.gov/International/nmme/monthly_nmme_forecast_in_cpt_format/"
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
	key = (item[1], item[7], item[2]) #model, month, year
	value = item[3] #created_date
	data[key] = value

resp = requests.get(URL + '?C=M;O=D')
if not resp.ok:
	print("API fetch failed")
	sys.exit(1)
soup = BeautifulSoup(resp.text, 'html.parser')
anchor = soup.find_all('a')
for anc in anchor:
	res = re.search('href(.)*_tmp2m(.)*(2019|2020)\.txt\">', str(anc))

	if res:
		res = res.group(0)
		model = re.search('"([a-z]+[0-9]*)', res).group(0)[1:]
		new_url = URL + res[6:-2]
		frc = requests.get(new_url)
		print(new_url)
		if not frc.ok:
			print("failed fetch forecast data")
			sys.exit(1)
		splitted = frc.text.split()
		predict = "".join(list(splitted[5])[6:-1]).split('-')
		created = "".join(list(splitted[6])[6:-1])
		print(model + " for prediction date: ", predict)
		key = (model, predict[1], predict[0], -12, 94)
		will_query = True
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
			key = (model, predict[1], predict[0])
			data[key] = created
			txt = splitted[(373 + 361 * 83):(373 + 361 * 103)]
			latlng = []
			for i in range(0, len(txt), 361):
				latlng.append(txt[(i + 95):(i + 144)])
			lat_cnt = -12
			for lat in latlng:
				lng_cnt = 94
				for lng in lat:
					if not will_update:
						sql = """insert into data(model, year, created_date, latitude, longitude, value, month) values ('%s', '%s', '%s', '%s', '%s', '%s', '%s')""" % (model, predict[0], created, lat_cnt, lng_cnt, lng, predict[1])
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


