---
layout: page
title: OpenLink Annotating Transformers
permalink: /openlink-annotators/
---


## Synchronous Annotating Transformer


### Getting a description of the transformer

As per the transformer specification a GET request will return an RDF description of the transformer.

    curl -i "http://fusepool.openlinksw.com/enr/dbpedia-spotlight-meta-fusepool"
    

### Transforming data

The following examples uses the following text file which you should download to the folder in which you're executing the cURL commands:

- [test.txt](/openlink/test.txt)

The following cURL invocation will post the data

    curl -i -H "Content-Type: text/plain" -H "Accept: text/turtle; q=1.0, application/rdf+xml; q=0.9, application/ld+json; q=0.8" -H "Content-Location: http://fusepool.openlinksw.com/entity" --data-binary @test.txt -X POST "http://fusepool.openlinksw.com/enr/dbpedia-spotlight-meta-fusepool"

Note 1: Use of 'Accept' and 'Content-Location' headers is optional. The fall-backs are 'text/turtle' and 'http://fusepool.openlinksw.com/entity'.

Note 2: Even if the call is to a synchronous Transformer, it may internally decide that the time to process is large and start the transformation in an asynchronous mode. This means that you will need an additional GET request to get the transformation result like in the followng section.

## Asynchronous Annotating Transformer

The transformer `http://fusepool.openlinksw.com/enr-async/dbpedia-spotlight-meta-fusepool` alway handles requests asynchronously and can thus be used to try out the asynchronous transformation mode.

### Getting a description of the transformer

No difference here....

    curl -i "http://fusepool.openlinksw.com/enr-async/dbpedia-spotlight-meta-fusepool"

### Transforming data

The transformation of the data requires two steps, POSTing the data and GETting the result:

#### POSTing the data

    curl -i -H "Content-Type: text/plain" -H "Accept: text/turtle; q=1.0, application/rdf+xml; q=0.9, application/ld+json; q=0.8" -H "Content-Location: http://fusepool.openlinksw.com/entity" --data-binary @test.txt -X POST "http://fusepool.openlinksw.com/enr-async/dbpedia-spotlight-meta-fusepool"
    
The answer to the request will look similar to this:

    HTTP/1.1 202 Accepted
    Server: Virtuoso/07.10.3211 (Linux) x86_64-redhat-linux-gnu  VDB
    Connection: Keep-Alive
    Content-Type: text/html; charset=UTF-8
    Date: Wed, 05 Nov 2014 13:27:57 GMT
    Accept-Ranges: bytes
    Location: /enr-async/status/30
    Content-Length: 0


Note: Use of 'Accept' and 'Content-Location' headers is optional. The fall-backs are 'text/turtle' and 'http://fusepool.openlinksw.com/entity'.

#### GETting the result

The results can be retrieved at the location indicated by the Location-Header in the response to the POST request.

    curl -i "http://fusepool.openlinksw.com/enr-async/status/30"
