import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const profile = pgTable("profile", {
  id: serial().primaryKey(),
  name: text(),
  title: text(),
  email: text().notNull().unique(),
  password: text(),
  mobile: text(),
  profilePic: text(),
  bio: text(),
  resume: text(),
  github: text(),
  linkedin: text(),
  role: text().notNull().default("user"), 
  location: text(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
})