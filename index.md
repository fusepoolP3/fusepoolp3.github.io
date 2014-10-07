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

### P3 Dictionary Matcher

The dictionary matcher provides transformers the recognize entities from a SKOS taxonomy. For example the matcher with URI (http://sandbox.fusepool.info:8192/?taxonomy=http://data.nytimes.com/descriptors.rdf)[http://sandbox.fusepool.info:8192/?taxonomy=http://data.nytimes.com/descriptors.rdf] will find mentions of New York Times category in a textual content.

To try it out witch cURL: 

`curl -X POST -d "Frauds and Swindlings cause significant concerns with regards to Ethics." "http://sandbox.fusepool.info:8192/?taxonomy=http://data.nytimes.com/descriptors.rdf"`



## <a name="support-or-contact"></a>Support or Contact

Need help or have suggestions? Get in touch with the developers with the
mailing list at [p3-devel@netlabs.org](mailto:p3-devel@netlabs.org) or
raise issues in github.

## <a name="about-fusepool-p3"></a>About Fusepool P3

Fusepool P3 is partially funded by the 7th Framework Program for
Innovation, under grant 609696. For further details about the project,
please refer to the official [webpage](http://p3.fusepool.eu/).
