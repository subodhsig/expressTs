import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./user.schema";

export const productTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  description: varchar().notNull(),
  userId: integer()
    .notNull()
    .references(() => usersTable.id),
});
export type Prodcut = typeof productTable.$inferSelect;
export type NewProduct = typeof productTable.$inferInsert;
