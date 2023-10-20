import { z } from 'zod';

export const signInUserSchema = z.object({
	email: z.string().email(),
	password: z.string().min(10)
});

export const newUserSchema = z.object({
	name: z.string().min(1),
	email: z.string().email(),
	password: z.string().min(10)
});

export const todoSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1)
});

export const todoIdSchema = z.object({
	id: z
		.string()
		.min(1)
		.refine((data: string) => !isNaN(Number(data)), {
			message: 'ID must be a numeric value'
		})
});