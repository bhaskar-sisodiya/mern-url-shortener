// auth.service.js
import { createUser, findUserByEmail, findUserByEmailAndPassword } from "../dao/user.dao.js"
import { ConflictError } from "../utils/errorHandler.js"
import { signToken } from "../utils/helper.js"

export const registerUser = async (name, email, password) => {
    const user = await findUserByEmail(email);
    if (user) throw new ConflictError("User already exists");
    const newUser = await createUser(name, email, password);
    const token = signToken({id: newUser._id});
    // await newUser.save();
    return {token, user};
}

export const loginUser = async (email, password) => {
    const user = await findUserByEmailAndPassword(email);
    if (!user) throw new Error("Invalid email or password");

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) throw new Error("Invalid email or password");

    const token = signToken({id: user._id});
    return {token, user};
}