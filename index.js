const esClient = require("./elasticClient");

const createIndex = async function (indexName) {
  try {
    return await esClient.indices.get({
      index: indexName,
    });
  } catch (e) {
    return await esClient.indices.create({
      index: indexName,
    });
  }
};

module.exports = createIndex;
