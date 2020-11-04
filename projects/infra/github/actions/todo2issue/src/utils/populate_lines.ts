import { FileEntity, LineEntity, TodoContext } from "../types";

export const lineToLineEntity = (line: string): LineEntity => {
    const todoMatcher = RegExp("TODO(.*):.*");
    if (todoMatcher.test(line)) {
        const entity: LineEntity = {
            containsTodo: true,
            content: line,
        }
        return entity;
    }
    const entity: LineEntity = {
        containsTodo: false,
        content: line,
    }
    return entity;
}

export const populateLines = (context: TodoContext): void => {
    context.files.forEach((file: FileEntity) => {
        const lineContents = file.content.split("\n");
        lineContents.forEach((lineContent: string) => {
            // populate file entities
        });
    });
}