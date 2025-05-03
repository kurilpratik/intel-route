import dbConnect from "@/app/lib/mongodb";
import Visit from "@/app/models/vist.model";

export async function POST(req) {
  const { path } = await req.json();
  if (!path) return new Response("Missing path", { status: 400 });

  try {
    await dbConnect();
    const visit = new Visit({ route: path });
    await visit.save();

    console.log("Route logged to db:", path);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error logging route:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
