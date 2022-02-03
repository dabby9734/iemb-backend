import { HttpResolveConfig } from './config/config';
import { UserContext } from './walk';
export { parseYaml, stringifyYaml } from './js-yaml';
export declare type StackFrame<T> = {
    prev: StackFrame<T> | null;
    value: T;
};
export declare type Stack<T> = StackFrame<T> | null;
export declare type StackNonEmpty<T> = StackFrame<T>;
export declare function pushStack<T, P extends Stack<T> = Stack<T>>(head: P, value: T): {
    prev: P;
    value: T;
};
export declare function popStack<T, P extends Stack<T>>(head: P): StackFrame<T> | null;
export declare type BundleOutputFormat = 'json' | 'yml' | 'yaml';
export declare function loadYaml(filename: string): Promise<unknown>;
export declare function notUndefined<T>(x: T | undefined): x is T;
export declare function isPlainObject(value: any): value is object;
export declare function isEmptyObject(value: any): value is object;
export declare function isEmptyArray(value: any): boolean;
export declare function readFileFromUrl(url: string, config: HttpResolveConfig): Promise<{
    body: any;
    mimeType: any;
}>;
export declare function match(url: string, pattern: string): boolean;
export declare function pickObjectProps<T extends Record<string, unknown>>(object: T, keys: Array<string>): T;
export declare function omitObjectProps<T extends Record<string, unknown>>(object: T, keys: Array<string>): T;
export declare function splitCamelCaseIntoWords(str: string): Set<string>;
export declare function validateMimeType({ type, value }: any, { report, location }: UserContext, allowedValues: string[]): void;
export declare function validateMimeTypeOAS3({ type, value }: any, { report, location }: UserContext, allowedValues: string[]): void;
export declare function isSingular(path: string): boolean;
export declare function readFileAsStringSync(filePath: string): string;
export declare function isPathParameter(pathSegment: string): boolean;
/**
 * Convert Windows backslash paths to slash paths: foo\\bar ➔ foo/bar
 */
export declare function slash(path: string): string;
export declare function isNotEmptyObject(obj: any): boolean;
