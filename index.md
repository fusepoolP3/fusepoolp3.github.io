---
layout: page
title: Fusepool P3 Development
permalink: /
---

-----------------

[View on GitHub](https://github.com/fusepoolP3)

## <a name="welcome-to-fusepool-p3"></a>Welcome to Fusepool P3

The goal of Fusepool P3 project is to make publishing and processing of
public data as linked data easy. For this purpose Fusepool P3 develops a
set of of software components that integrate seamlessly by well defined
API basing on Linked Data Best Practices and the Linked Data Platform
standard.

## <a name="learn-more"></a>Learn more

To learn more about the overall platform as well as the APIs we propose
see:
[http://fusepool.gitbooks.io/the\_fusepool\_p3\_platform/d51-deliverable.html](http://fusepool.gitbooks.io/the_fusepool_p3_platform/d51-deliverable.html)

To learn how to write a transfomer in Java:
[https://github.com/fusepoolP3/p3-transformer-howto/blob/master/transformer-howto.md](https://github.com/fusepoolP3/p3-transformer-howto/blob/master/transformer-howto.md)

## <a name="try-it-out"></a>Try it out

The following are applications providing implementation of the Fusepool
APIs:

| Name | Description | Life instance | Source | 
| ----- |----- | -----| -----|
| P3 Proxy | An HTTP Proxy adding P3 Transforming Container functionality to an LDP instance| [http://sandbox.fusepool.info:8181/](http://sandbox.fusepool.info:8181/) | [https://github.com/fusepoolP3/p3-proxy](https://github.com/fusepoolP3/p3-proxy)| 
| P3 Pipeline Transformer | Allows executing multiple transformers sequentially | [http://sandbox.fusepool.info:8191/](http://sandbox.fusepool.info:8191/) | [https://github.com/fusepoolP3/p3-pipeline-transformer](https://github.com/fusepoolP3/p3-pipeline-transformer)| 
| P3 Dictionary Matcher | Recognize entities of a SKOS taxonomy in a text | [http://sandbox.fusepool.info:8192/](http://sandbox.fusepool.info:8192/) | [https://github.com/fusepoolP3/p3-dictionary-matcher-transfromer](https://github.com/fusepoolP3/p3-dictionary-matcher-transfromer)|

### P3 Proxy

Via the Proxy you can access an LDP instance. The root container is localted at `http://sandbox.fusepool.info:8181/ldp`.

    $ curl -H "Accept: text/turtle" http://sandbox.fusepool.info:8181/ldp
    @prefix ldp: <http://www.w3.org/ns/ldp#> .
    @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
    @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
    @prefix dcterms: <http://purl.org/dc/terms/> .
    @prefix : <http://sandbox.fusepool.info:8181/ldp> .

    <http://sandbox.fusepool.info:8181/ldp> <http://www.w3.org/2000/01/rdf-schema#label> "Marmotta's LDP Root Container" ;
    	a ldp:Resource , ldp:RDFSource , ldp:Container , ldp:BasicContainer ;
    	ldp:interactionModel ldp:Container ;
    	dcterms:created "2014-10-16T09:03:48.000Z"^^xsd:dateTime ;
    	dcterms:modified "2014-10-16T09:03:48.000Z"^^xsd:dateTime .

By the time you're reading this the root container is likely to contain some 
child elements, some of them might be [transforming containers](https://github.com/fusepoolP3/overall-architecture/blob/master/transforming-container-api.md).


### P3 Dictionary Matcher

The dictionary matcher provides transformers the recognize entities from a SKOS taxonomy. For example the matcher with URI [http://sandbox.fusepool.info:8192/?taxonomy=http://data.nytimes.com/descriptors.rdf](http://sandbox.fusepool.info:8192/?taxonomy=http://data.nytimes.com/descriptors.rdf) will find mentions of New York Times category in a textual content.

To try it out witch cURL: 

`curl -X POST -d "Frauds and Swindlings cause significant concerns with regards to Ethics." "http://sandbox.fusepool.info:8192/?taxonomy=http://data.nytimes.com/descriptors.rdf"`

## P3 Batch Refine Transformer

$ curl http://hetzy1.spaziodati.eu:7100 
<http://hetzy1.spaziodati.eu:7100/>
      <http://vocab.fusepool.info/transformer#supportedInputFormat>
              "text/csv"^^<http://www.w3.org/2001/XMLSchema#string> ;
      <http://vocab.fusepool.info/transformer#supportedOutputFormat>
              "text/csv"^^<http://www.w3.org/2001/XMLSchema#string> , "text/turtle"^^<http://www.w3.org/2001/XMLSchema#string> , "application/rdf+xml"^^<http://www.w3.org/2001/XMLSchema#string> .
reto@dev-u1:/tmp$ curl http://www.commercio.provincia.tn.it/binary/pat_commercio/marchi_prodotto/Elenco_osterie_tipiche_civici.1386925759.csv > osterie.csv

$ curl -D - -X POST -H "Content-Type: text/csv" -H "Accept: text/turtle" --data-binary @osterie.csv http://hetzy1.spaziodati.eu:7100/?refinejson=https://raw.githubusercontent.com/fusepoolP3/p3-geo-interlinking/master/src/main/resources/eu/fusepool/deduplication/transformer/Localita-Trentino-bn.json 
HTTP/1.1 100 Continue

HTTP/1.1 202 Accepted
Date: Thu, 16 Oct 2014 11:24:10 GMT
Location: /job/1e706d3e-c8f2-4be1-88a5-ef4fca8b8a35
Transfer-Encoding: chunked
Server: Jetty(9.2.z-SNAPSHOT)

$ curl -D - http://hetzy1.spaziodati.eu:7100/job/1e706d3e-c8f2-4be1-88a5-ef4fca8b8a35
HTTP/1.1 200 OK
Date: Thu, 16 Oct 2014 11:25:34 GMT
Content-Type: text/turtle
Transfer-Encoding: chunked
Server: Jetty(9.2.z-SNAPSHOT)

@prefix schema: <http://schema.org/> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix geo: <http://www.w3.org/2003/01/geo/wgs84_pos#> .
@prefix foaf: <http://xmlns.com/foaf/0.1/> .
@prefix dbont: <http://dbpedia.org/ontology> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix gs: <http://www.opengis.net/ont/geosparql> .



## <a name="support-or-contact"></a>Support or Contact

Need help or have suggestions? Get in touch with the developers with the
mailing list at [p3-devel@netlabs.org](mailto:p3-devel@netlabs.org) or
raise issues in github.

## <a name="about-fusepool-p3"></a>About Fusepool P3

Fusepool P3 is partially funded by the 7th Framework Program for
Innovation, under grant 609696. For further details about the project,
please refer to the official [webpage](http://p3.fusepool.eu/).
