const table = document.getElementById("table")
const input = document.getElementById("input")
let guessNumber = 0
const makeQuery  = (guess)=>`
select ?birthdiff ?person1 ?person2 ?birth1 ?birth2  ?place1 ?place2 ?point1 ?image ?dist where { 
  ?person1 rdfs:label "${guess}"@en .

  ?person1 dbo:birthPlace|dbp:birthPlace ?place1 .
  ?person1 dbo:birthDate|dbp:birthDate ?birth1 .
  ?person2 rdfs:label "Robert Walpole"@en .
  ?person2 dbo:birthPlace|dbp:birthPlace ?place2 .
  ?person2 dbo:birthDate|dbp:birthDate ?birth2 .
  bind( xsd:integer(REPLACE(str(?birth1), "(\\\\d+)-.*", "$1")) - xsd:integer(REPLACE(str(?birth2), "(\\\\d+)-.*", "$1")) as ?birthdiff )
  ?place1 <http://www.w3.org/2003/01/geo/wgs84_pos#geometry> ?point1 .
  ?place2 <http://www.w3.org/2003/01/geo/wgs84_pos#geometry> ?point2 . 
  ?person1 <http://dbpedia.org/ontology/thumbnail> ?image.
  bind(bif:st_distance(?point1, ?point2) as ?dist)
   MINUS {
     ?person1 dbo:birthPlace ?placesub1 .
     ?placesub1 dbo:subdivision ?place1 .
     ?person2 dbo:birthPlace ?placesub2 .
     ?placesub2 dbo:subdivision ?place2 .
     ?place2 dbo:country ?placesub2 .
     ?place1 dbo:country ?placesub1 .
  }
  FILTER(?birth1 != ""@en)
}
`
const makeUrl = (query)=>
    `https://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=${encodeURIComponent(makeQuery(query))}&format=application%2Fsparql-results%2Bjson&CXML_redir_for_subjs=121&CXML_redir_for_hrefs=&timeout=300000&debug=on&run=%20Run%20Query%20`


const request = async (guess)=>{
    const url = makeUrl(guess);
    const req = await fetch(url);
    const json = await req.json();
    const result = json["results"]["bindings"][0];
    console.log(result)
    return result;
}
input.addEventListener("keyup", async ({key}) => {
    if (key === "Enter") {
        const value = input.value
        const result = await request(value);
        if(result === undefined){
            alert(`Cannot find person "${value}"`)
        }else{
        const row = table.getElementsByTagName('tbody')[0].insertRow();
        row.innerHTML= `
    <td>${guessNumber++}</td>
    <td><img width="100" height="100" src="${result.image.value}"></td>
    <td>${result.dist.value}</td>
    <td>${result.birthdiff.value}</td>

`;
        }
    }
})
const format = (diff)=>{
    const diffDate = new Date(1000*Math.abs(parseInt(diff)));
    
    // var startDate = new Date(date);
    // var diffDate = new Date(new Date() - startDate);
    return `${diffDate.toISOString().slice(0, 4) - 1970} Years`;
    // return `${years} years ${months} months ${days} days`

}