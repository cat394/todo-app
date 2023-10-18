import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { redirect } from '@sveltejs/kit';
import { usersTable } from "$lib/server/schema";
import { db } from "$lib/server/db";
import { createAuthJWT } from "$lib/server/jwt";
import { fail } from "@sveltejs/kit"
import { setError, superValidate } from "sveltekit-superforms/server"
import { newUserSchema } from "$lib/validateSchema";

export const load = async (event) => {
  const token = event.cookies.get("auth_token");
  if (token) {
    throw redirect(301, "/todos");
  }

  const form = await superValidate(event, newUserSchema);
	return { form }
};

export const actions = {
  default: async (event) => {
    const form = await superValidate(event, newUserSchema);
    const name = form.data.name;
    const email = form.data.email;
    const password = form.data.password;

		if (!form.valid) {
			return fail(400, {
				form
			})
		}

    const isExistEmail = await db
      .select({
        email: usersTable.email
      })
      .from(usersTable)
      .where(eq(usersTable.email, form.data.email))
    
    if (isExistEmail.length) {
      return setError(form, 'email', 'E-mail already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.insert(usersTable).values({
      name,
      email,
      password: hashedPassword
    }).returning();

    const token = await createAuthJWT({
      name,
      email,
      id: newUser[0].id
    });

    event.cookies.set("auth_token", token, {
      path: "/"
    });

    throw redirect(301, "/todos");
  }
}