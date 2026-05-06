import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const experience = pgTable("experience", {
  id: serial().primaryKey(),
  company: text().notNull(),
  role: text().notNull(),
  duration: text().notNull(),
  description: text().notNull(),
})