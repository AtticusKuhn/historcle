import { search, suggestion } from "./redux"

let reqs: number = 2
const keys: string[] = ["birthdiff", "dist"]
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
const header: string = `PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX : <http://dbpedia.org/resource/>
PREFIX dbpedia2: <http://dbpedia.org/property/>
PREFIX dbpedia: <http://dbpedia.org/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>`
export interface Head {
    link: any[];
    vars: string[];
}

export interface Birth1 {
    type: string;
    datatype: string;
    value: string;
}

export interface Birth2 {
    type: string;
    datatype: string;
    value: string;
}

export interface Image {
    type: string;
    value: string;
}

export interface Dist {
    type: string;
    datatype: string;
    value: string;
}

export interface Common {
    type: string;
    value: string;
}

export interface Birthdiff {
    type: string;
    datatype: string;
    value: string;
}

export interface Binding {
    birth1: Birth1;
    birth2: Birth2;
    image: Image;
    dist: Dist;
    common: Common;
    birthdiff: Birthdiff;
}

export interface Results {
    distinct: boolean;
    ordered: boolean;
    bindings: Binding[];
}

export interface Resp {
    head: Head;
    results: Results;
}
const resolveIdQuery = (id : number) : string => `
SELECT * WHERE {
?r <http://dbpedia.org/ontology/wikiPageID> ${id} .
}
`

export const resolveId = async (id : number) : Promise<string> => {
    const query : string = resolveIdQuery(id);
    const json = await fetchDBPedia(query)
    return json.results.bindings[0].r.value

}
// A revised, more performant query builder
const makeQuery = (guessURI: string, secretPersonURI: string):string => `
  SELECT
    ?image
    ?dist
    ?commonType as ?common
    ?birthdiff
  WHERE {
    VALUES ?person1 { <${guessURI}> }
    VALUES ?person2 { <${secretPersonURI}> }

    # Get required properties for both persons
    ?person1 dbo:birthDate|dbp:birthDate ?birth1 .
    ?person2 dbo:birthDate|dbp:birthDate ?birth2 .

    # Optional: Get an image for the guessed person
    OPTIONAL { ?person1 dbo:thumbnail ?image . }
    OPTIONAL {
        ?person1 dbo:birthPlace/geo:geometry ?point1 .
        ?person2 dbo:birthPlace/geo:geometry ?point2 .
        bind(bif:st_distance(?point1, ?point2) as ?dist) .
    }
    OPTIONAL {
        bind(xsd:integer(REPLACE(str(?birth1), "(-|\\\\+).*$", "")) - xsd:integer(REPLACE(str(?birth2), "(-|\\\\+).*$", "")) as ?birthdiff) .
    }


    # Optional but efficient: Get common direct types (classes)
    OPTIONAL {
      ?person1 rdf:type ?commonType .
      ?person2 rdf:type ?commonType .
      # We only want types that are reasonably specific, not top-level things like "owl:Thing"
      # Get a human-readable label for the type
    }
  }
LIMIT 10
`;
// const makeQuery = (guess: string, secretPerson: string) => `SELECT ?birth1 ?birth2 ?image ?dist ?common ?birthdiff where {
//     VALUES ?person2 {<${secretPerson}> }
//     ?person1 rdfs:label "${guess}"@en .
//   #${Math.random().toString().substr(2)}
//     ?person1 dbo:birthDate|dbp:birthDate ?birth1 .
//     ?person2 dbp:birthDate ?birth2 .
//  ?person2 dbo:birthPlace|dbp:birthPlace ?place2 .
//     ?person1 dbo:birthPlace|dbp:birthPlace ?place1 .
//    ?place1 <http://www.w3.org/2003/01/geo/wgs84_pos#geometry> ?point1 .
//     ?place2 <http://www.w3.org/2003/01/geo/wgs84_pos#geometry> ?point2 .
//     bind(bif:st_distance(?point1, ?point2) as ?dist)

