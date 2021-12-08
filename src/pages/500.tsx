import Link from "next/link";

export default function Custom500() {
	return (
		<div className="flex items-center justify-center min-w-full min-h-screen">
			<div className="w-full h-full text-center font-laca">
				{/* <Image src="/logo.png" alt="Hello Flores" width={100} height={100} /> */}
				<h1 className="pb-4 text-4xl">500 | Server-side error occurred</h1>
				<Link href="/">
					<a className="">Go back home</a>
				</Link>
			</div>
		</div>
	);
}
