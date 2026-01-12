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

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.createUser(req.body);

      res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error && error.message === "Email already exists") {
        res.status(400).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Failed to create user" });
    }
  };
}
export default UserController;
