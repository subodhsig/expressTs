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

  async createUser(userData: NewUser): Promise<User> {
    const existingUser = await this.getUserByEmail(userData.email);
    if (existingUser) {
      throw new Error("Email already exist");
    }
    const result = await db.insert(usersTable).values(userData).returning();

    return result[0];
  }
}

export default UserServices;
