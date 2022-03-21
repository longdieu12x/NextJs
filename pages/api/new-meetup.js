import { MongoClient } from "mongodb";
// /api/new-meetup
// POST: /api/new-meetup
async function handler(req, res) {
	if (req.method === "POST") {
		const data = req.body;

		const client = MongoClient.connect(
			"mongodb+srv://root:minhdangdeptrai@cluster0.jo7so.mongodb.net/meetups?retryWrites=true&w=majority"
		);
		const db = (await client).db();
		const meetupsCollection = db.collection("meetups");
		const result = await meetupsCollection.insertOne(data);
		console.log(result);
		(await client).close();

		// return response
		res.status(201).json({
			message: "Meetup's inserted successfully!",
		});
	}
}

export default handler;
