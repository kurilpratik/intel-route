import dbConnect from "@/app/lib/mongodb";

export default async (req, res) => {
  const { route, timestamp } = JSON.parse(req.body);
  await dbConnect();
  await db.collection("routes-log").insertOne({ route, timestamp });
  res.status(200).json({ success: true });
};
