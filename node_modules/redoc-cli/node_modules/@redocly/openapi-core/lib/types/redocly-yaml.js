"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigTypes = void 0;
const _1 = require(".");
const utils_1 = require("../utils");
const ConfigRoot = {
    properties: {
        apiDefinitions: {
            type: 'object',
            properties: {},
            additionalProperties: { properties: { type: 'string' } },
        },
        lint: 'ConfigLint',
        referenceDocs: 'ConfigReferenceDocs',
    },
};
const ConfigHTTP = {
    properties: {
        headers: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
    },
};
const ConfigLint = {
    properties: {
        plugins: {
            type: 'array',
            items: { type: 'string' },
        },
        extends: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
        doNotResolveExamples: { type: 'boolean' },
        rules: { type: 'object' },
        oas2Rules: { type: 'object' },
        oas3_0Rules: { type: 'object' },
        oas3_1Rules: { type: 'object' },
        preprocessors: { type: 'object' },
        oas2Preprocessors: { type: 'object' },
        oas3_0Preprocessors: { type: 'object' },
        oas3_1Preprocessors: { type: 'object' },
        decorators: { type: 'object' },
        oas2Decorators: { type: 'object' },
        oas3_0Decorators: { type: 'object' },
        oas3_1Decorators: { type: 'object' },
        resolve: {
            properties: {
                http: 'ConfigHTTP',
            },
        },
    },
};
const ConfigLanguage = {
    properties: {
        label: { type: 'string' },
        lang: { type: 'string' },
    },
};
const ConfigLabels = {
    properties: {
        enum: { type: 'string' },
        enumSingleValue: { type: 'string' },
        enumArray: { type: 'string' },
        default: { type: 'string' },
        deprecated: { type: 'string' },
        example: { type: 'string' },
        examples: { type: 'string' },
        nullable: { type: 'string' },
        recursive: { type: 'string' },
        arrayOf: { type: 'string' },
        webhook: { type: 'string' },
        authorizations: { type: 'string' },
        tryItAuthBasicUsername: { type: 'string' },
        tryItAuthBasicPassword: { type: 'string' },
    },
};
const ConfigSidebarLinks = {
    properties: {
        placement: { type: 'string' },
        label: { type: 'string' },
        link: { type: 'string' },
        target: { type: 'string' },
    },
};
const CommonThemeColors = {
    properties: {
        main: { type: 'string' },
        light: { type: 'string' },
        dark: { type: 'string' },
        contrastText: { type: 'string' },
    },
};
const CommonColorProps = {
    properties: {
        backgroundColor: { type: 'string' },
        borderColor: { type: 'string' },
        color: { type: 'string' },
        tabTextColor: { type: 'string' },
    },
};
const BorderThemeColors = {
    properties: utils_1.pickObjectProps(CommonThemeColors.properties, ['light', 'dark']),
};
const HttpColors = {
    properties: {
        basic: { type: 'string' },
        delete: { type: 'string' },
        get: { type: 'string' },
        head: { type: 'string' },
        link: { type: 'string' },
        options: { type: 'string' },
        patch: { type: 'string' },
        post: { type: 'string' },
        put: { type: 'string' },
    },
};
const ResponseColors = {
    properties: {
        errors: 'CommonColorProps',
        info: 'CommonColorProps',
        redirect: 'CommonColorProps',
        success: 'CommonColorProps',
    },
};
const SecondaryColors = {
    properties: utils_1.omitObjectProps(CommonThemeColors.properties, ['dark']),
};
const TextThemeColors = {
    properties: {
        primary: { type: 'string' },
        secondary: { type: 'string' },
        light: { type: 'string' },
    },
};
const ThemeColors = {
    properties: {
        accent: 'CommonThemeColors',
        border: 'BorderThemeColors',
        error: 'CommonThemeColors',
        http: 'HttpColors',
        primary: 'CommonThemeColors',
        responses: 'ResponseColors',
        secondary: 'SecondaryColors',
        success: 'CommonThemeColors',
        text: 'TextThemeColors',
        tonalOffset: { type: 'number' },
        warning: 'CommonThemeColors',
    },
};
const SizeProps = {
    properties: {
        fontSize: { type: 'string' },
        padding: { type: 'string' },
        minWidth: { type: 'string' },
    },
};
const Sizes = {
    properties: {
        small: 'SizeProps',
        medium: 'SizeProps',
        large: 'SizeProps',
        xlarge: 'SizeProps',
    },
};
const FontConfig = {
    properties: {
        fontFamily: { type: 'string' },
        fontSize: { type: 'string' },
        fontWeight: { type: 'string' },
        lineHeight: { type: 'string' },
    },
};
const ButtonsConfig = {
    properties: Object.assign(Object.assign({}, utils_1.omitObjectProps(FontConfig.properties, ['fontSize', 'lineHeight'])), { borderRadius: { type: 'string' }, hoverStyle: { type: 'string' }, boxShadow: { type: 'string' }, hoverBoxShadow: { type: 'string' }, sizes: 'Sizes' }),
};
const BadgeFontConfig = {
    properties: utils_1.pickObjectProps(FontConfig.properties, ['fontSize', 'lineHeight']),
};
const BadgeSizes = {
    properties: {
        medium: 'BadgeFontConfig',
        small: 'BadgeFontConfig',
    },
};
const HttpBadgesConfig = {
    properties: Object.assign(Object.assign({}, utils_1.omitObjectProps(FontConfig.properties, ['fontSize', 'lineHeight'])), { borderRadius: { type: 'string' }, color: { type: 'string' }, sizes: 'BadgeSizes' }),
};
const LabelControls = {
    properties: {
        top: { type: 'string' },
    },
};
const Panels = {
    properties: {
        borderRadius: { type: 'string' },
    },
};
const TryItButton = {
    properties: {
        fullWidth: { type: 'boolean' },
    },
};
const Components = {
    properties: {
        buttons: 'ButtonsConfig',
        httpBadges: 'HttpBadgesConfig',
        layoutControls: 'LabelControls',
        panels: 'Panels',
        tryItButton: 'TryItButton',
        tryItSendButton: 'TryItButton',
    },
};
const Breakpoints = {
    properties: {
        small: { type: 'string' },
        medium: { type: 'string' },
        large: { type: 'string' },
    },
};
const StackedConfig = {
    properties: {
        maxWidth: 'Breakpoints',
    },
};
const ThreePanelConfig = {
    properties: {
        maxWidth: 'Breakpoints',
    },
};
const Layout = {
    properties: {
        showDarkRightPanel: { type: 'boolean' },
        stacked: 'StackedConfig',
        'three-panel': 'ThreePanelConfig',
    },
};
const SchemaColorsConfig = {
    properties: {
        backgroundColor: { type: 'string' },
        border: { type: 'string' },
    },
};
const Schema = {
    properties: {
        breakFieldNames: { type: 'boolean' },
        caretColor: { type: 'string' },
        caretSize: { type: 'string' },
        constraints: 'SchemaColorsConfig',
        defaultDetailsWidth: { type: 'string' },
        examples: 'SchemaColorsConfig',
        labelsTextSize: { type: 'string' },
        linesColor: { type: 'string' },
        nestedBackground: { type: 'string' },
        nestingSpacing: { type: 'string' },
        requireLabelColor: { type: 'string' },
        typeNameColor: { type: 'string' },
        typeTitleColor: { type: 'string' },
    },
};
const GroupItemsConfig = {
    properties: {
        subItemsColor: { type: 'string' },
        textTransform: { type: 'string' },
        fontWeight: { type: 'string' },
    },
};
const Level1Items = {
    properties: utils_1.pickObjectProps(GroupItemsConfig.properties, ['textTransform']),
};
const SpacingConfig = {
    properties: {
        unit: { type: 'number' },
        paddingHorizontal: { type: 'string' },
        paddingVertical: { type: 'string' },
        offsetTop: { type: 'string' },
        offsetLeft: { type: 'string' },
        offsetNesting: { type: 'string' },
    },
};
const Sidebar = {
    properties: Object.assign(Object.assign({}, utils_1.omitObjectProps(FontConfig.properties, ['fontWeight', 'lineHeight'])), { activeBgColor: { type: 'string' }, activeTextColor: { type: 'string' }, backgroundColor: { type: 'string' }, borderRadius: { type: 'string' }, breakPath: { type: 'boolean' }, caretColor: { type: 'string' }, caretSize: { type: 'string' }, groupItems: 'GroupItemsConfig', level1items: 'Level1Items', rightLineColor: { type: 'string' }, separatorLabelColor: { type: 'string' }, showAtBreakpoint: { type: 'string' }, spacing: 'SpacingConfig', textColor: { type: 'string' }, width: { type: 'string' } }),
};
const Heading = {
    properties: Object.assign(Object.assign({}, FontConfig.properties), { color: { type: 'string' }, transform: { type: 'string' } }),
};
const CodeConfig = {
    properties: Object.assign(Object.assign({}, FontConfig.properties), { backgroundColor: { type: 'string' }, color: { type: 'string' }, wordBreak: { type: 'string' }, wrap: { type: 'boolean' } }),
};
const HeadingsConfig = {
    properties: utils_1.omitObjectProps(FontConfig.properties, ['fontSize']),
};
const LinksConfig = {
    properties: {
        color: { type: 'string' },
        hover: { type: 'string' },
        textDecoration: { type: 'string' },
        visited: { type: 'string' },
    },
};
const Typography = {
    properties: Object.assign(Object.assign({ code: 'CodeConfig', fieldName: 'FontConfig' }, utils_1.pickObjectProps(FontConfig.properties, ['fontSize', 'fontFamily'])), { fontWeightBold: { type: 'string' }, fontWeightLight: { type: 'string' }, fontWeightRegular: { type: 'string' }, heading1: 'Heading', heading2: 'Heading', heading3: 'Heading', headings: 'HeadingsConfig', lineHeight: { type: 'string' }, links: 'LinksConfig', optimizeSpeed: { type: 'boolean' }, rightPanelHeading: 'Heading', smoothing: { type: 'string' } }),
};
const TokenProps = {
    properties: Object.assign({ color: { type: 'string' } }, utils_1.omitObjectProps(FontConfig.properties, ['fontWeight'])),
};
const CodeBlock = {
    properties: {
        backgroundColor: { type: 'string' },
        borderRadius: { type: 'string' },
        tokens: 'TokenProps',
    },
};
const Logo = {
    properties: {
        gutter: { type: 'string' },
        maxHeight: { type: 'string' },
        maxWidth: { type: 'string' },
    },
};
const ButtonOverrides = {
    properties: {
        custom: { type: 'string' },
    },
};
const Overrides = {
    properties: {
        DownloadButton: 'ButtonOverrides',
        NextSectionButton: 'ButtonOverrides',
    },
};
const RightPanel = {
    properties: {
        backgroundColor: { type: 'string' },
        panelBackgroundColor: { type: 'string' },
        panelControlsBackgroundColor: { type: 'string' },
        showAtBreakpoint: { type: 'string' },
        textColor: { type: 'string' },
        width: { type: 'string' },
    },
};
const Shape = {
    properties: { borderRadius: { type: 'string' } },
};
const ThemeSpacing = {
    properties: {
        sectionHorizontal: { type: 'number' },
        sectionVertical: { type: 'number' },
        unit: { type: 'number' },
    },
};
const ConfigTheme = {
    properties: {
        breakpoints: 'Breakpoints',
        codeBlock: 'CodeBlock',
        colors: 'ThemeColors',
        components: 'Components',
        layout: 'Layout',
        logo: 'Logo',
        overrides: 'Overrides',
        rightPanel: 'RightPanel',
        schema: 'Schema',
        shape: 'Shape',
        sidebar: 'Sidebar',
        spacing: 'ThemeSpacing',
        typography: 'Typography',
        links: { properties: { color: { type: 'string' } } },
        codeSample: { properties: { backgroundColor: { type: 'string' } } },
    },
};
const GenerateCodeSamples = {
    properties: {
        skipOptionalParameters: { type: 'boolean' },
        languages: _1.listOf('ConfigLanguage'),
    },
};
const ConfigReferenceDocs = {
    properties: {
        theme: 'ConfigTheme',
        corsProxyUrl: { type: 'string' },
        ctrlFHijack: { type: 'boolean' },
        defaultSampleLanguage: { type: 'string' },
        disableDeepLinks: { type: 'boolean' },
        disableSearch: { type: 'boolean' },
        disableSidebar: { type: 'boolean' },
        downloadDefinitionUrl: { type: 'string' },
        expandDefaultServerVariables: { type: 'boolean' },
        expandResponses: { type: 'string' },
        expandSingleSchemaField: { type: 'boolean' },
        generateCodeSamples: 'GenerateCodeSamples',
        generatedPayloadSamplesMaxDepth: { type: 'number' },
        hideDownloadButton: { type: 'boolean' },
        hideHostname: { type: 'boolean' },
        hideInfoSection: { type: 'boolean' },
        hideLoading: { type: 'boolean' },
        hideLogo: { type: 'boolean' },
        hideRequestPayloadSample: { type: 'boolean' },
        hideSchemaPattern: { type: 'boolean' },
        hideSchemaTitles: { type: 'boolean' },
        hideSingleRequestSampleTab: { type: 'boolean' },
        htmlTemplate: { type: 'string' },
        jsonSampleExpandLevel: { type: 'string' },
        labels: 'ConfigLabels',
        layout: { type: 'string' },
        maxDisplayedEnumValues: { type: 'number' },
        menuToggle: { type: 'boolean' },
        nativeScrollbars: { type: 'boolean' },
        noAutoAuth: { type: 'boolean' },
        oAuth2RedirectURI: { type: 'string' },
        onDeepLinkClick: { type: 'object' },
        onlyRequiredInSamples: { type: 'boolean' },
        pagination: { type: 'string' },
        pathInMiddlePanel: { type: 'boolean' },
        payloadSampleIdx: { type: 'number' },
        requestInterceptor: { type: 'object' },
        requiredPropsFirst: { type: 'boolean' },
        routingBasePath: { type: 'string' },
        samplesTabsMaxCount: { type: 'number' },
        schemaExpansionLevel: { type: 'string' },
        scrollYOffset: { type: 'string' },
        searchAutoExpand: { type: 'boolean' },
        searchFieldLevelBoost: { type: 'number' },
        searchMode: { type: 'string' },
        searchOperationTitleBoost: { type: 'number' },
        searchTagTitleBoost: { type: 'number' },
        showChangeLayoutButton: { type: 'boolean' },
        showConsole: { type: 'boolean' },
        showExtensions: { type: 'boolean' },
        showNextButton: { type: 'boolean' },
        showRightPanelToggle: { type: 'boolean' },
        sidebarLinks: 'ConfigSidebarLinks',
        sideNavStyle: { type: 'string' },
        simpleOneOfTypeLabel: { type: 'boolean' },
        sortEnumValuesAlphabetically: { type: 'boolean' },
        sortOperationsAlphabetically: { type: 'boolean' },
        sortPropsAlphabetically: { type: 'boolean' },
        sortTagsAlphabetically: { type: 'boolean' },
        unstable_ignoreMimeParameters: { type: 'boolean' },
        untrustedDefinition: { type: 'boolean' },
    },
    additionalProperties: { type: 'string' },
};
exports.ConfigTypes = {
    ConfigRoot,
    ConfigLint,
    ConfigReferenceDocs,
    ConfigHTTP,
    ConfigLanguage,
    ConfigLabels,
    ConfigSidebarLinks,
    ConfigTheme,
    ThemeColors,
    CommonThemeColors,
    BorderThemeColors,
    HttpColors,
    ResponseColors,
    SecondaryColors,
    TextThemeColors,
    Sizes,
    ButtonsConfig,
    CommonColorProps,
    BadgeFontConfig,
    BadgeSizes,
    HttpBadgesConfig,
    LabelControls,
    Panels,
    TryItButton,
    Breakpoints,
    StackedConfig,
    ThreePanelConfig,
    SchemaColorsConfig,
    SizeProps,
    Level1Items,
    SpacingConfig,
    FontConfig,
    CodeConfig,
    HeadingsConfig,
    LinksConfig,
    TokenProps,
    CodeBlock,
    Logo,
    ButtonOverrides,
    Overrides,
    RightPanel,
    Shape,
    ThemeSpacing,
    GenerateCodeSamples,
    GroupItemsConfig,
    Components,
    Layout,
    Schema,
    Sidebar,
    Heading,
    Typography,
};
