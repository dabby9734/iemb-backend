"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoInvalidParameterExamples = void 0;
const utils_1 = require("../utils");
const NoInvalidParameterExamples = (opts) => {
    var _a;
    const disallowAdditionalProperties = (_a = opts.disallowAdditionalProperties) !== null && _a !== void 0 ? _a : true;
    return {
        Parameter: {
            leave(parameter, ctx) {
                if (parameter.example) {
                    utils_1.validateExample(parameter.example, parameter.schema, ctx.location.child('example'), ctx, disallowAdditionalProperties);
                }
                if (parameter.examples) {
                    for (const [key, example] of Object.entries(parameter.examples)) {
                        if ('value' in example) {
                            utils_1.validateExample(example.value, parameter.schema, ctx.location.child(['examples', key]), ctx, false);
                        }
                    }
                }
            },
        },
    };
};
exports.NoInvalidParameterExamples = NoInvalidParameterExamples;
