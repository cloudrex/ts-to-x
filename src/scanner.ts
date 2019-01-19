import {IToken, TokenType} from "./types";
import Pattern from "./pattern";

export default class Scanner {
    protected readonly tokens: IToken[];

    protected input: string;
    protected bag!: string;
    protected pos!: number;
    protected relativePos!: number;
    protected line!: number;

    public constructor(input?: string) {
        this.input = input || "";
        this.tokens = [];
    }

    public scan(): IToken[] {
        // Initialize
        this.bag = "";
        this.pos = 0;
        this.relativePos = 0;
        this.line = 0;
        this.tokens.length = 0;

        // Scan
        for (this.pos = 0; this.pos < this.input.length; this.pos++) {
            const $: string = this.input[this.pos];

            // Whitespace
            if (Pattern.whitespace.test($)) {
                if (this.bag.length > 0) {
                    // Check bag
                    switch (this.bag) {
                        // Function keyword
                        case "fun": {
                            this.pushToken(TokenType.FunKey);

                            break;
                        }

                        // Output keyword
                        case "out": {
                            this.pushToken(TokenType.OutKey);

                            break;
                        }

                        // Input keyword
                        case "in": {
                            this.pushToken(TokenType.InKey);

                            break;
                        }

                        case "exit": {
                            this.pushToken(TokenType.ExitKey);

                            break;
                        }

                        // Identifier
                        default: {
                            this.pushToken(TokenType.Identifier, this.bag);

                            break;
                        }
                    }
                }

                // Ignore whitespace
                continue;
            }
            // Identifier
            else if (Pattern.identifier.test($)) {
                this.bag += $;
            }
            // Number
            else if (Pattern.number.test($)) {
                this.pushToken(TokenType.Number);
            }
            // Semicolon
            else if ($ === ";") {
                this.pushToken(TokenType.Semicolon);
            }
            // Brace Open
            else if ($ === "{") {
                this.pushToken(TokenType.BraceOpen);
            }
            // Brace Close
            else if ($ === "}") {
                this.pushToken(TokenType.BraceClose);
            }
            // Parenthesis Open
            else if ($ === "(") {
                this.pushToken(TokenType.ParenOpen);
            }
            // Parenthesis Close
            else if ($ === ")") {
                this.pushToken(TokenType.ParenClose)
            }
            // Addition Operator
            else if ($ === "+") {
                this.pushToken(TokenType.AddOp);
            }
            // Substraction Operator
            else if ($ === "-") {
                this.pushToken(TokenType.SubsOp);
            }
            // Multiplication Operator
            else if ($ === "*") {
                this.pushToken(TokenType.MultOp);
            }
            // Division Operator
            else if ($ === "/") {
                this.pushToken(TokenType.MultOp);
            }
            // Unexpected token
            else {
                this.complain();
            }
        }

        // Clear input
        this.input = "";

        return this.tokens;
    }

    public feed(input: string): this {
        this.input += input;

        return this;
    }

    protected pushToken(type: TokenType, value?: string): this {
        this.tokens.push(this.createToken(type, value));

        return this;
    }

    protected createToken(type: TokenType, value?: string): IToken {
        return {
            line: this.line,
            position: this.pos,
            relativePosition: this.relativePos,
            type,
            typeStr: TokenType[type].toString(),
            value: value
        };
    }

    protected complain(): void {
        throw new Error(`Unexpected token at line ${this.line}:${this.pos}`);
    }
}
