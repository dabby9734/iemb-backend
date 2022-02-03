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
exports.isRedoclyRegistryURL = exports.RedoclyClient = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const os_1 = require("os");
const colorette_1 = require("colorette");
const registry_api_1 = require("./registry-api");
const config_1 = require("../config/config");
const utils_1 = require("../utils");
const TOKEN_FILENAME = '.redocly-config.json';
class RedoclyClient {
    constructor(region) {
        this.accessTokens = {};
        this.region = this.loadRegion(region);
        this.loadTokens();
        this.domain = region
            ? config_1.DOMAINS[region]
            : process.env.REDOCLY_DOMAIN || config_1.DOMAINS[config_1.DEFAULT_REGION];
        this.registryApi = new registry_api_1.RegistryApi(this.accessTokens, this.region);
    }
    loadRegion(region) {
        if (region && !config_1.DOMAINS[region]) {
            process.stdout.write(colorette_1.red(`Invalid argument: region in config file.\nGiven: ${colorette_1.green(region)}, choices: "us", "eu".\n`));
            process.exit(1);
        }
        if (process.env.REDOCLY_DOMAIN) {
            return (Object.keys(config_1.DOMAINS).find((region) => config_1.DOMAINS[region] === process.env.REDOCLY_DOMAIN) || config_1.DEFAULT_REGION);
        }
        return region || config_1.DEFAULT_REGION;
    }
    getRegion() {
        return this.region;
    }
    hasTokens() {
        return utils_1.isNotEmptyObject(this.accessTokens);
    }
    // <backward compatibility: old versions of portal>
    hasToken() {
        return !!this.accessTokens[this.region];
    }
    getAuthorizationHeader() {
        return __awaiter(this, void 0, void 0, function* () {
            const token = this.accessTokens[this.region];
            // print this only if there is token but invalid
            if (token && !this.isAuthorizedWithRedoclyByRegion()) {
                process.stderr.write(`${colorette_1.yellow('Warning:')} invalid Redocly API key. Use "npx @redocly/openapi-cli login" to provide your API key\n`);
                return undefined;
            }
            return token;
        });
    }
    // </backward compatibility: portal>
    setAccessTokens(accessTokens) {
        this.accessTokens = accessTokens;
    }
    loadTokens() {
        const credentialsPath = path_1.resolve(os_1.homedir(), TOKEN_FILENAME);
        const credentials = this.readCredentialsFile(credentialsPath);
        if (utils_1.isNotEmptyObject(credentials)) {
            this.setAccessTokens(Object.assign(Object.assign({}, credentials), (credentials.token && !credentials[this.region] && {
                [this.region]: credentials.token
            })));
        }
        if (process.env.REDOCLY_AUTHORIZATION) {
            this.setAccessTokens(Object.assign(Object.assign({}, this.accessTokens), { [this.region]: process.env.REDOCLY_AUTHORIZATION }));
        }
    }
    getValidTokens() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield Promise.all(Object.entries(this.accessTokens).map(([key, value]) => __awaiter(this, void 0, void 0, function* () {
                return { region: key, token: value, valid: yield this.verifyToken(value, key) };
            })))).filter(item => Boolean(item.valid));
        });
    }
    getTokens() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.hasTokens() ? yield this.getValidTokens() : [];
        });
    }
    isAuthorizedWithRedoclyByRegion() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.hasTokens())
                return false;
            const accessToken = this.accessTokens[this.region];
            return !!accessToken && (yield this.verifyToken(accessToken, this.region));
        });
    }
    isAuthorizedWithRedocly() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.hasTokens() && utils_1.isNotEmptyObject(yield this.getValidTokens());
        });
    }
    readCredentialsFile(credentialsPath) {
        return fs_1.existsSync(credentialsPath) ? JSON.parse(fs_1.readFileSync(credentialsPath, 'utf-8')) : {};
    }
    verifyToken(accessToken, region, verbose = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!accessToken)
                return false;
            return this.registryApi.authStatus(accessToken, region, verbose);
        });
    }
    login(accessToken, verbose = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const credentialsPath = path_1.resolve(os_1.homedir(), TOKEN_FILENAME);
            process.stdout.write(colorette_1.gray('\n  Logging in...\n'));
            const authorized = yield this.verifyToken(accessToken, this.region, verbose);
            if (!authorized) {
                process.stdout.write(colorette_1.red('Authorization failed. Please check if you entered a valid API key.\n'));
                process.exit(1);
            }
            const credentials = Object.assign(Object.assign({}, this.readCredentialsFile(credentialsPath)), { [this.region]: accessToken, token: accessToken });
            this.accessTokens = credentials;
            this.registryApi.setAccessTokens(credentials);
            fs_1.writeFileSync(credentialsPath, JSON.stringify(credentials, null, 2));
            process.stdout.write(colorette_1.green('  Authorization confirmed. ✅\n\n'));
        });
    }
    logout() {
        const credentialsPath = path_1.resolve(os_1.homedir(), TOKEN_FILENAME);
        if (fs_1.existsSync(credentialsPath)) {
            fs_1.unlinkSync(credentialsPath);
        }
        process.stdout.write('Logged out from the Redocly account. ✋\n');
    }
}
exports.RedoclyClient = RedoclyClient;
function isRedoclyRegistryURL(link) {
    const domain = process.env.REDOCLY_DOMAIN || config_1.DOMAINS[config_1.DEFAULT_REGION];
    if (!link.startsWith(`https://api.${domain}/registry/`))
        return false;
    const registryPath = link.replace(`https://api.${domain}/registry/`, '');
    const pathParts = registryPath.split('/');
    // we can be sure, that there is job UUID present
    // (org, definition, version, bundle, branch, job, "openapi.yaml" 🤦‍♂️)
    // so skip this link.
    // FIXME
    if (pathParts.length === 7)
        return false;
    return true;
}
exports.isRedoclyRegistryURL = isRedoclyRegistryURL;
