import { OpenAPIRequestBody, Referenced } from '../../types';
import { OpenAPIParser } from '../OpenAPIParser';
import { RedocNormalizedOptions } from '../RedocNormalizedOptions';
import { MediaContentModel } from './MediaContent';
declare type RequestBodyProps = {
    parser: OpenAPIParser;
    infoOrRef: Referenced<OpenAPIRequestBody>;
    options: RedocNormalizedOptions;
    isEvent: boolean;
};
export declare class RequestBodyModel {
    description: string;
    required: boolean;
    content?: MediaContentModel;
    constructor({ parser, infoOrRef, options, isEvent }: RequestBodyProps);
}
export {};
