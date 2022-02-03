import { RegistryApi } from './registry-api';
import { AccessTokens, Region } from '../config/config';
export declare class RedoclyClient {
    private accessTokens;
    private region;
    domain: string;
    registryApi: RegistryApi;
    constructor(region?: Region);
    loadRegion(region?: Region): Region;
    getRegion(): Region;
    hasTokens(): boolean;
    hasToken(): boolean;
    getAuthorizationHeader(): Promise<string | undefined>;
    setAccessTokens(accessTokens: AccessTokens): void;
    loadTokens(): void;
    getValidTokens(): Promise<{
        region: string;
        token: string;
        valid: boolean;
    }[]>;
    getTokens(): Promise<{
        region: string;
        token: string;
        valid: boolean;
    }[]>;
    isAuthorizedWithRedoclyByRegion(): Promise<boolean>;
    isAuthorizedWithRedocly(): Promise<boolean>;
    readCredentialsFile(credentialsPath: string): any;
    verifyToken(accessToken: string, region: Region, verbose?: boolean): Promise<boolean>;
    login(accessToken: string, verbose?: boolean): Promise<void>;
    logout(): void;
}
export declare function isRedoclyRegistryURL(link: string): boolean;
