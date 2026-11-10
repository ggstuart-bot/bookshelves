import { escape } from "@std/html";

function toHTML(value) {
    if (value === undefined || value === null) return "";
    return escape(String(value));
}

export function html(strings, ...values) {
    return strings.reduce(
        (output, string, index) => output + string + toHTML(values[index]),
        "",
    );
}
