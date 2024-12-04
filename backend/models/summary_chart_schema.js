const mongoose = require("mongoose");

const summaryChartSchema = new mongoose.Schema(
  {
    project: {
      type: String,
      required: true,
    },
    funds: {
      type: Number,
      required: true,
    },
  },
  { collection: "summaryChart" }
);

module.exports = mongoose.model("summaryChart", summaryChartSchema);
