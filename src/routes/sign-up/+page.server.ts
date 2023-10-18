import bcrypt from "bcrypt";
import { redirect } from '@sveltejs/kit';
import { usersTable } from "$lib/server/schema.js";
import { db } from "$lib/server/db.js";
import { createAuthJWT } from "$lib/server/jwt.js";

export const load = async ({ cookies }) => {
  const token = cookies.get("auth_token");

  if (token) {
    throw redirect(301, "/todos")
  }
};

export const actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();
    const first_name = formData.get("first_name") || "";
    const last_name = formData.get("last_name") || "";
    const email = formData.get("email") || "";
    const password = formData.get("password") || "";

    /*
      ADD VALIDATION HERE!!!!
    
    
    */ 

    const hashedPassword = await bcrypt.hash(password.toString(), 10);

    const newUser = await db.insert(usersTable).values({
      first_name,
      last_name,
      email,
      password: hashedPassword
    }).returning();

    // Remove toString() after implementing validation!!!
    const token = await createAuthJWT({
      firstName: first_name.toString(),
      lastName: last_name.toString(),
      email: email.toString(),
      id: newUser[0].id
    })

    cookies.set("auth_token", token, {
      path: "/"
    });

    throw redirect(301, "/todos")
  }
}