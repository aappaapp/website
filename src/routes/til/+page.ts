import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		page: {
			title: 'Today I Learnt',
			description: "An updating list of fun facts that I've learnt on a specific day."
		}
	};
};
