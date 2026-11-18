export function validateSchema(formData, schema) {
    const validated = {};
    for (const [key, validators] of Object.entries(schema)) {
        const value = formData.get(key) ?? "";
        for (const validate of validators) {
            validate(key, value);
        }
        validated[key] = value;
    }
    return validated;
}
