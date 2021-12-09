interface DefaultLang {
	[key: string]: any;
}

const langList: DefaultLang = {
	"en-us": {
		prismic: `en-us`,
	},
};

const isDefaultLang = (lang: string): string => {
	const prismic = langList[lang]?.prismic;
	if (prismic) {
		return prismic;
	}

	return ``;
};

export default isDefaultLang;
