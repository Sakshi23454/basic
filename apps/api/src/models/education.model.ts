import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const education = pgTable("education", {
  id: serial().primaryKey(),
  college: text().notNull(),
  degree: text().notNull(),
  year: text().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})