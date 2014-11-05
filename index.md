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
[http://fusepool.gitbooks.io/the_fusepool_p3_platform/content/d51-deliverable.html](http://fusepool.gitbooks.io/the_fusepool_p3_platform/content/d51-deliverable.html)

To learn how to write a transfomer in Java:
[https://github.com/fusepoolP3/p3-transformer-howto/blob/master/transformer-howto.md](https://github.com/fusepoolP3/p3-transformer-howto/blob/master/transformer-howto.md)

## <a name="try-it-out"></a>Try it out

The following are applications providing implementation or basing on the Fusepool
APIs.


### Transforming container API

The [transforming containers API ](https://github.com/fusepoolP3/overall-architecture/blob/master/transforming-container-api.md) is 
implemented by the P3 Proxy which can be backed by any compliant LDP implementation. A MArmotta backed instance is available at 
[http://sandbox.fusepool.info:8181/](http://sandbox.fusepool.info:8181/).

[Learn more](proxy/)

### Transformer API

The [Transforer containers API ](https://github.com/fusepoolP3/overall-architecture/blob/master/transformer-api.md) is implemented by a 
growing number of services that allow transforming data. Check out the following transformers:


#### P3 Dictionary Matcher

The dictionary matcher provides transformers the recognize entities from a SKOS taxonomy. For example the transformer with URI [http://sandbox.fusepool.info:8192/?taxonomy=http://data.nytimes.com/descriptors.rdf](http://sandbox.fusepool.info:8192/?taxonomy=http://data.nytimes.com/descriptors.rdf) will find mentions of New York Times category in a textual content.

To try it out witch cURL: 

`curl -X POST -d "Frauds and Swindlings cause significant concerns with regards to Ethics." "http://sandbox.fusepool.info:8192/?taxonomy=http://data.nytimes.com/descriptors.rdf"`

The sources and more information about this transformer are available here: [https://github.com/fusepoolP3/p3-dictionary-matcher-transformer](https://github.com/fusepoolP3/p3-dictionary-matcher-transformer)

#### P3 Batch Refine Transformer

The Batch Refine Transformers uses an Open Refine configuration file to transform some input data according to the OpenRefine 
transformation rule. For example this can be used to generate clean RDF.

[Learn more](batch-refine/)

#### P3 Geo Enriching transformer

The Geo Enriching Transformers enriches RDF data containing geographical locations with points of interests around these locations. The locations are taken from an URI that can be specified as a query parameter in the URI of the transformer. For example the transformer eith URI [http://sandbox.fusepool.info:8193/?data=https://raw.githubusercontent.com/fusepoolP3/p3-geo-enriching-transformer/master/src/test/resources/eu/fusepool/p3/geo/enriching/test/farmacie-trentino-grounded.ttl](http://sandbox.fusepool.info:8193/?data=https://raw.githubusercontent.com/fusepoolP3/p3-geo-enriching-transformer/master/src/test/resources/eu/fusepool/p3/geo/enriching/test/farmacie-trentino-grounded.ttl) will enrich data with nearby pharmacies (assuming the data describes locations close to a pharmacy of Trentino).

The sources and more information about this transformer are available here: [https://github.com/fusepoolP3/p3-geo-enriching-transformer](https://github.com/fusepoolP3/p3-geo-enriching-transformer)

#### P3 Pipeline Transformer

The Pipeline Tranformer is a tranformer executing a list of (other) transformers in sequence.

[Learn more](pipeline-transformer/)

#### OpenLink RDF generating transformer

The Fusepool project partner [OpenLink Software](http://www.openlinksw.com/) provides serveral transformers to transform data to RDF.

[Learn more](openlink-rdf-generators/)

#### OpenLink annotating transformer

[OpenLink Software](http://www.openlinksw.com/) also provides serveral transformers automatically generating annotations to textual content.

[Learn more](openlink-annotators/)

### P3 Resource GUI

This is a graphical user interface to deal with Linked-Data-Platform-Collections.

Currently some functionality is not available when using with Marmotta, unless
some browser security features are disabled. To start chromium with disabled security:

    chromium-browser --disable-web-security

[http://fusepoolp3.github.io/resource-gui/?defaultContainer=http://sandbox.fusepool.info:8181/ldp](http://fusepoolp3.github.io/resource-gui/?defaultContainer=http://sandbox.fusepool.info:8181/ldp)

### P3 Dashboard

Currently only the the interface to handle User Interaction Requests is available

[http://fusepoolp3.github.io/user-interaction-gui/?defaultContainer=http://sandbox.fusepool.info:8181/ldp/user-interaction-requests](http://fusepoolp3.github.io/user-interaction-gui/?defaultContainer=http://sandbox.fusepool.info:8181/ldp/user-interaction-requests)

## <a name="support-or-contact"></a>Support or Contact

Need help or have suggestions? Get in touch with the developers with the
mailing list at [p3-devel@netlabs.org](mailto:p3-devel@netlabs.org) or
raise issues in github.

## <a name="about-fusepool-p3"></a>About Fusepool P3

Fusepool P3 is partially funded by the 7th Framework Program for
Innovation, under grant 609696. For further details about the project,
please refer to the official [webpage](http://p3.fusepool.eu/).
