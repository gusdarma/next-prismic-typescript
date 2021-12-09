interface DefaultLang {
	[key: string]: any;
}

const langList: DefaultLang = {
	"fr-fr": {
		prismic: `fr-fr`,
	},
};

const isTranslate = (lang: string): string => {
	const prismic = langList[lang]?.prismic;
	if (prismic) {
		return prismic;
	}

	return ``;
};

export default isTranslate;
