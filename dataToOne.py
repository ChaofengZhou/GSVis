import csv
with open("data/data.csv","rb") as source:
    rdr= csv.reader( source )
    with open("result.csv","wb") as result:
        wtr= csv.writer( result )
        for r in rdr:
            wtr.writerow((r[3], r[6], r[9], r[4]))
