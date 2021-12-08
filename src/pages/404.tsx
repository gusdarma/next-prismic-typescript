import Link from "next/link";
// import Image from 'next/image';

// pages/404.js
export default function Custom404() {
	return (
		<>
			<div className="flex items-center justify-center min-w-full min-h-screen">
				<div className="w-full h-full text-center font-laca">
					{/* <Image src="/logo.png" alt="Hello Flores" width={100} height={100} /> */}
					<h1 className="pb-4 text-4xl">404 | Page Not Found</h1>
					<Link href="/">
						<a className="">Go back home</a>
					</Link>
				</div>
			</div>
		</>
	);
}
