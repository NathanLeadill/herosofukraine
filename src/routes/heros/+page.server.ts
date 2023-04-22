import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch }) => {
	const request = await fetch('/api/fetch-heros');
	const { heros } = await request.json();
	console.log('HEROS', heros, 'ASTER');

	return {
		heros
	};
};
