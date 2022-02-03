"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operation4xxResponse = void 0;
const Operation4xxResponse = () => {
    return {
        ResponsesMap(responses, { report }) {
            const codes = Object.keys(responses);
            if (!codes.some((code) => /4[Xx0-9]{2}/.test(code))) {
                report({
                    message: 'Operation must have at least one `4xx` response.',
                    location: { reportOnKey: true },
                });
            }
        },
    };
};
exports.Operation4xxResponse = Operation4xxResponse;
