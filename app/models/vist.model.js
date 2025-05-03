import mongoose from "mongoose";

const VisitSchema = new mongoose.Schema({
  route: {
    type: String,
    required: true,
  },
  visitDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Visit || mongoose.model("Visit", VisitSchema);
