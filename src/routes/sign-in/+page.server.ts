import bcrypt from "bcrypt";
import { db } from '$lib/server/db.js';
import { usersTable } from '$lib/server/schema.js';
import { error, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { createAuthJWT } from "$lib/server/jwt.js";

export const load = async ({ cookies }) => {
  const token = cookies.get("auth_token");

  if (token) {
    throw redirect(301, "/todos")
  }
};

export const actions = {
  default:async ({ cookies, request }) => {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    /*
      ADD VALIDATION HERE!!!!
    
    
    */ 

    if (!email || !password) {
      throw error(400, "must provide email and password");
    }

    const user = await db
      .select({
        id: usersTable.id,
        first_name: usersTable.first_name,
        last_name: usersTable.last_name,
        email: usersTable.email,
        password: usersTable.password,
      })
      .from(usersTable)
      .where(eq(usersTable.email, email.toString()))
      .limit(1);

    if (user.length === 0) {
      throw error(404, "user account is not found")
    }

    // Remove toString() after implementing validation!!!
    const passwordIsRight = await bcrypt.compare(
      password.toString(),
      user[0].password
    )

    if (!passwordIsRight) {
      throw error(400, "incorrect password")
    }

    const token = await createAuthJWT({
      firstName: user[0].first_name,
      lastName: user[0].last_name,
      email: user[0].email,
      id: user[0].id
    });

    cookies.set("auth_token", token, {
      path: "/"
    });

    throw redirect(301, "/todos");
  }
}