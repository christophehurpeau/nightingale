export interface HtmlStyle {
    readonly open: string;
    readonly close: string;
}
export interface StyleToHtmlStyle {
    readonly [key: string]: HtmlStyle;
}
declare const styleToHtmlStyle: StyleToHtmlStyle;
export default styleToHtmlStyle;
