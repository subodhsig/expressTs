import { db } from "../../db";
import { User, usersTable } from "../../db/schema";

class UserServices {
  async getAllUsers(): Promise<User[]> {
    return await db.select().from(usersTable);
  }
}

export default UserServices;
