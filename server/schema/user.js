import { maxLength, minLength, required } from "../tools/validators.js";

export const userSchema = {
    username: [required, minLength(3), maxLength(50)],
    password: [required, minLength(8)],
};
