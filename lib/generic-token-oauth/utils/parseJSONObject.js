"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseJSONObject(jsonString) {
    try {
        var parsedValue = JSON.parse(jsonString);
        if (parsedValue && typeof parsedValue === 'object') {
            return parsedValue;
        }
    }
    catch (_) {
        // Argument is not a valid json string. Do nothing.
    }
    return false;
}
exports.default = parseJSONObject;
