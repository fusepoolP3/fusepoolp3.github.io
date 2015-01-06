---
layout: page
title: Fusepool P3 Pipeline Transformer
permalink: /pipeline-transformer/
---

The Pipeline Tranformer is a tranformer executing a list of (other) transformers in sequence.

Source: https://github.com/fusepoolP3/p3-pipeline-transformer

Service providing such transformers: http://sandbox.fusepool.info:8191/

###Usage

The pipeline transformer expects the list of transformers URIs in the query string of the request. The pipeline applies the transformers in the same order it was supplied in the request. It is important that the URIs of the transformers must be **URL encoded**, since these can also contain their own query strings.

The supported input and output formats to a specific pipeline are determined by the first and the last transformer in the pipeline.

Get the supported formats to a pipeline using the command

    curl -X GET "http://sandbox.fusepool.info:8191/?t=<transformer1_URI>&...&t=<transformerN_URI>"

To invoke a specific pipeline with data use the following command

    curl -X POST -d <data> "http://sandbox.fusepool.info:8191/?t=<transformer1_URI>&...&t=<transformerN_URI>"

The output format of the pipeline is determined by the last transformer in the pipeline. If this transformer supports multiple output formats, then the format of the output is randomly chosen. To avoid this set the Accept-Header to the desired output format.

    curl -X POST -H "Accept: text/turtle" -d <data> "http://sandbox.fusepool.info:8191/?t=<transformer1_URI>&...&t=<transformerN_URI>"

It is also possible to set the Content-Location header when invoking the pipeline transformer, which then will forward this to each transformers in the pipeline.

    curl -X POST -H "Content-Location: http://example.com/document1" -d <data> "http://sandbox.fusepool.info:8191/?t=<transformer1_URI>&...&t=<transformerN_URI>"


