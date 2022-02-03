"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decorators = void 0;
const registry_dependencies_1 = require("../common/registry-dependencies");
const operation_description_override_1 = require("../common/operation-description-override");
const tag_description_override_1 = require("../common/tag-description-override");
const info_description_override_1 = require("../common/info-description-override");
const remove_x_internal_1 = require("../common/remove-x-internal");
exports.decorators = {
    'registry-dependencies': registry_dependencies_1.RegistryDependencies,
    'operation-description-override': operation_description_override_1.OperationDescriptionOverride,
    'tag-description-override': tag_description_override_1.TagDescriptionOverride,
    'info-description-override': info_description_override_1.InfoDescriptionOverride,
    'remove-x-internal': remove_x_internal_1.RemoveXInternal
};
