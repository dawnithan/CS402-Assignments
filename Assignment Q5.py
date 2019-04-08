from bs4 import BeautifulSoup
from tabulate import tabulate
import urllib.request as urllib2

resp = urllib2.urlopen('http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=MLGAR&NumMins=90&format=xml')
soup = BeautifulSoup(resp, "lxml")

querytime = soup.find('querytime').contents[0]
origin = soup.find('origin').contents[0]
duein = soup.find('duein').contents[0] + " mins"
destination = soup.find('destination').contents[0]
origintime = soup.find('origintime').contents[0]
destinationtime = soup.find('destinationtime').contents[0]

header = ['Due-In', 'Destination', 'Departure', 'Arrival At Destination', 'Origin']
data = [duein, destination, origintime, destinationtime, origin]

print(("\nMullingar Station (%s):\n") % (querytime))
print(tabulate([data], headers=header, tablefmt='orgtbl'))
print()