import UserController from "@root/src/controllers/users/user.controller";
import { Router } from "express";

class UserRoutes {
  public router: Router;
  private userController: UserController;
  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.initilaizedRoutes();
  }
  private initilaizedRoutes(): void {
    this.router.get("/", this.userController.getAll);
    this.router.post("/create-user", this.userController.create);
    this.router.delete("/delete/:userId", this.userController.delete);
    this.router.put("/update-user/:userId", this.userController.update);
  }
}
export default UserRoutes;
