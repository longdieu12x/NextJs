import { MongoClient, ObjectId } from "mongodb";
import Head from "next/dist/shared/lib/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";
const MeetupDetails = (props) => {
	return (
		<>
			<Head>
				<title>React Meetups</title>
				<meta name="description" content={props.meetupData.description} />
			</Head>
			<MeetupDetail {...props.meetupData} />
		</>
	);
};

// when using getStaticProps you have to have getStaticPaths function
// only if you use dynamic page such as [x] folder
export async function getStaticPaths() {
	const client = MongoClient.connect(
		"mongodb+srv://root:minhdangdeptrai@cluster0.jo7so.mongodb.net/meetups?retryWrites=true&w=majority"
	);
	const db = (await client).db();
	const meetupsCollection = db.collection("meetups");

	const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

	(await client).close();
	return {
		fallback: "blocking", // false mean if meetupId != m1 go to 404, true mean if meetupId != m1 add ot to params
		paths: meetups.map((meetup) => ({
			params: { meetupId: meetup._id.toString() },
		})),
	};
}

// Can not use useRouter in this function because it was in pre-render step
export async function getStaticProps(context) {
	const meetupId = context.params.meetupId; // get meetupId

	const client = MongoClient.connect(
		"mongodb+srv://root:minhdangdeptrai@cluster0.jo7so.mongodb.net/meetups?retryWrites=true&w=majority"
	);
	const db = (await client).db();
	const meetupsCollection = db.collection("meetups");

	const selectedMeetup = await meetupsCollection.findOne({
		_id: ObjectId(meetupId),
	});

	console.log(selectedMeetup);
	(await client).close();

	return {
		props: {
			meetupData: {
				...selectedMeetup,
				_id: selectedMeetup._id.toString(),
				id: selectedMeetup._id.toString(),
			},
		},
	};
}

export default MeetupDetails;
