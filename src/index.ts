import {Project, SourceFile} from "ts-simple-ast";
import path from "path";

const project: Project = new Project({
    addFilesFromTsConfig: false
});

// Inspect source files
const files: SourceFile[] = project.addExistingSourceFiles(path.join(__dirname, "../source/**/*.ts"));

for (const file of files) {
    for (const clss of file.getClasses()) {

        console.log(clss.getText());
    }
}

console.log("Done.");
