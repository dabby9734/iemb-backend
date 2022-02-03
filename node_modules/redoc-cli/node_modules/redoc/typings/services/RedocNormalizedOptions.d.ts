import { ResolvedThemeInterface, ThemeInterface } from '../theme';
import { LabelsConfigRaw } from './Labels';
import { MDXComponentMeta } from './MarkdownRenderer';
export declare enum SideNavStyleEnum {
    SummaryOnly = "summary-only",
    PathOnly = "path-only"
}
export interface RedocRawOptions {
    theme?: ThemeInterface;
    scrollYOffset?: number | string | (() => number);
    hideHostname?: boolean | string;
    expandResponses?: string | 'all';
    requiredPropsFirst?: boolean | string;
    sortPropsAlphabetically?: boolean | string;
    sortEnumValuesAlphabetically?: boolean | string;
    sortOperationsAlphabetically?: boolean | string;
    sortTagsAlphabetically?: boolean | string;
    noAutoAuth?: boolean | string;
    nativeScrollbars?: boolean | string;
    pathInMiddlePanel?: boolean | string;
    untrustedSpec?: boolean | string;
    hideLoading?: boolean | string;
    hideDownloadButton?: boolean | string;
    disableSearch?: boolean | string;
    onlyRequiredInSamples?: boolean | string;
    showExtensions?: boolean | string | string[];
    sideNavStyle?: SideNavStyleEnum;
    hideSingleRequestSampleTab?: boolean | string;
    menuToggle?: boolean | string;
    jsonSampleExpandLevel?: number | string | 'all';
    hideSchemaTitles?: boolean | string;
    simpleOneOfTypeLabel?: boolean | string;
    payloadSampleIdx?: number;
    expandSingleSchemaField?: boolean | string;
    schemaExpansionLevel?: number | string | 'all';
    showObjectSchemaExamples?: boolean | string;
    unstable_ignoreMimeParameters?: boolean;
    allowedMdComponents?: Record<string, MDXComponentMeta>;
    labels?: LabelsConfigRaw;
    enumSkipQuotes?: boolean | string;
    expandDefaultServerVariables?: boolean;
    maxDisplayedEnumValues?: number;
    ignoreNamedSchemas?: string[] | string;
    hideSchemaPattern?: boolean;
    generatedPayloadSamplesMaxDepth?: number;
}
export declare function argValueToBoolean(val?: string | boolean, defaultValue?: boolean): boolean;
export declare class RedocNormalizedOptions {
    static normalizeExpandResponses(value: RedocRawOptions['expandResponses']): {};
    static normalizeHideHostname(value: RedocRawOptions['hideHostname']): boolean;
    static normalizeScrollYOffset(value: RedocRawOptions['scrollYOffset']): () => number;
    static normalizeShowExtensions(value: RedocRawOptions['showExtensions']): string[] | boolean;
    static normalizeSideNavStyle(value: RedocRawOptions['sideNavStyle']): SideNavStyleEnum;
    static normalizePayloadSampleIdx(value: RedocRawOptions['payloadSampleIdx']): number;
    private static normalizeJsonSampleExpandLevel;
    private static normalizeGeneratedPayloadSamplesMaxDepth;
    theme: ResolvedThemeInterface;
    scrollYOffset: () => number;
    hideHostname: boolean;
    expandResponses: {
        [code: string]: boolean;
    } | 'all';
    requiredPropsFirst: boolean;
    sortPropsAlphabetically: boolean;
    sortEnumValuesAlphabetically: boolean;
    sortOperationsAlphabetically: boolean;
    sortTagsAlphabetically: boolean;
    noAutoAuth: boolean;
    nativeScrollbars: boolean;
    pathInMiddlePanel: boolean;
    untrustedSpec: boolean;
    hideDownloadButton: boolean;
    disableSearch: boolean;
    onlyRequiredInSamples: boolean;
    showExtensions: boolean | string[];
    sideNavStyle: SideNavStyleEnum;
    hideSingleRequestSampleTab: boolean;
    menuToggle: boolean;
    jsonSampleExpandLevel: number;
    enumSkipQuotes: boolean;
    hideSchemaTitles: boolean;
    simpleOneOfTypeLabel: boolean;
    payloadSampleIdx: number;
    expandSingleSchemaField: boolean;
    schemaExpansionLevel: number;
    showObjectSchemaExamples: boolean;
    unstable_ignoreMimeParameters: boolean;
    allowedMdComponents: Record<string, MDXComponentMeta>;
    expandDefaultServerVariables: boolean;
    maxDisplayedEnumValues?: number;
    ignoreNamedSchemas: Set<string>;
    hideSchemaPattern: boolean;
    generatedPayloadSamplesMaxDepth: number;
    constructor(raw: RedocRawOptions, defaults?: RedocRawOptions);
}
