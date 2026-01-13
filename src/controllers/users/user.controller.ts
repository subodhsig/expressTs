import { Request, Response } from "express";
import UserServices from "../../services/users/user.service";
import { User } from "@root/src/db";

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

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = Number(req.params.userId);
      if (isNaN(userId)) {
        res.status(400).json({ message: "Invalid user id" });
        return;
      }
      const deletedUser = await this.userService.deleteUser(userId);
      res
        .status(200)
        .json({ message: "User Deleted Sucessfully", data: deletedUser });
    } catch (error: any) {
      res.status(500).json({
        message: error.message || "Internal server error",
      });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = Number(req.params.userId);
      const userData = req.body;

      if (isNaN(userId)) {
        res.status(400).json({ message: "Invalid user ID" });
        return;
      }

      const updatedUser = await this.userService.updateUser(userData, userId);

      res.status(200).json({
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (error: any) {
      if (error.message === "User not found") {
        res.status(404).json({ message: error.message });
        return;
      }

      res.status(500).json({
        message: "Internal server error",
      });
    }
  };
}
export default UserController;
