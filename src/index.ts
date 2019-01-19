import readline from "readline";
import Scanner from "./scanner";
import {IToken} from "./types";

const i: readline.Interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const scanner: Scanner = new Scanner();

i.setPrompt("> ");

i.on("line", (input: string) => {
    scanner.feed(input);

    console.log(scanner.scan().map((token: IToken) => {
        return token.typeStr;
    }).join(" ") || "<Empty>");

    i.prompt();
});

i.prompt();
