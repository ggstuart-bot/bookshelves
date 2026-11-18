import { maxLength, minLength, required } from "../tools/validators.js";

export const shelfSchema = {
    title: {
        displayName: "Title",
        validators: [required, minLength(3), maxLength(25)],
    },
};
