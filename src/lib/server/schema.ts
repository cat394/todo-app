import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').unique().notNull(),
	password: text('password').notNull()
});

export const todosTable = pgTable('todos', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	description: text('description'),
	completed: boolean('completed').notNull(),
	user_id: integer('user_id').notNull()
});

export const usersTableRelations = relations(usersTable, ({ many }) => ({
	todos: many(todosTable)
}));

export const todosTableRelations = relations(todosTable, ({ one }) => ({
	user: one(usersTable, {
		fields: [todosTable.user_id],
		references: [usersTable.id]
	})
}));
