export interface HtmlStyle {
    readonly open: string;
    readonly close: string;
}
export declare const styleToHtmlStyleThemeLight: {
    readonly bold: {
        readonly open: "font-weight: bold";
        readonly close: "font-weight: normal";
    };
    readonly italic: {
        readonly open: "font-style: italic";
        readonly close: "font-style: normal";
    };
    readonly underline: {
        readonly open: "text-decoration: underline";
        readonly close: "text-decoration: none";
    };
    readonly inverse: {
        readonly open: "unicode-bidi: bidi-override; direction: rtl";
        readonly close: "unicode-bidi: normal; direction: ltr";
    };
    readonly strikethrough: {
        readonly open: "text-decoration: line-through";
        readonly close: "text-decoration: none";
    };
    readonly black: {
        readonly open: "color: black";
        readonly close: "color: currentcolor";
    };
    readonly red: {
        readonly open: "color: #ff0020";
        readonly close: "color: currentcolor";
    };
    readonly green: {
        readonly open: "color: #00b317";
        readonly close: "color: currentcolor";
    };
    readonly yellow: {
        readonly open: "color: #ffcc00";
        readonly close: "color: currentcolor";
    };
    readonly blue: {
        readonly open: "color: #00a0ff";
        readonly close: "color: currentcolor";
    };
    readonly magenta: {
        readonly open: "color: #ff00a0";
        readonly close: "color: currentcolor";
    };
    readonly cyan: {
        readonly open: "color: #00cfd8";
        readonly close: "color: currentcolor";
    };
    readonly white: {
        readonly open: "color: white";
        readonly close: "color: currentcolor";
    };
    readonly gray: {
        readonly open: "color: gray";
        readonly close: "color: currentcolor";
    };
    readonly bgBlack: {
        readonly open: "background: black";
        readonly close: "background: initial";
    };
    readonly bgRed: {
        readonly open: "background: #ff0020";
        readonly close: "background: initial";
    };
    readonly bgGreen: {
        readonly open: "background: #00b317";
        readonly close: "background: initial";
    };
    readonly bgYellow: {
        readonly open: "background: #ffcc00";
        readonly close: "background: initial";
    };
    readonly bgBlue: {
        readonly open: "background: #00a0ff";
        readonly close: "background: initial";
    };
    readonly bgMagenta: {
        readonly open: "background: #ff00a0";
        readonly close: "background: initial";
    };
    readonly bgCyan: {
        readonly open: "background: #00cfd8";
        readonly close: "background: initial";
    };
    readonly bgWhite: {
        readonly open: "background: white";
        readonly close: "background: initial";
    };
    readonly orange: {
        readonly open: "color: #ff5f00";
        readonly close: "color: currentcolor";
    };
    readonly grayLight: {
        readonly open: "color: #808080";
        readonly close: "color: currentcolor";
    };
    readonly "gray-light": {
        readonly open: "color: #808080";
        readonly close: "color: currentcolor";
    };
};
export type StyleToHtmlStyle = Readonly<Record<keyof typeof styleToHtmlStyleThemeLight, HtmlStyle>>;
export declare const styleToHtmlStyleThemeDark: StyleToHtmlStyle;
//# sourceMappingURL=styleToHtmlStyle.d.ts.map