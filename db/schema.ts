import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const submissions = sqliteTable("submissions", {
  id: text("id").primaryKey(),
  kind: text("kind").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  service: text("service").notNull(),
  area: text("area").notNull(),
  message: text("message").notNull(),
  details: text("details").notNull(),
  createdAt: text("created_at").notNull(),
  status: text("status").notNull().default("new"),
  internalNotes: text("internal_notes").notNull().default(""),
  followUpAt: text("follow_up_at"),
  firstContactedAt: text("first_contacted_at"),
  updatedAt: text("updated_at"),
});
