const esClient = require("./elasticClient");
const createIndex = require("./index");
const addMappingToIndex = require("./mapping");
const insertDoc = require("./document");
const search = require("./search");

esClient.ping(
  {
    requestTimeout: 1000,
  },
  async function (error) {
    if (error) {
      console.trace("ElasticSearch'e Erisilmiyor");
    } else {
      console.log("ElasticSearch ayakta");

      try {
        // Config
        const indexName = "games";
        const mappingType = "categorystore";

        // Create index
        const response = await createIndex(indexName);
        console.log("index: " + indexName);

        /*
        // Create GameMap
        const mapping = {
          properties: {
            title: {
              type: "text",
            },
            tags: {
              type: "keyword",
            },
            body: {
              type: "text",
            },
            age: {
              type: "integer",
            },
          },
        };

        const responseMap = await addMappingToIndex(
          indexName,
          mappingType,
          mapping
        ); 
        */
        /*
        // Create Data
        var data = [
          {
            title: "Call of Duty",
            tags: ["War", "Shooter"],
            body: "It is about 2. World War",
            age: 13,
          },
          {
            title: "Mortal Kombat 11",
            tags: ["Fight", "Violance"],
            body: "It is about killing each other.",
            age: 20,
          },
          {
            title: "Death Stranding",
            tags: ["Delivery", "Beach"],
            body: "It is about delivering package to it's owner.",
            age: 18,
          },
        ];

        for (var i = 0; i < data.length; i++) {
          const resDocument = await insertDoc(
            indexName,
            i,
            mappingType,
            data[i]
          );
        }
        */

        /*
        // Search just like sql %LIKE%
        const body = {
          query: {
            match_phrase_prefix: {
              title: "Death",
            },
          },
        };

        const resSearch = await search(indexName, mappingType, body);
        console.log(
          `Adi: ${resSearch.hits.hits[0]._source.title} \nAciklama: ${resSearch.hits.hits[0]._source.body}`
        );
        */

        // Search with Aggregation
        const body = {
          query: {
            match: {
              title: "Duty",
            },
          },
          aggs: {
            tags: {
              terms: {
                field: "tags",
              },
            },
          },
        };
        const resSearch = await search(indexName, mappingType, body);
        console.log(
          `Adi: ${resSearch.hits.hits[0]._source.title} \nAciklama: ${resSearch.hits.hits[0]._source.body}`
        );
        console.log(
          `Aggregations Key1 - Document Count: ${resSearch.aggregations.tags.buckets[0].key} - ${resSearch.aggregations.tags.buckets[0].doc_count}`
        );
        console.log(
          `Aggregations Key2 - Document Count: ${resSearch.aggregations.tags.buckets[1].key} - ${resSearch.aggregations.tags.buckets[1].doc_count}`
        );
      } catch (e) {
        console.log(e);
      }
    }
  }
);
