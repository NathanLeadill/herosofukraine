import type { RequestEvent } from '../routes/api/fetch-heros/$types';

export function jsonResponse<T>(data: T, status = 200): Response {
	return new Response(JSON.stringify(data), {
		headers: { 'Content-Type': 'application/json' },
		status
	});
}

export async function jsonRequest<T>(request: RequestEvent): Promise<T> {
	try {
		return await request.request.json();
	} catch {
		throw 'Invalid JSON body';
	}
}
