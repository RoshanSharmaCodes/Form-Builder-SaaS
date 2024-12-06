import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const jsonForm = pgTable('jsonForms', {
  id: serial('id').primaryKey(),
  jsonForm: text("jsonForm").notNull(),
  theme: varchar("theme"),
  background: varchar("background"),
  style: varchar("style"),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull()
});
