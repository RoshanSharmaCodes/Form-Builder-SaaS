import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const forms = pgTable('jsonForms', {
  id: serial('id').primaryKey(),
  jsonForm: text("jsonForm").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull()
});
