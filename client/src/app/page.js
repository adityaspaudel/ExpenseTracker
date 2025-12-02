import Image from "next/image";
import UserLogin from "./(auth)/login/page";

export default function Home() {
	return (
		<main>
			<UserLogin />
		</main>
	);
}
