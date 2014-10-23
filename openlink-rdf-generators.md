---
layout: page
title: OpenLink Transformers for generating RDF
permalink: /openlink-rdf-generators/
---


## Synchronous Transformers for generating RDF


### GET

    curl -i "http://fusepool.openlinksw.com/ext/csv"

### POST

    curl -i -H "Content-Type: text/csv" -H "Accept: text/turtle; q=1.0, application/rdf+xml; q=0.9, application/ld+json; q=0.8" -H "Content-Location: http://fusepool.openlinksw.com/pub" --data-binary @pubs.csv -X POST    "http://fusepool.openlinksw.com/ext/csv"
    curl -i -H "Content-Type: text/csv" -H "Accept: text/turtle; q=0.8, application/rdf+xml; q=1.0, application/ld+json; q=0.9" -H "Content-Location: http://fusepool.openlinksw.com/accommodation" --data-binary @accommodations.csv -X POST "http://fusepool.openlinksw.com/ext/csv"

Note: Use of 'Accept' and 'Content-Location' headers is optional. The fall-backs are 'text/turtle' and 'http://fusepool.openlinksw.com/entity'.

### GET after POST

    curl -i "http://fusepool.openlinksw.com/ext/status/1"

Note: Even if the call is to a synchronous Transformer, it may internally decide that the time to process is large and start the transformation in an asynchronous mode. This means that you will need an additional GET request (just as the one above) to get the transformation result.

## Asynchronous Transformers for generating RDF


### GET

    curl -i "http://fusepool.openlinksw.com/ext-async/csv"

### POST

    curl -i -H "Content-Type: text/csv" -H "Accept: text/turtle; q=1.0, application/rdf+xml; q=0.9, application/ld+json; q=0.8" -H "Content-Location: http://fusepool.openlinksw.com/pub" --data-binary @pubs.csv -X POST "http://fusepool.openlinksw.com/ext-async/csv"
    curl -i -H "Content-Type: text/csv" -H "Accept: text/turtle; q=0.8, application/rdf+xml; q=1.0, application/ld+json; q=0.9" -H "Content-Location: http://fusepool.openlinksw.com/accommodation" --data-binary @accommodations.csv -X POST "http://fusepool.openlinksw.com/ext-async/csv"

Note: Use of 'Accept' and 'Content-Location' headers is optional. The fall-backs are 'text/turtle' and 'http://fusepool.openlinksw.com/entity'.

### GET after POST

    curl -i "http://fusepool.openlinksw.com/ext-async/status/1"