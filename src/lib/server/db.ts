import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { DATABASE_URL } from '$env/static/private';

const connectionString = DATABASE_URL;
const client = postgres(connectionString);
export const db = drizzle(client);