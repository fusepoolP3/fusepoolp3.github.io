---
layout: page
title: OpenLink Transformers for generating RDF
permalink: /openlink-rdf-generators/
---


## Synchronous Transformers for generating RDF


### Getting a description of the transformer

As per the transformer specification a GET request will return an RDF description of the transformer.

    curl -i "http://fusepool.openlinksw.com/ext/csv"

### Transforming data

The following examples uses the follwoing two CVS files which you should download to the folder in which you're executing the cURL commands:

- [pubs.csv](openlink/pubs.csv)
- [accommodations.csv](openlink/accommodations.csv)

    curl -i -H "Content-Type: text/csv" -H "Accept: text/turtle" -H "Content-Location: http://fusepool.openlinksw.com/pub" --data-binary @pubs.csv -X POST    "http://fusepool.openlinksw.com/ext/csv"
    curl -i -H "Content-Type: text/csv" -H "Accept: application/rdf+xml" -H "Content-Location: http://fusepool.openlinksw.com/accommodation" --data-binary @accommodations.csv -X POST "http://fusepool.openlinksw.com/ext/csv"

Note 1: Use of 'Accept' and 'Content-Location' headers is optional. The fall-backs are 'text/turtle' and 'http://fusepool.openlinksw.com/entity'.

Note 2: Even if the call is to a synchronous Transformer, it may internally decide that the time to process is large and start the transformation in an asynchronous mode. This means that you will need an additional GET request to get the transformation result like in the followng section.

## Asynchronous Data Transformation

The transformer `http://fusepool.openlinksw.com/ext-async/csv` alway handles requests asynchronously and can thus be used to try out the asynchronous transformation mode.

### Getting a description of the transformer

No difference here....

    curl -i "http://fusepool.openlinksw.com/ext-async/csv"

### Transforming data

The transformation of the data requires two steps, POSTing the data and GETting the result:

#### POSTing the data

    curl -i -H "Content-Type: text/csv" -H "Accept: text/turtle; q=1.0, application/rdf+xml; q=0.9, application/ld+json; q=0.8" -H "Content-Location: http://fusepool.openlinksw.com/pub" --data-binary @pubs.csv -X POST "http://fusepool.openlinksw.com/ext-async/csv"
    curl -i -H "Content-Type: text/csv" -H "Accept: text/turtle; q=0.8, application/rdf+xml; q=1.0, application/ld+json; q=0.9" -H "Content-Location: http://fusepool.openlinksw.com/accommodation" --data-binary @accommodations.csv -X POST "http://fusepool.openlinksw.com/ext-async/csv"

Note: Use of 'Accept' and 'Content-Location' headers is optional. The fall-backs are 'text/turtle' and 'http://fusepool.openlinksw.com/entity'.

### GETting the result

The results can be retrived at the location indicated by the Location-Header in the response to the POST request.

    curl -i "http://fusepool.openlinksw.com/ext-async/status/1"