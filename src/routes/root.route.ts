import { Router } from "express";
import UserRoutes from "./users/users.route";
// import ProductsRoutes if you have it similarly

const rootRoute = Router({ mergeParams: true });

// Instantiate the class and use its router
const userRoutes = new UserRoutes();
rootRoute.use("/users", userRoutes.router);

export { rootRoute };
