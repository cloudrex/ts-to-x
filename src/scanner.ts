import {IToken, TokenType} from "./types";

const identifier: RegExp = /[_a-z]+/;

export default class Scanner {
    protected readonly input: string;

    protected bag!: string;
    protected pos!: number;
    protected relativePos!: number;
    protected line!: number;

    public constructor(input: string) {
        this.input = input;
    }

    public scan(): IToken[] {
        // Initialize
        this.bag = "";
        this.pos = 0;
        this.relativePos = 0;
        this.line = 0;

        // Scan
        const result: IToken[] = [];

        for (this.pos = 0; this.pos < this.input.length; this.pos++) {
            const $: string = this.input[this.pos];

            // Identifier
            if (identifier.test($)) {
                this.bag += $;
            }
            // Semicolon
            else if ($ === ";") {
                this.createToken(TokenType.Semicolon);
            }
            // Unexpected token
            else {
                this.complain();
            }
        }

        return result;
    }

    protected createToken(type: TokenType, value?: string): IToken {
        return {
            line: this.line,
            position: this.pos,
            relativePosition: this.relativePos,
            type,
            value: value
        };
    }

    protected getToken(): IToken {
        // TODO
        return null;
    }

    protected complain(): void {
        throw new Error(`Unexpected token at line ${this.line}:${this.pos}`);
    }
}
