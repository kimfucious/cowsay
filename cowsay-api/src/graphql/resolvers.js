import { cows } from "../data/cows";
import { titleCase, newError } from "../utils/helpers";
import { User } from "../models";
import { validateAuthUserInput } from "../utils";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import util from "util";

const exec = util.promisify(require("child_process").exec);

export const gqlResolvers = {
  deleteUser: async ({ _id }, req) => {
    if (!req.isAuthorized) throw newError(403, "Forbidden");
    const submitter = await User.findById(req.userId);
    if (!submitter) throw newError(404, "Submitter not found!");
    if (!submitter.isAdmin && req.userId !== _id) {
      throw newError(403, "Forbidden");
    }
    const deletedUser = await User.findByIdAndDelete(_id);
    if (!deletedUser) {
      return false;
    }
    return true;
  },
  getCows: (args, req) => {
    if (!req.isAuthorized) throw newError(403, "Forbidden");
    return cows;
  },
  getCowsay: async ({ message, character }, req) => {
    if (!req.isAuthorized) throw newError(403, "Forbidden");
    if (!character || !cows.includes(titleCase(character))) {
      character = "cow";
    }
    if (!message) {
      const { stdout, stderr } = await exec(`fortune | cowsay -f ${character}`);
      if (stderr) throw new Error(stderr);
      return stdout;
    } else {
      try {
        const { stdout, stderr } = await exec(
          `cowsay -f ${character} ${message}`
        );

        if (stderr) throw new Error(stderr);
        return stdout;
      } catch (err) {
        throw new Error(err);
      }
    }
  },

  getCowsayHelper: async ({ message }, req) => {
    const character = "cow";
    try {
      const { stdout, stderr } = await exec(
        `cowsay -f ${character} ${message}`
      );

      if (stderr) throw new Error(stderr);
      return stdout;
    } catch (err) {
      throw new Error(err);
    }
  },

  getUser: async ({ _id }, req) => {},

  getUsers: async (args, req) => {
    if (!req.isAuthorized) throw newError(403, "Forbidden");
    const users = await User.find();
    return users.map(user => ({
      ...user._doc,
      _id: user._id.toString(),
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString()
    }));
  },

  loginUser: async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw newError(404, "Email not found.");

    const isPwdValid = await bcrypt.compare(password, user.password);
    if (!isPwdValid) throw newError(401, "Bad password or username");

    const token = jwt.sign(
      { email: user.email, _id: user._id.toString(), isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "1hr"
      }
    );

    const { exp } = jwt.decode(token, process.env.JWT_SECRET);

    return {
      _id: user._id.toString(),
      email: user.email,
      exp,
      isAdmin: user.isAdmin,
      token,
      firstName: user.firstName,
      lastName: user.lastName
    };
  },

  signupUser: async ({ email, password }) => {
    validateAuthUserInput(email, password);

    const existingUser = await User.findOne({ email });
    if (existingUser) throw newError(422, "That email already exists!");

    const hashedPwd = await bcrypt.hash(password, 12);

    const user = new User({
      email: email.trim().toLowerCase(),
      password: hashedPwd
    });

    const savedUser = await user.save();

    const token = jwt.sign(
      {
        email: savedUser.email.toLowerCase(),
        _id: savedUser._id.toString(),
        isAdmin: savedUser.isAdmin
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1hr"
      }
    );

    const { exp } = jwt.decode(token, process.env.JWT_SECRET);

    return {
      _id: savedUser._id.toString(),
      email: savedUser.emai.toLowerCase(),
      exp,
      isAdmin: savedUser.isAdmin,
      token
    };
  },

  updateUser: async ({ userInput }, req) => {
    if (!req.isAuthorized) throw newError(403, "Forbidden");
    const submitter = await User.findById(req.userId);
    if (!submitter) throw newError(404, "Submitter not found!");
    const { _id, email, firstName, isAdmin, lastName } = userInput;
    if (!submitter.isAdmin && req.userId !== _id)
      throw newError(403, "Forbidden");
    const user = await User.findById({ _id });
    if (!user) throw newError(401, "User ID not found");
    if (!submitter.isAdmin && isAdmin)
      throw newError(
        403,
        "You cannot make yourself an admin, if you are not an admin."
      );
    user.email = email.trim().toLowerCase();
    user.isAdmin = isAdmin;
    user.firstName = firstName;
    user.lastName = lastName;
    await user.save();
    return true;
  }
};
