import { maxLength, minLength, required } from "../tools/validators.js";

export const userSchema = {
    username: {
        displayName: "Username",
        validators: [required, minLength(3), maxLength(50)],
    },
    password: {
        displayName: "Password",
        validators: [required, minLength(8)],
    },
};
