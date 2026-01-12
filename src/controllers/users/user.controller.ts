import { Request, Response } from "express";
import UserServices from "../../services/users/user.service";

class UserController {
  private userService: UserServices;

  constructor() {
    this.userService = new UserServices();
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "failed to fetch user" });
    }
  };
}
export default UserController;
