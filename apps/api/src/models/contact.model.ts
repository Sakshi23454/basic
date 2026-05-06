import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const contact = pgTable("contact", {
  id: serial().primaryKey(),
  name: text().notNull(),
  email: text().notNull(),
  subject: text().notNull(),
  message: text().notNull(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
})