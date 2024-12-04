const mongoose = require("mongoose");

const reportsChartSchema = new mongoose.Schema(
  {
    district: {
      type: String,
      required: true,
    },
    lpo: {
      type: Number,
      required: true,
    },
  },
  { collection: "reportsChart" }
);

module.exports = mongoose.model("reportsChart", reportsChartSchema);
