import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { db } from '$lib/server/db';
import { todosTable } from '$lib/server/schema';
import { verifyAuthJWT } from '$lib/server/jwt';
import { todoIdSchema, todoSchema } from '$lib/validateSchema';

export const load = async (event) => {
	const token = event.cookies.get('auth_token');
	if (!token) {
		throw redirect(301, '/sign-up');
	}

	const form = await superValidate(event, todoSchema);

	const userPayload = await verifyAuthJWT(token);

	const todos = await db
		.select({
			id: todosTable.id,
			title: todosTable.title,
			description: todosTable.description,
			completed: todosTable.completed
		})
		.from(todosTable)
		.where(eq(todosTable.user_id, userPayload.id));
	return { todos, form };
};

export const actions = {
	create: async (event) => {
		const token = event.cookies.get('auth_token');
		if (!token) {
			throw redirect(301, '/sign-up');
		}

		const form = await superValidate(event, todoSchema);
		const title = form.data.title;
		const description = form.data.description;

		if (!form.valid) {
			return fail(400, { form });
		}

		const userPayload = await verifyAuthJWT(token);

		await db.insert(todosTable).values({
			title,
			description: description.toString(),
			completed: false,
			user_id: userPayload.id
		});

		return { success: true };
	},

	delete: async (event) => {
		const token = event.cookies.get('auth_token');
		if (!token) {
			throw redirect(301, '/sign-up');
		}

		const form = await superValidate(event, todoIdSchema);
		const id = form.data.id;

		await db.delete(todosTable).where(eq(todosTable.id, parseInt(id)));

		return { success: true };
	},

	complete: async (event) => {
		const token = event.cookies.get('auth_token');
		if (!token) {
			throw redirect(301, '/sign-up');
		}

		const form = await superValidate(event, todoIdSchema);
		const id = form.data.id;

		await db
			.update(todosTable)
			.set({ completed: true })
			.where(eq(todosTable.id, parseInt(id)));

		return { success: true };
	}
};
