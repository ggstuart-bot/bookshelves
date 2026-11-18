export function validateField(name, value, validators) {
    for (const validate of validators) {
        validate(name, value);
    }
}
