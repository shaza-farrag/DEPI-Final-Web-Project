const Statistics = require("../models/statistics.model");

const initializeStatistics = async () => {
  const exists = await Statistics.findOne();

  if (!exists) {
    await Statistics.create({});
  }
};

module.exports = initializeStatistics;