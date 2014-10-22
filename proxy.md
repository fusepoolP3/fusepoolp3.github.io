### P3 Proxy

An HTTP Proxy adding P3 Transforming Container functionality to an LDP instance.

Source: [https://github.com/fusepoolP3/p3-proxy](https://github.com/fusepoolP3/p3-proxy

Via the Proxy you can access an LDP instance. The root container is located at `http://sandbox.fusepool.info:8181/ldp`.

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