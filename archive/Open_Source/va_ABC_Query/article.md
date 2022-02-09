# Virginia ABC Database Query
## Show which VA ABC stores near the store specified in the first argument have hard to find bottles

```python
import sys
import time
import urllib3
import xml.etree.ElementTree as ET

# Example
alloc_b = {
    #Bottle name: Product ID 
    "Buffalo Trace Bourbon 0.75L":"018006",
	"Buffalo Trace Bourbon 1.75L":"018008",
	"Elijah Craig Barrel Proof Bourbon":"017917",
	"E H Taylor Jr. Straight Rye Whiskey":"027101",
	"E H Taylor Jr. Small Batch Whiskey":"021602",
	"E H Taylor Jr. Barrel Proof Bourbon":"021600",
    "E H Taylor Jr. single barrel":"021589",
    "Eagle Rare 10 Year Bourbon 0.35L":"017764",
	"Eagle Rare 10 Year Bourbon 0.75L":"017766",
    "Eagle Rare 10 Year Bourbon 1.75L":"017768",
    "Elmer T Lee Bourbon":"017946",
    "WL Weller Special Reserve Bourbon 0.75L":"021986",
    "WL Weller Special Reserve Bourbon 1.75L":"021988",
    "Old Weller Antique 107 Bourbon":"022036",
    "Stagg Jr.":"021540",
    "1792 Bottled In Bond Kentucky Straight Bourbon":"016466",
    "George Dickel Single Barrel 15 Year":"026595",
    "High West A Midwinter Nights Dram":"027041", 
    "Kentucky Owl St Patrick Edition":"019324", 
    "Michter's Single Barrel 10 Yr. Bourbon":"019876",
    "Michter's Toasted Barrel Finish Bourbon":"019872", 
    "Old Fitzgerald 8 Yr Bottled In Bond Bourbon":"016369", 
    "Old Fitzgerald 9 Year Bottled In Bond Bourbon":"016372", 
    "Old Fitzgerald 14 Yr Bib Decanter":"016375", 
    "Old Fitzgerald Bottled In Bond Decanter":"016373",
    "Orphan Barrel copper tongue 16 year":"017532", 
    "Shenks Homestead Sour Mash Whiskey":"021492", 
    "Thomas S. Moore Bourbon Port Cask":"086494", 
    "Ardbeg Arrrrrrrdbeg":"004248"
}

http = urllib3.PoolManager()

sid = int(sys.argv[1])

for name, pid in alloc_b.items():
    printed = False
    r = http.request('GET', f"https://www.abc.virginia.gov/webapi/inventory/storeNearby?storeNumber={sid}&productCode={pid}&mileRadius=15&storeCount=5&buffer=2")
    xm = r.data.decode("utf-8")
    try:
        root = ET.fromstring(xm)    
    except ET.ParseError as pe:
        continue
    for q,a in zip(root.findall(".//storeInfo/quantity"),root.findall(".//storeInfo/address")):
        if int(q.text) > 0:
            if not printed:
                print(name)
                printed = True
            print('\t'+q.text+' @ '+a.text)
    for q,a in zip(root.findall(".//nearbyStores/quantity"),root.findall(".//nearbyStores/address")):
        if int(q.text) > 0:
            if not printed:
                print(name)
                printed = True
            print('\t'+q.text+' @ '+a.text)
```