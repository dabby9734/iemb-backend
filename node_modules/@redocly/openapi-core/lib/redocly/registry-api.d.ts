import { RegistryApiTypes } from './registry-api-types';
import { AccessTokens, Region } from '../config/config';
export declare class RegistryApi {
    private accessTokens;
    private region;
    constructor(accessTokens: AccessTokens, region: Region);
    get accessToken(): string | false | undefined;
    getBaseUrl(region?: Region): string;
    setAccessTokens(accessTokens: AccessTokens): this;
    private request;
    authStatus(accessToken: string, region: Region, verbose?: boolean): Promise<boolean>;
    prepareFileUpload({ organizationId, name, version, filesHash, filename, isUpsert, }: RegistryApiTypes.PrepareFileuploadParams): Promise<RegistryApiTypes.PrepareFileuploadOKResponse>;
    pushApi({ organizationId, name, version, rootFilePath, filePaths, branch, isUpsert, }: RegistryApiTypes.PushApiParams): Promise<void>;
}
