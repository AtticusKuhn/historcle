const table = document.getElementById("table")
const input = document.getElementById("input")
const day = document.getElementById("day")
const next = document.getElementById("next")

let guessNumber = 0
const startDate = new Date(`May 1 2022`)
const now = new Date();
const numberOfDays = Math.floor((now.getTime() - startDate.getTime()) / 86400000);
const midnight = new Date();
midnight.setHours(24);
next.innerText = ((midnight.getTime() - now.getTime()) / 3600000).toString();
day.innerText = numberOfDays.toString();
const secretPerson = people[numberOfDays]//"Richard Nixon"
console.log("the secret person is", secretPerson)
let reqs = 2
const keys = ["birthdiff", "dist"]
/* I used this query to generate the people
SELECT ?p (<LONG::IRI_RANK>(?p) as ?v) 
WHERE { 
  ?p a foaf:Person . 
  ?p dbp:birthPlace ?place .
  ?p dbp:birthDate ?birth .
  ?place <http://www.w3.org/2003/01/geo/wgs84_pos#geometry> ?point .
  FILTER ( datatype(?birth) = xsd:date) 
} 
GROUP BY ?p 
ORDER BY DESC(?v)
LIMIT 400
*/
const header = `PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX : <http://dbpedia.org/resource/>
PREFIX dbpedia2: <http://dbpedia.org/property/>
PREFIX dbpedia: <http://dbpedia.org/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>`
const makeQuery = (guess) => `SELECT ?bruh${reqs} ?birth1 ?birth2 ?image ?dist ?common ?birthdiff where { 
    VALUES ?person2 {<${secretPerson}> }
    ?person1 rdfs:label "${guess}"@en .
  
    ?person1 dbo:birthDate|dbp:birthDate ?birth1 .
    ?person2 dbp:birthDate ?birth2 .
 ?person2 dbp:birthPlace ?place2 .
    ?person1 dbo:birthPlace|dbp:birthPlace ?place1 .
  

    
   ?place1 <http://www.w3.org/2003/01/geo/wgs84_pos#geometry> ?point1 .
    ?place2 <http://www.w3.org/2003/01/geo/wgs84_pos#geometry> ?point2 . 
    bind(bif:st_distance(?point1, ?point2) as ?dist)
    bind( xsd:integer(REPLACE(str(?birth1), "(\\\\d+)-.*", "$1")) - xsd:integer(REPLACE(str(?birth2), "(\\\\d+)-.*", "$1")) as ?birthdiff )
OPTIONAL {
    ?person1 <http://dbpedia.org/ontology/thumbnail> ?image.

}
    OPTIONAL{

    ?person1 rdf:type ?common .
    ?person2 rdf:type ?common .
   { ?common rdfs:subClassOf* yago:Person100007846 .}
   UNION
   { ?common rdfs:subClassOf* dbo:Person .}

    }
   
    FILTER(?birth1 != ""@en)
    FILTER(datatype(?birth1) != xsd:gMonthDay)


  }
  GROUP BY ?common`
const makeUrl = (query) =>
    `https://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=${encodeURIComponent(header)}%0A${encodeURIComponent(query).replace(/%0A/g, "%0D%0A")}&format=application/sparql-results%2Bjson`
// `https://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=${encodeURIComponent(query)}&output=json`
// `https://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=${encodeURIComponent(query)}&output=json`
// `https://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=${encodeURIComponent((query))}&format=application%2Fsparql-results%2Bjson&CXML_redir_for_subjs=121&CXML_redir_for_hrefs=&timeout=300000&debug=on&run=%20Run%20Query%20`
const fmt = (stuff) => stuff.split("/")[stuff.split("/").length - 1].replace(/\d/g, "").replace(/[A-Z]/g, letter => ` ${letter}`)
const flat = (results) => results.reduce((acc, curr) => {
    console.log("curr", curr)
    for (const key of keys) {
        console.log(curr[key])
        if (!acc[key] && curr[key]) {
            acc[key] = curr[key]
        }
    }
    if (curr?.common?.value) {
        acc.common.add(curr.common.value)
    }
    return acc
}, Object.assign(results[0], { common: new Set([]) })
)

const matches = async (guess, person) => {
    const q = `
    SELECT * WHERE {
        values ?person {
        <${person}>
        }
           ?person rdfs:label "${guess}"@en .
        
        }
    `
    const url = makeUrl(q);
    const req = await fetch(url);
    const json = await req.json();
    return json.results.bindings.length > 0;
}

