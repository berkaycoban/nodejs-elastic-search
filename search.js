const { index } = require("./elasticClient");
const esClient = require("./elasticClient");

const search = async function (indexName, mappingType, searchQuery) {
  return await esClient.search({
    index: indexName,
    type: mappingType,
    body: searchQuery,
  });
};

module.exports = search;
