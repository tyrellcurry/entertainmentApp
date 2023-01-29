import clientPromise from "../../lib/mongodb.ts";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("entertainment");

    const posts = await db.collection("medias").find({}).limit(20).toArray();

    res.json(posts);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};