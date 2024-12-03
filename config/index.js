import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { forms } from './schema';

const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
const db = drizzle({ client: forms });

export const result = await db.execute('select 1');
