const mongoose = require("../../database");

const PatientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    age: {
      type: Number,
      require: true
    },
    description: {
      type: String,
      require: true
    },
    observations: {
      type: String
    },
    location: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true
    }
  },
  {
    timestamps: true
  }
);

const Patient = mongoose.model("Patient", PatientSchema);

module.exports = Patient;
