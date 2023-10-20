import bcrypt from 'bcrypt';
import { db } from '$lib/server/db';
import { usersTable } from '$lib/server/schema';
import { error, fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { createAuthJWT } from '$lib/server/jwt';
import { superValidate } from 'sveltekit-superforms/server';
import { signInUserSchema } from '$lib/validateSchema';

export const load = async (event) => {
	const token = event.cookies.get('auth_token');

	if (token) {
		throw redirect(301, '/todos');
	}

	const form = await superValidate(event, signInUserSchema);
	return { form };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, signInUserSchema);
		const email = form.data.email;
		const password = form.data.password;

		if (!form.valid) {
			return fail(400, { form });
		}

		const user = await db
			.select({
				id: usersTable.id,
				name: usersTable.name,
				email: usersTable.email,
				password: usersTable.password
			})
			.from(usersTable)
			.where(eq(usersTable.email, email))
			.limit(1);

		if (user.length === 0) {
			throw error(404, 'user account is not found');
		}

		const passwordIsRight = await bcrypt.compare(password, user[0].password);

		if (!passwordIsRight) {
			throw error(400, 'incorrect password');
		}

		const token = await createAuthJWT({
			name: user[0].name,
			email: user[0].email,
			id: user[0].id
		});

		event.cookies.set('auth_token', token, { path: '/' });

		throw redirect(301, '/todos');
	},

	// githubSignIn: async (event) => {
	// 	await signIn("github");
	// 	const session = await event.locals.getSession();
	// 	if (session && session.user && session.user.name && session.user.email) {
	// 		const token = await createAuthJWT({
	// 			name: session.user.name,
	// 			email: session.user.email,
	// 		});
	
	// 		event.cookies.set('auth_token', token, { path: '/' });
	
	// 		throw redirect(301, '/todos');
	// 	}
	// }
};
