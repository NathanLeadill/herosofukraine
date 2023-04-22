import { jsonResponse } from '$lib/helpers';
import * as heros from '../../../heros.json';

export async function GET() {
	return jsonResponse(
		{
			heros: heros.heros
		},
		200
	);
}
