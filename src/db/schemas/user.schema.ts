import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  age: integer().notNull(),
  email: varchar().notNull().unique(),
  address: varchar().notNull().default("KTM"),
});
export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;
