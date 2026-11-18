export function validateSchema(formData, schema) {
    for (const [key, validators] of Object.entries(schema)) {
        const value = formData.get(key) ?? "";
        for (const validate of validators) {
            validate(key, value);
        }
    }
}
