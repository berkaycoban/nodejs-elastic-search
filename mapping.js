const esClient = require("./elasticClient");

const addMappingToIndex = async function (indexName, mappingType, mapping) {
  console.log(mapping);
  return await esClient.indices.putMapping({
    index: indexName,
    type: mappingType,
    body: mapping,
    include_type_name: true,
  });
};

module.exports = addMappingToIndex;
