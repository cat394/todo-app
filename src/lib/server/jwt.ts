import { JWT_SECRET } from '$env/static/private';
import { error } from '@sveltejs/kit';
import * as jose from 'jose';

type JWTPayload = {
	name: string;
	email: string;
	id: number;
};

export const createAuthJWT = async (data: JWTPayload) => {
	try {
		const jwt = await new jose.SignJWT(data)
			.setProtectedHeader({ alg: 'HS256' })
			.sign(new TextEncoder().encode(JWT_SECRET));
		return jwt;
	} catch (err) {
		throw error(401, 'failed create JWT...');
	}
};

export const verifyAuthJWT = async (token: string) => {
	try {
		const { payload } = await jose.jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
		return payload as JWTPayload;
	} catch {
		throw error(401, 'invalid or missing JWT, you are not logged in');
	}
};
