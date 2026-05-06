import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const project = pgTable("project", {
  id: serial().primaryKey(),
  title: text().notNull(),
  description: text().notNull(),
  skills: text().array().notNull(),
  githubLink: text().notNull(),
  liveLink: text().notNull(),
  image: text().notNull(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
})