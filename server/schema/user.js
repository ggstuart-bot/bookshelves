import { usernameExists } from "../models/users.js";
import { maxLength, minLength, required, unique } from "../tools/validators.js";

export const userSchema = {
    username: {
        displayName: "Username",
        validators: [required, minLength(3), maxLength(50), unique(usernameExists)],
    },
    password: {
        displayName: "Password",
        validators: [required, minLength(8)],
    },
};
