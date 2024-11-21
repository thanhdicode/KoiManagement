import { createBrowserRouter } from "react-router-dom";
// import routes
import { privateRoutes } from "./privateRoutes";
import { publicRoutes } from "./publicRoutes";

const routes = [...publicRoutes, ...privateRoutes];
const router = createBrowserRouter(routes);

export default router;
