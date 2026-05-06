import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const stats = pgTable("stats", {
  id: serial().primaryKey(),
  experience: text().notNull(),
  projects: text().notNull(),
  technologies: text().notNull(),
  clients: text().notNull(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
})