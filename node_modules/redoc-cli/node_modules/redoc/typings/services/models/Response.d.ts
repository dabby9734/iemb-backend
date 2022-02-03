import { OpenAPIResponse, Referenced } from '../../types';
import { OpenAPIParser } from '../OpenAPIParser';
import { RedocNormalizedOptions } from '../RedocNormalizedOptions';
import { FieldModel } from './Field';
import { MediaContentModel } from './MediaContent';
declare type ResponseProps = {
    parser: OpenAPIParser;
    code: string;
    defaultAsError: boolean;
    infoOrRef: Referenced<OpenAPIResponse>;
    options: RedocNormalizedOptions;
    isEvent: boolean;
};
export declare class ResponseModel {
    expanded: boolean;
    content?: MediaContentModel;
    code: string;
    summary: string;
    description: string;
    type: string;
    headers: FieldModel[];
    extensions: Record<string, any>;
    constructor({ parser, code, defaultAsError, infoOrRef, options, isEvent: isRequest, }: ResponseProps);
    toggle(): void;
}
export {};
