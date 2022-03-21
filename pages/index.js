import MeetupList from "../components/meetups/MeetupList";
import { useEffect, useState } from "react";
import { MongoClient } from "mongodb";
import Head from "next/head";
//  Them metatag vao tung page
const HomePage = (props) => {
	return (
		<>
			<Head>
				<title>React Meetups</title>
				<meta
					name="description"
					content="Browse a huge list of highly active React Meetups"
				/>
			</Head>
			<MeetupList meetups={props.meetups} />
		</>
	);
};

// export async function getServerSideProps(context) {
// 	const req = context.req;
// 	const res = context.res;
// 	// fetch data from an API
// 	console.log(req, res);
// 	return {
// 		props: {
// 			meetups: DUMMY_MEETUPS,
// 		},
// 	};
// }

export async function getStaticProps() {
	// fetch data from a database
	const client = MongoClient.connect(
		"mongodb+srv://root:minhdangdeptrai@cluster0.jo7so.mongodb.net/meetups?retryWrites=true&w=majority"
	);
	const db = (await client).db();
	const meetupsCollection = db.collection("meetups");

	const meetups = await meetupsCollection.find().toArray();

	(await client).close();

	return {
		props: {
			meetups: meetups.map((meetup) => ({
				...meetup,
				_id: meetup._id.toString(),
				id: meetup._id.toString(),
			})),
		},
		revalidate: 10, // nextjs will wait 10s for rerendering
	};
}

export default HomePage;
