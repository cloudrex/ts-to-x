export enum TokenType {
    Number,
    String,
    Identifier,
    Character,
    Semicolon,
    BraceOpen,
    BraceClose,
    ParenOpen,
    ParenClose,
    Whitespace,
    AddOp,
    SubsOp,
    MultOp,
    DivOp,
    FunKey,
    ExitKey,
    OutKey,
    InKey
}

export interface IToken {
    readonly value?: string;
    readonly type: TokenType;
    readonly typeStr: string;
    readonly position: number;
    readonly relativePosition: number;
    readonly line: number;
}
