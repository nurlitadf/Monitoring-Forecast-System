import requests
from bs4 import BeautifulSoup
import pymysql

BASE_URL = "https://cews.bmkg.go.id/Probabilistik_Forecast/probability/"
HOME_URL = "https://cews.bmkg.go.id/Probabilistik_Forecast/One_Month_Probabilistic_Forecast.bmkg"
YEAR = 2019
DEBUG = False

log = open('error.log', 'a+')

db = pymysql.connect(host="103.146.203.231", user="root", password="", database="forecast")
cur = db.cursor()
sql = "DELETE FROM data_bmkg;"
cur.execute(sql)

with requests.Session() as sess:
        home = sess.get(HOME_URL)
        soup = BeautifulSoup(home.text, 'html.parser')
        month = [m for m in soup.find('select', {'name' : 'Month'}).findAll('option') if int(m['value'][:4]) >= YEAR]
        time = [t for t in soup.find('select', {'name' : 'Time'}).findAll('option')]

        for m in month:
                for t in time:
                    error = True
                    while error:
                            try:
                                m_val, t_val = str(m['value']), str(t['value'])
                                m_text, t_text = str(m.text), str(t.text)
                                url = BASE_URL + m_val + "/" + t_val + "/probability_map_" + m_val + "_" + t_val + "_prec.png"
                                resp = sess.get(url, timeout=3)
                                if resp.ok:
                                    error = False
                                    sql = "INSERT INTO data_bmkg(initial_time, lead_time, link) VALUES ('%s', '%s', '%s')" % (m_text, t_text, url)
                                    print(sql)
                                    if not DEBUG:
                                      cur.execute(sql)
                                elif str(resp.status_code)[0] == '4':
                                    error = False
                                        
                            except Exception as e:
                                print(str(e))
                                log.write(str(e) + '\n')


print("Closing")
db.commit()
cur.close()
db.close()
log.close()
