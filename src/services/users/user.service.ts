import { eq } from "drizzle-orm";

import { NewUser, User, usersTable } from "../../db/schemas";
import { db } from "../../db/index";

class UserServices {
  async getAllUsers(): Promise<User[]> {
    return await db.select().from(usersTable);
  }
  async getUserByEmail(email: string): Promise<User | null> {
    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    return users[0] || null;
  }

  async getUserById(id: number): Promise<User | null> {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id));
    return user[0] || null;
  }

  async createUser(userData: NewUser): Promise<User> {
    const existingUser = await this.getUserByEmail(userData.email);
    if (existingUser) {
      throw new Error("Email already exist");
    }
    const result = await db.insert(usersTable).values(userData).returning();

    return result[0];
  }

  async updateUser(userData: User, id: number): Promise<User> {
    const existingUser = await this.getUserById(id);
    if (!existingUser) {
      throw new Error("user not found");
    }
    const [updatedUser] = await db
      .update(usersTable)
      .set({ name: userData.name, age: userData.age, email: userData.email })
      .where(eq(usersTable.id, userData.id))
      .returning();
    return updatedUser;
  }

  async deleteUser(id: number) {
    const existingUser = await this.getUserById(id);
    if (!existingUser) {
      throw new Error("User not Found");
    }
    const [deletedUser] = await db
      .delete(usersTable)
      .where(eq(usersTable.id, id))
      .returning();
    return deletedUser;
  }
}

export default UserServices;
