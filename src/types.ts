export enum TokenType {
    Number,
    String,
    Identifier,
    Character,
    Semicolon
}

export interface IToken {
    readonly value?: string;
    readonly type: TokenType;
    readonly position: number;
    readonly relativePosition: number;
    readonly line: number;
}
