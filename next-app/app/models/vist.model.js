import mongoose from "mongoose";

const VisitSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
  },
  route: {
    type: String,
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.Visit || mongoose.model("Visit", VisitSchema);