//     bind( xsd:integer(REPLACE(str(?birth1), "(\\\\d+)-.*", "$1")) - xsd:integer(REPLACE(str(?birth2), "(\\\\d+)-.*", "$1")) as ?birthdiff )
// OPTIONAL {
//     ?person1 <http://dbpedia.org/ontology/thumbnail> ?image.

// }
//     OPTIONAL{

//     ?person1 rdf:type ?common .
//     ?person2 rdf:type ?common .
//    { ?common rdfs:subClassOf* yago:Person100007846 .}
//    UNION
//    { ?common rdfs:subClassOf* dbo:Person .}

//     }

//     FILTER(?birth1 != ""@en)
//     FILTER(datatype(?birth1) != xsd:gMonthDay)
//   }
//   GROUP BY ?common`
const makeUrl = (query: string): string =>
    `https://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=${encodeURIComponent(header)}%0A${encodeURIComponent(query).replace(/%0A/g, "%0D%0A")}&format=application/sparql-results%2Bjson`
// `https://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=${encodeURIComponent(query)}&output=json`
// `https://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=${encodeURIComponent(query)}&output=json`
// `https://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=${encodeURIComponent((query))}&format=application%2Fsparql-results%2Bjson&CXML_redir_for_subjs=121&CXML_redir_for_hrefs=&timeout=300000&debug=on&run=%20Run%20Query%20`
const fmt = (stuff: string): string => stuff.split("/")[stuff.split("/").length - 1].replace(/\d/g, "").replace(/[A-Z]/g, letter => ` ${letter}`)
type flat = {
    birth1: Birth1;
    birth2: Birth2;
    image: Image;
    dist: Dist;
    common: Set<string>;
    birthdiff: Birthdiff;
}
const flat = (results: Binding[]): flat => results.reduce((acc: flat, curr: Binding) => {
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

const fetchDBPedia = async (query : string) : Promise<any> => {
    const url = makeUrl(query);
    const req = await fetch(url);
    const json = await req.json();
    return json
}
export const matches = async (guess: string, person: string): Promise<boolean> => {
    const q = `
    SELECT * WHERE {
        values ?person {
        <${person}>
        }
           ?person rdfs:label "${guess}"@en .
        
        }
    `
    const json = await fetchDBPedia(q)
    return json.results.bindings.length > 0;
}
type res = {
    name: string,
    time: number,
    dist: number,
    hints: string[],
    image: string,
}
export const requestPhoto = async (guessID: string): Promise<string> => {
    const image = await fetchDBPedia(`
         SELECT
    ?image
  WHERE {
    VALUES ?person1 { <${guessID}> }
    ?person1 dbo:thumbnail ?image .
  }
LIMIT 1
    `)
    return image.results.bindings[0].image.value;
}

export const requestDistance = async (guessID: string, secretPerson : string): Promise<number> => {
    const query: string = `
  SELECT
bif:st_distance(?point1, ?point2) as ?dist 
 WHERE {
    VALUES ?person1 { <${guessID}> }
    VALUES ?person2 { <${secretPerson}> }
    ?person1 dbo:birthPlace/geo:geometry ?point1 .
    ?person2 dbo:birthPlace/geo:geometry ?point2 .
  }
LIMIT 1
    `
    console.log(query);
    const image = await fetchDBPedia(query)
    return Number(image.results.bindings[0].dist.value);
}
const obvious = [
    "http://www.w3.org/2002/07/owl#Thing",
    "http://xmlns.com/foaf/0.1/Person",
    "http://dbpedia.org/ontology/Person",
    "http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#NaturalPerson",
    "http://www.wikidata.org/entity/Q19088",
    "http://www.wikidata.org/entity/Q215627",
    "http://www.wikidata.org/entity/Q5",
    "http://www.wikidata.org/entity/Q729",
    "http://dbpedia.org/ontology/Animal",
    "http://dbpedia.org/ontology/Eukaryote"
  ]
export const requestHints = async (guessID: string, secretPerson : string): Promise<string[]> => {
    const image = await fetchDBPedia(`
  SELECT DISTINCT
?commonType as ?common 
 WHERE {
    VALUES ?person1 { <${guessID}> }
    VALUES ?person2 { <${secretPerson}> }
    ?person1 rdf:type ?commonType .
    ?person2 rdf:type ?commonType .
  }
LIMIT 15
    `)
    return image.results.bindings.map(b => b.common.value).filter(p => !obvious.includes(p));
}

export const requestBirthDiff = async (guessID: string, secretPerson : string): Promise<number> => {
    const image = await fetchDBPedia(`
  SELECT
    xsd:integer(REPLACE(str(?birth1), "(-|\\\\+).*$", "")) - xsd:integer(REPLACE(str(?birth2), "(-|\\\\+).*$", "")) as ?birthdiff
  WHERE {
    VALUES ?person1 { <${guessID}> }
    VALUES ?person2 { <${secretPerson}> }

    ?person1 dbo:birthDate|dbp:birthDate ?birth1 .
    ?person2 dbo:birthDate|dbp:birthDate ?birth2 .
  }
LIMIT 1
    `)
    return Number(image.results.bindings[0].birthdiff.value);
}


export const request = async (guess: string, secretPerson: string): Promise<res> => {
    // const results = await Promise.all(new Array(1).fill(null).map(async (_e, i) => {
    const guessID : string = await resolveId(Number(guess));
    const query = makeQuery(guessID, secretPerson);
    console.log("query", query)
    // reqs += 2;
    const json = await fetchDBPedia(query) as Resp;
    const results = json.results.bindings
    // })).then(x => x.flat(1))

    console.log("results", results)
    if (results.length === 0) {
        throw new Error(`no results`)
    };
    // const result = results[0];
    const result = flat(results);
    return {
        dist: result?.dist?.value ? Number(result.dist.value) : null,
        hints: [...result.common],
        name: guess,
        time: Number(result.birthdiff.value),
        image: result.image.value,
    };
}

export const getSuggestions = async (query: string): Promise<suggestion[]> => {
    const req = await fetch(`https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=prefixsearch&prop=pageprops%7Cpageimages%7Cdescription&redirects=&ppprop=displaytitle&piprop=thumbnail&pithumbsize=120&pilimit=6&gpssearch=${encodeURIComponent(query)}&gpsnamespace=0&gpslimit=6&callback=callbackStack.queue%5B5%5D`);
    const text = await req.text()
    const body = text.match(/\{.*\}/)[0]
    const json = JSON.parse(body)
    const pages = json?.query?.pages || [];
    console.log("pages", pages)
    const result: suggestion[] = Object.values(pages).map((page: any) => ({
        description: page.description,
        name: page.title,
        image: page?.thumbnail?.source,
        pageid: page.pageid
    }))
    return result;
}
const searchQuery = (person: string) => `
SELECT DISTINCT ?name ?image ?person WHERE { 
    ?person rdfs:label ?name .
    ?name bif:contains "'${person}'" .
    ?person dbo:birthDate|dbp:birthDate ?birth .
    ?person dbo:birthPlace|dbp:birthPlace ?place .
    ?place <http://www.w3.org/2003/01/geo/wgs84_pos#geometry> ?point . 
  OPTIONAL { #12345
      ?person <http://dbpedia.org/ontology/thumbnail> ?image.
  
  }
    FILTER(langMatches(lang(?name),"en"))
  }
  LIMIT 10
`;
export const makeSearch = async (person: string): Promise<search[]> => {
    const url = searchQuery(person);
    const req = await fetch(makeUrl(url));
    const json = await req.json();
    console.log(`json.results.bindings`, json.results.bindings)
    return json.results.bindings.map(b => ({
        name: b?.name?.value,
        image: b?.image?.value,
        person: b?.person?.value
    })) as search[];
}
