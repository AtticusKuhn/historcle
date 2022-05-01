const table = document.getElementById("table")
const input = document.getElementById("input")
const day = document.getElementById("day")

let guessNumber = 0
const startDate = new Date(`May 1 2022`)
const now = new Date();
const numberOfDays = Math.floor((now.getTime() - startDate.getTime()) / 86400000);
day.innerText = numberOfDays.toString();
const secretPerson = people[numberOfDays]//"Richard Nixon"
console.log("the secret person is", secretPerson)
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
const makeQuery = (guess) => `
SELECT DISTINCT ?birthdiff ?person1 ?person2 ?birth1 ?birth2  ?place1 ?place2 ?point1 ?image ?dist ?common where { 
    VALUES ?person2 {<${secretPerson}> }
    ?person1 rdfs:label "${guess}"@en .
  
    ?person1 dbo:birthPlace|dbp:birthPlace ?place1 .
    ?person1 dbo:birthDate|dbp:birthDate ?birth1 .
    ?person2 dbp:birthPlace ?place2 .
    ?person2 dbp:birthDate ?birth2 .
   
    bind( xsd:integer(REPLACE(str(?birth1), "(\\\\d+)-.*", "$1")) - xsd:integer(REPLACE(str(?birth2), "(\\\\d+)-.*", "$1")) as ?birthdiff )
  
    ?place1 <http://www.w3.org/2003/01/geo/wgs84_pos#geometry> ?point1 .
    ?place2 <http://www.w3.org/2003/01/geo/wgs84_pos#geometry> ?point2 . 
    bind(bif:st_distance(?point1, ?point2) as ?dist)
  
    ?person1 <http://dbpedia.org/ontology/thumbnail> ?image.
  
    OPTIONAL{
    ?person1 rdf:type ?common .
    ?person2 rdf:type ?common .
    ?common rdfs:subClassOf* yago:Person100007846 .
    }
     MINUS {
       ?person1 dbo:birthPlace ?placesub1 .
       ?placesub1 dbo:subdivision ?place1 .
       ?person2 dbo:birthPlace ?placesub2 .
       ?placesub2 dbo:subdivision ?place2 .
       ?place2 dbo:country ?placesub2 .
       ?place1 dbo:country ?placesub1 .
    }
    FILTER(?birth1 != ""@en)
    FILTER(datatype(?birth1) != xsd:gMonthDay)
  }
  GROUP BY ?common
  LIMIT 4

`
const makeUrl = (query) =>
    `https://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=${encodeURIComponent(makeQuery(query))}&format=application%2Fsparql-results%2Bjson&CXML_redir_for_subjs=121&CXML_redir_for_hrefs=&timeout=300000&debug=on&run=%20Run%20Query%20`
const fmt = (stuff) => stuff.split("/")[stuff.split("/").length - 1].replace(/\d/g, "")
const flat = (results) => results.reduce((acc, curr) => {
    console.log("curr", curr)
    for (const key of keys) {
        console.log(curr[key])
        if (!acc[key] && curr[key]) {
            acc[key] = curr[key]
        }
    }
    if (curr.common.value) {
        acc.common.push(curr.common.value)
    }
    return acc
}, Object.assign(results[0], { common: [] })
)

const request = async (guess) => {
    const url = makeUrl(guess);
    const req = await fetch(url);
    const json = await req.json();
    console.log(json)
    try {
        if (json["results"]["bindings"].length === 0) return undefined;
        const result = flat(json["results"]["bindings"]);
        console.log(result)
        return result;
    } catch {
        alert("I had an errro")
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
        if (value === secretPerson) {
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
    <td>${result.common.map(fmt).join("<br>")}</td>


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