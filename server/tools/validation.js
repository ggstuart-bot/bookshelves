import { SchemaValidationError, ValidationError } from "./errors.js";

export function validateField(name, value, validators) {
    for (const validate of validators) {
        validate(name, value);
    }
}

export function validateSchema(formData, schema) {
    const validated = {};
    for (const [key, validators] of Object.entries(schema)) {
        const value = formData.get(key) ?? "";
        try {
            validateField(key, value, validators);
        } catch (error) {
            if (!(error instanceof ValidationError)) throw error;
            throw new SchemaValidationError({ [key]: error.message });
        }
        validated[key] = value;
    }
    return validated;
}
