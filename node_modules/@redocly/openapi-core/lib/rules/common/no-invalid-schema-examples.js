"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoInvalidSchemaExamples = void 0;
const utils_1 = require("../utils");
const NoInvalidSchemaExamples = (opts) => {
    var _a;
    const disallowAdditionalProperties = (_a = opts.disallowAdditionalProperties) !== null && _a !== void 0 ? _a : true;
    return {
        Schema: {
            leave(schema, ctx) {
                if (schema.examples) {
                    for (const example of schema.examples) {
                        utils_1.validateExample(example, schema, ctx.location.child(['examples', schema.examples.indexOf(example)]), ctx, disallowAdditionalProperties);
                    }
                }
                if (schema.example) {
                    utils_1.validateExample(schema.example, schema, ctx.location.child('example'), ctx, false);
                }
            },
        },
    };
};
exports.NoInvalidSchemaExamples = NoInvalidSchemaExamples;
