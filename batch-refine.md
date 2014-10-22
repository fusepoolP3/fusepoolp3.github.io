---
layout: page
title: Fusepool P3 Batch Refine
permalink: /batch-refine/
---

## P3 Batch Refine Transformer

The Batch Refine Transformers uses an Open Refine configuration file to transform some input data according to the OpenRefine 
transformation rule. For example this can be used to generate clean RDF.

The source code is avaialble here: https://github.com/fusepoolP3/p3-batchrefine

A service proving such transformers is available here: http://hetzy1.spaziodati.eu:7100/

### Usage

Get a CSV file describing the osterie of Trentino:

    $ curl http://www.commercio.provincia.tn.it/binary/pat_commercio/marchi_prodotto/Elenco_osterie_tipiche_civici.1386925759.csv > osterie.csv


Start the transformation with:

    $ curl -D - -X POST -H "Content-Type: text/csv" -H "Accept: text/turtle" --data-binary @osterie.csv http://hetzy1.spaziodati.eu:7100/?refinejson=https://raw.githubusercontent.com/fusepoolP3/batchrefine/master/engines/engines-core/src/test/resources/transforms/osterie-rdfize.json
    HTTP/1.1 100 Continue

    HTTP/1.1 202 Accepted
    Date: Mon, 20 Oct 2014 11:35:33 GMT
    Location: /job/e4327247-1da0-4045-acdb-d592f19cd143
    Transfer-Encoding: chunked
    Server: Jetty(9.2.z-SNAPSHOT)

Eventually get the results

    $ curl -D - http://hetzy1.spaziodati.eu:7100/job/e4327247-1da0-4045-acdb-d592f19cd143
    HTTP/1.1 200 OK
    Date: Mon, 20 Oct 2014 11:37:10 GMT
    Content-Type: text/turtle
    Transfer-Encoding: chunked
    Server: Jetty(9.2.z-SNAPSHOT)

    @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
    @prefix foaf: <http://xmlns.com/foaf/0.1/> .
    @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
    @prefix owl: <http://www.w3.org/2002/07/owl#> .
    @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .


    [] a foaf:Organization ;
        foaf:name "AL FAGGIO " ;
        foaf:theme "Ristorante" .

    [] a foaf:Organization ;
        foaf:name "OSTERIA IL RITRATTO" ;
        foaf:theme "Ristorante-Bar" .

    [] a foaf:Organization ;
        foaf:name "AI DUE CAMI" ;
        foaf:theme "Albergo-Ristorante-Bar" .