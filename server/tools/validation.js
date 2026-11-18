import { SchemaValidationError, ValidationError } from "./errors.js";

export function validateSchema(formData, schema) {
    const validated = {};
    for (const [key, validators] of Object.entries(schema)) {
        const value = formData.get(key) ?? "";
        try {
            for (const validate of validators) {
                validate(key, value);
            }
        } catch (error) {
            if (!(error instanceof ValidationError)) throw error;
            throw new SchemaValidationError({ [key]: error.message });
        }
        validated[key] = value;
    }
    return validated;
}
