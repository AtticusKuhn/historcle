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
const makeQuery = (guess: string, secretPerson: string) => `SELECT ?birth1 ?birth2 ?image ?dist ?common ?birthdiff where { 
    VALUES ?person2 {<${secretPerson}> }
    ?person1 rdfs:label "${guess}"@en .
  #${Math.random().toString().substr(2)}
    ?person1 dbo:birthDate|dbp:birthDate ?birth1 .
    ?person2 dbp:birthDate ?birth2 .
 ?person2 dbo:birthPlace|dbp:birthPlace ?place2 .
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

export const matches = async (guess: string, person: string): Promise<boolean> => {
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
type res = {
    name: string,
    time: number,
    dist: number,
    hints: string[],
    image: string,
}
export const request = async (guess: string, secretPerson: string): Promise<res> => {
    const results = await Promise.all(new Array(5).fill(null).map(async (_e, i) => {
        const url = makeUrl(makeQuery(guess, secretPerson));
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
        const json = await req.json() as Resp;
        return json.results.bindings
    })).then(x => x.flat(1))

    console.log(results)
    try {
        if (results.length === 0) {
            throw new Error(`no resulst`)
        };
        const result = flat(results);
        console.log(result)
        return {
            dist: result?.dist?.value ? Number(result.dist.value) : null,
            hints: [...result.common],
            name: guess,
            time: Number(result.birthdiff.value),
            image: result.image.value,
        };
    } catch (e) {
        // alert("I had an error")
        console.error(e)
    }

}