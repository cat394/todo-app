import { db } from '$lib/server/db.js';
import { verifyAuthJWT } from '$lib/server/jwt.js';
import { todosTable } from '$lib/server/schema.js';
import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load = async ({ cookies }) => {
  const token = cookies.get("auth_token");

  if (!token) {
    throw redirect(301, "/sign-in")
  }

  const userPayload = await verifyAuthJWT(token);
  console.log(userPayload)
  const todos = await db
    .select({
      id: todosTable.id,
      title: todosTable.title,
      description: todosTable.description,
      completed: todosTable.completed
    })
    .from(todosTable)
    .where(eq(todosTable.user_id, userPayload.id));
  return { todos };
};

export const actions = {
  create: async ({ request, cookies }) => {
    const formData = await request.formData();
    const title = formData.get("title") || "";
    const description = formData.get("description") || "";

    /*
      ADD VALIDATION HERE!!!!
    
    
    */ 

    const token = cookies.get("auth_token");
    if (!token) {
      throw redirect(301, "/sign-in")
    }

    const userPayload = await verifyAuthJWT(token);

    // Remove toString() after implementing validation!!!
    await db.insert(todosTable).values({
      title: title.toString(),
      description: description.toString(),
      completed: false,
      user_id: userPayload.id
    });

    return { success: true };
  },

  delete: async ({ request, cookies }) => {
    const formData = await request.formData()
    const id = formData.get("id") || "";

    /*
      ADD VALIDATION HERE!!!!
    
    
    */     

    const token = cookies.get("auth_token");
    if (!token) {
      throw redirect(301, "/sign-in")
    }

    await verifyAuthJWT(token);

    // Remove toString() after implementing validation!!!
    await db
      .delete(todosTable)
      .where(eq(todosTable.id, parseInt(id.toString())));

    return { success: true };
  },


  complete: async ({ request, cookies }) => {
    const formData = await request.formData();
    const id = formData.get("id") || "";
    
    /*
      ADD VALIDATION HERE!!!!
    
    
    */     

    const token = cookies.get("auth_token");
    if (!token) {
      throw redirect(301, "/sign-in");
    }

    await verifyAuthJWT(token);

    // Remove toString() after implementing validation!!!
    await db
      .update(todosTable)
      .set({ completed: true })
      .where(eq(todosTable.id, parseInt(id.toString())));
    
    return { success: true };
  }
};