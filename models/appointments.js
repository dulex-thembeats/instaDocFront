const mongoose = require("mongoose");

const appointmentsSchema = new mongoose.Schema(
  /* 
    -userid
    -doctor_id
    -type
    -date
    -message

*/

  {
    date: {
      type: String,
      required: true,
      trim: true,
    },
    doctor_id: {
      type: String,
      default: false,
    },
    type: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      reuqired: true,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const appointments = mongoose.model("appointments", appointmentsSchema);
const rejected_appointments = mongoose.model(
  "rejected_appointments",
  appointmentsSchema
);

module.exports = appointments;
module.exports = rejected_appointments;
