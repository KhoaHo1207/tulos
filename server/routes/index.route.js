import authRoute from "./auth.route.js";
import userRoute from "./user.route.js";
import categoryRoute from "./category.route.js";
import uploadRoute from "./upload.route.js";
import typeRoute from "./type.route.js";

const initRoute = (app) => {
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/user", userRoute);
  app.use("/api/v1/category", categoryRoute);
  app.use("/api/v1/upload", uploadRoute);
  app.use("/api/v1/type", typeRoute);
};

export default initRoute;
