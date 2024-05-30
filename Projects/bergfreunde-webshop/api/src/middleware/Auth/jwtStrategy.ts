import {
  ExtractJwt,
  Strategy as JWTStrategy,
  VerifiedCallback,
} from "passport-jwt";
import UserModel from "../../modules/Users/User.model";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

// jwt strategy to check jwt token
const jwtStrategy = new JWTStrategy(
  jwtOptions,
  async (payload: any, done: VerifiedCallback) => {
    try {
      const user = await UserModel.findById(payload._id);
      if (!user) {
        return done(null, false);
      }
      return done(null, user, payload); // Pass the payload to the next middleware
    } catch (e) {
      return done(e, false);
    }
  }
);

export default jwtStrategy;
