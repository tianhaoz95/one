import { FileEntity, LineEntity, TodoContext, TodoParsingErrorType } from "../types";

export const lineToLineEntity = (line: string): LineEntity => {
    const todoMatcher = RegExp("TODO\\(\\w+\\):[\\w|\\s]+");
    const entity: LineEntity = {
        containsTodo: false,
        content: line,
    }
    if (todoMatcher.test(line)) {
        const regexResult = line.match(todoMatcher);
        const matchingSubstrs: string[] = [];
        if (regexResult) {
            regexResult.forEach((matchingSubstr: string) => {
                matchingSubstrs.push(matchingSubstr);
            });
        }
        entity.containsTodo = true;
        if (matchingSubstrs.length > 1) {
            entity.error = TodoParsingErrorType.MULTIPLE_TODO_ENTRIES;
            entity.errorMessage = `
                More than 1 todo found in a single line.
                Matching substr are: ${JSON.stringify(matchingSubstrs)}`;
            return entity;
        }
        const targetTodoSubstr = matchingSubstrs[0];
        const todoSections: string[] = targetTodoSubstr.split(":");
        entity.todoContent = targetTodoSubstr;
        return entity;
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