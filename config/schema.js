import { pgTable, serial, text, varchar, integer, boolean } from "drizzle-orm/pg-core";

export const jsonForm = pgTable("jsonForms", {
  id: serial("id").primaryKey(),
  jsonForm: text("jsonForm").notNull(),
  theme: varchar("theme"),
  background: varchar("background"),
  style: varchar("style"),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull(),
  enableSignIn: boolean("enableSignIn").default(false)
});

export const userResponseJson=pgTable("formResponses", {
  id: serial("id").primaryKey(),
  response: text("response").notNull(),
  createdAt: varchar("createdAt").notNull(),
  createdBy: varchar("createdBy").notNull().default("anonymous"),
  formRef: integer("formRef").references(() => jsonForm.id),
});
