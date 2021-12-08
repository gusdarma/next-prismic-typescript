interface ArchiveList {
	[key: string]: any;
}

const archiveLists: ArchiveList = {
	blog: {
		prismic: `blog`,
	},
};

const isArchive = (archive: string): string => {
	const prismic = archiveLists[archive]?.prismic;
	if (prismic) {
		return prismic;
	}

	return ``;
};

export default isArchive;
