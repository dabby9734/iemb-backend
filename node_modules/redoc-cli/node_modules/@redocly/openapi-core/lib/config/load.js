"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = void 0;
const fs = require("fs");
const redocly_1 = require("../redocly");
const utils_1 = require("../utils");
const config_1 = require("./config");
const builtIn_1 = require("./builtIn");
function loadConfig(configPath, customExtends) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        if (configPath === undefined) {
            configPath = findConfig();
        }
        let rawConfig = {};
        if (configPath !== undefined) {
            try {
                rawConfig = (yield utils_1.loadYaml(configPath));
            }
            catch (e) {
                throw new Error(`Error parsing config file at \`${configPath}\`: ${e.message}`);
            }
        }
        if (customExtends !== undefined) {
            rawConfig.lint = rawConfig.lint || {};
            rawConfig.lint.extends = customExtends;
        }
        const redoclyClient = new redocly_1.RedoclyClient();
        const tokens = yield redoclyClient.getTokens();
        if (tokens.length) {
            if (!rawConfig.resolve)
                rawConfig.resolve = {};
            if (!rawConfig.resolve.http)
                rawConfig.resolve.http = {};
            rawConfig.resolve.http.headers = [...((_a = rawConfig.resolve.http.headers) !== null && _a !== void 0 ? _a : [])];
            for (const item of tokens) {
                const domain = config_1.DOMAINS[item.region];
                rawConfig.resolve.http.headers.push({
                    matches: `https://api.${domain}/registry/**`,
                    name: 'Authorization',
                    envVariable: undefined,
                    value: item.token,
                }, 
                //support redocly.com domain for future compatibility
                ...(item.region === 'us' ? [{
                        matches: `https://api.redocly.com/registry/**`,
                        name: 'Authorization',
                        envVariable: undefined,
                        value: item.token,
                    }] : []));
            }
        }
        return new config_1.Config(Object.assign(Object.assign({}, rawConfig), { lint: Object.assign(Object.assign({}, rawConfig === null || rawConfig === void 0 ? void 0 : rawConfig.lint), { plugins: [...(((_b = rawConfig === null || rawConfig === void 0 ? void 0 : rawConfig.lint) === null || _b === void 0 ? void 0 : _b.plugins) || []), builtIn_1.defaultPlugin] }) }), configPath);
    });
}
exports.loadConfig = loadConfig;
function findConfig() {
    if (fs.existsSync('.redocly.yaml')) {
        return '.redocly.yaml';
    }
    else if (fs.existsSync('.redocly.yml')) {
        return '.redocly.yml';
    }
    return undefined;
}
