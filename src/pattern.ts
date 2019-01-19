export default abstract class Pattern {
    public static identifier: RegExp = /[_a-z]/;

    public static whitespace: RegExp = /[\n\t ]/;

    public static number: RegExp = /[0-9]/;
}
