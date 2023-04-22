import { jsonResponse } from '$lib/helpers';

export function GET() {
	return jsonResponse({ message: 'Hello world!' }, 200);
}
