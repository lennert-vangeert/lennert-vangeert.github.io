import "dotenv/config";
import mongoose from "mongoose";
import app from "./app";
import { Server } from "http";
import UserModel from "./modules/Users/User.model";
const port: number = parseInt(process.env.PORT ?? "5000");

if (process.env.MONGO_CONNECTION) {
  mongoose
    .connect(process.env.MONGO_CONNECTION)
    .then(() => {
      console.log("Connected to MongoDB");

      //start server
      const server = app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
      });

      // const user = new UserModel({
      //   email: "lennert.vangeert@gmail.com",
      //   password: "[REDACTED]",
      //   firstName: "Lennert",
      //   lastName: "Van Geert",
      //   address: "abc",
      //   role: "admin",
      // });
      // user.save();

      // const user = new UserModel({
      //   email: "test2@gmail.com",
      //   password: "[REDACTED]",
      //   firstName: "Lando",
      //   lastName: "Norris",
      //   address: {
      //     street: "test",
      //     city: "test",
      //     state: "test",
      //     zip: "test",
      //   },
      //   role: "seller",
      // });
      // user.save();

      server.on("SIGINT", () => stopServer(server));
      server.on("SIGTERM", () => stopServer(server));
    })
    .catch((err) => console.log(err));
} else {
  throw new Error("MongoDB connection string not found");
}

const stopServer = (server: Server) => {
  mongoose.connection.close();
  server.close(() => {
    console.log("Server closed");
    process.exit();
  });
};
