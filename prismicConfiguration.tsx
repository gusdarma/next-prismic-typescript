// -- Prismic Repo Name
export const repoName = "prismic-next-boilerplate";

// -- Prismic API endpoint
// Determines which repository to query and fetch data from
// Configure your site's access point here
export const apiEndpoint = `https://${repoName}.prismic.io/api/v2`;

// -- Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
export const accessToken =
	"MC5ZWlNfcmhFQUFDRUFPVFZ6.CXfvv73vv70e77-977-977-9e--_vTrvv70Z77-9JO-_vWLvv73vv73vv73vv73vv71nSDPvv73vv73vv73vv73vv71WHA";

// -- Link resolution rules
// Manages the url links to internal Prismic documents
export const linkResolver = (doc: { type: string; uid: any }) => {
	if (doc.type === "page") {
		return `/${doc.uid}`;
	}
	return "/";
};

// -- Route Resolver rules
// Manages the url links to internal Prismic documents two levels deep (optionals)
export const Router = {
	routes: [
		{
			type: "blog",
			path: "/:uid",
		},
	],
};
