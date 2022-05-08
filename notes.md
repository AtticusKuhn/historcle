This query
```
PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>

SELECT ?a3 ?point1 ?point2  WHERE {
 :Samuel_Adams dbp:birthPlace ?birth1 .
 :George_V dbp:birthPlace ?birth2 .
 ?birth1 geo:geometry ?point1 .
 ?birth2 geo:geometry ?point2 .
}
```
sometimes works and sometimes fails

This query seems to always work?

```
PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>

SELECT ?A11 ?point1 ?point2  WHERE {
 ?birth1 geo:geometry ?point1 . 
 ?birth2 geo:geometry ?point2 .  #e
 :Samuel_Adams dbp:birthPlace ?birth1 . #e
 :George_V dbp:birthPlace ?birth2 . 
}
```