const request = async (guess) => {
    const url = makeUrl(makeQuery(guess));
    const req = await fetch(url, {
        "headers": {
            "accept-language": "en-US,en;q=0.9,fr;q=0.8",
            "cache-control": "max-age=0",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Google Chrome\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Chrome OS\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "omit"
    });
    reqs += 2;
    // const req = await fetch("https://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=PREFIX%20owl%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2002%2F07%2Fowl%23%3E%0APREFIX%20xsd%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0APREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0APREFIX%20rdf%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX%20foaf%3A%20%3Chttp%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2F%3E%0APREFIX%20dc%3A%20%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%3E%0APREFIX%20%3A%20%3Chttp%3A%2F%2Fdbpedia.org%2Fresource%2F%3E%0APREFIX%20dbpedia2%3A%20%3Chttp%3A%2F%2Fdbpedia.org%2Fproperty%2F%3E%0APREFIX%20dbpedia%3A%20%3Chttp%3A%2F%2Fdbpedia.org%2F%3E%0APREFIX%20skos%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2004%2F02%2Fskos%2Fcore%23%3E%0ASELECT%20%3Fbirthdiff%20%3Fperson1%20%3Fperson2%20%3Fbirth1%20%3Fbirth2%20%20%3Fplace1%20%3Fplace2%20%3Fpoint1%20%3Fimage%20%3Fdist%20%3Fcommon%20where%20%7B%20%0D%0A%20%20%20%20VALUES%20%3Fperson2%20%7B%3Chttp%3A%2F%2Fdbpedia.org%2Fresource%2FPope_John_Paul_II%3E%20%7D%0D%0A%20%20%20%20%3Fperson1%20rdfs%3Alabel%20%22George%20V%22%40en%20.%20%230.7259981943556173%0D%0A%20%20%0D%0A%20%20%20%20%3Fperson1%20dbo%3AbirthDate%7Cdbp%3AbirthDate%20%3Fbirth1%20.%0D%0A%20%20%20%20%3Fperson2%20dbp%3AbirthDate%20%3Fbirth2%20.%0D%0A%20%20%20%20%20bind(%20xsd%3Ainteger(REPLACE(str(%3Fbirth1)%2C%20%22(%5C%5Cd%2B)-.*%22%2C%20%22%241%22))%20-%20xsd%3Ainteger(REPLACE(str(%3Fbirth2)%2C%20%22(%5C%5Cd%2B)-.*%22%2C%20%22%241%22))%20as%20%3Fbirthdiff%20)%0D%0A%20%3Fperson2%20dbp%3AbirthPlace%20%3Fplace2%20.%0D%0A%20%20%20%20%3Fperson1%20dbo%3AbirthPlace%7Cdbp%3AbirthPlace%20%3Fplace1%20.%0D%0A%0D%0A%20%20%0D%0A%20%20%20%20%0D%0A%20%20%20%3Fplace1%20%3Chttp%3A%2F%2Fwww.w3.org%2F2003%2F01%2Fgeo%2Fwgs84_pos%23geometry%3E%20%3Fpoint1%20.%0D%0A%20%20%20%20%3Fplace2%20%3Chttp%3A%2F%2Fwww.w3.org%2F2003%2F01%2Fgeo%2Fwgs84_pos%23geometry%3E%20%3Fpoint2%20.%20%0D%0A%20%20%20%20bind(bif%3Ast_distance(%3Fpoint1%2C%20%3Fpoint2)%20as%20%3Fdist)%0D%0A%20%20%0D%0A%20%20%20%20%3Fperson1%20%3Chttp%3A%2F%2Fdbpedia.org%2Fontology%2Fthumbnail%3E%20%3Fimage.%0D%0A%20%20%0D%0A%20%20%20%20OPTIONAL%7B%0D%0A%20%20%20%20%3Fperson1%20rdf%3Atype%20%3Fcommon%20.%0D%0A%20%20%20%20%3Fperson2%20rdf%3Atype%20%3Fcommon%20.%0D%0A%20%20%20%7B%20%3Fcommon%20rdfs%3AsubClassOf*%20yago%3APerson100007846%20.%7D%0D%0A%20%20%20UNION%0D%0A%20%20%20%7B%20%3Fcommon%20rdfs%3AsubClassOf*%20dbo%3APerson%20.%7D%0D%0A%0D%0A%20%20%20%20%7D%0D%0A%20%20%20%0D%0A%20%20%20%20FILTER(%3Fbirth1%20!%3D%20%22%22%40en)%0D%0A%20%20%20%20FILTER(datatype(%3Fbirth1)%20!%3D%20xsd%3AgMonthDay)%0D%0A%0D%0A%0D%0A%20%20%7D%0D%0A%20%20GROUP%20BY%20%3Fcommon%0D%0A%20%20LIMIT%204&format=application/sparql-results%2Bjson", {
    //     "referrerPolicy": "strict-origin-when-cross-origin",
    //     "body": null,
    //     "method": "GET",
    //     "mode": "cors",
    //     "credentials": "omit"
    // });
    const json = await req.json();
    console.log(json)
    try {
        if (json["results"]["bindings"].length === 0) return undefined;
        const result = flat(json["results"]["bindings"]);
        console.log(result)
        return result;
    } catch (e) {
        alert("I had an error")
        console.error(e)
    }

}
let waiting = false
input.addEventListener("keyup", async ({ key }) => {
    if (key === "Enter") {

        const value = input.value
        if (waiting) {
            return;
        }
        waiting = true
        if (false/*await matches(value, secretPerson)*/) {
            alert("you win!")
            waiting = false
            return;
        }
        const result = await request(value);
        waiting = false;
        if (result === undefined) {
            alert(`Cannot find person "${value}"`)
        } else {
            const row = table.getElementsByTagName('tbody')[0].insertRow();
            row.innerHTML = `
    <td>${guessNumber++}</td>
    <td><img width="100" height="100" src="${result.image.value}"></td>
    <td>${result.dist?.value || "unknown"}</td>
    <td>${result.birthdiff?.value || "unknown"}</td>
    <td>${[...result.common].map(fmt).join("<br>")}</td>


`;
            input.value = ""
        }
    }
})
// const format = (diff) => {
//     const diffDate = new Date(1000 * Math.abs(parseInt(diff)));

//     // var startDate = new Date(date);
//     // var diffDate = new Date(new Date() - startDate);
//     return `${diffDate.toISOString().slice(0, 4) - 1970} Years`;
//     // return `${years} years ${months} months ${days} days`

// }