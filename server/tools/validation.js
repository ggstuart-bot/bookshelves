export function validateField(name, value, validators) {
    for (const validate of validators) {
        validate(name, value);
    }
}

export function validateSchema(formData, schema) {
    for (const [key, validators] of Object.entries(schema)) {
        const value = formData.get(key) ?? "";
        validateField(key, value, validators);
    }
}
