import requests
from bs4 import BeautifulSoup
# import pymysql

BASE_URL = "https://cews.bmkg.go.id/Probabilistik_Forecast/probability/"
HOME_URL = "https://cews.bmkg.go.id/Probabilistik_Forecast/One_Month_Probabilistic_Forecast.bmkg"
YEAR = 2019
DEBUG = True

if not DEBUG:
    db = pymysql.connect(host="localhost", user="root", password="123", database="forecast")
    cur = db.cursor()
    sql = "DELETE FROM data_bmkg;"
    cur.execute(sql)

with requests.Session() as sess:
    home = sess.get(HOME_URL)
    soup = BeautifulSoup(home.text, 'html.parser')
    month = [m for m in soup.find('select', {'name' : 'Month'}).findAll('option') if int(m['value'][:4]) >= YEAR]
    print(month)
    time = [t for t in soup.find('select', {'name' : 'Time'}).findAll('option')]
    print(time)
    for m in month:
        for t in time:
            m_val, t_val = str(m['value']), str(t['value'])
            m_text, t_text = str(m.text), str(t.text)
            url = BASE_URL + m_val + "/" + t_val + "/probability_map_" + m_val + "_" + t_val + "_prec.png"
            resp = sess.get(url)
            if resp.ok:
                sql = "INSERT INTO data_bmkg(initial_time, lead_time, link) VALUES ('%s', '%s', '%s')" % (m_text, t_text, url)
                print(sql)
                if not DEBUG:
                    cur.execute(sql)

if not DEBUG:
    cur.close()
    db.close()