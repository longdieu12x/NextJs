import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";

const NewMeetupPage = () => {
	const router = useRouter();
	async function addMeetupHandler(data) {
		const response = await fetch("/api/new-meetup", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const dataReturned = await response.json();
		console.log(dataReturned);

		// Return to home
		router.push("/");
	}
	return (
		<>
			<Head>
				<title>React Meetups</title>
				<meta name="description" content="Add new meetup" />
			</Head>
			<NewMeetupForm onAddMeetup={addMeetupHandler} />
		</>
	);
};

export default NewMeetupPage;
