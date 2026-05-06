import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const skills = pgTable("skills", {
  id: serial().primaryKey(),
  name: text().notNull(),
  category: text().notNull(),
  icon: text().notNull(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
})