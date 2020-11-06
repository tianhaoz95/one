import {
  FileEntity,
  LineEntity,
  TodoContext,
  TodoParsingErrorType,
} from "../types";

export const lineToLineEntity = (line: string): LineEntity => {
  const todoMatcher = RegExp("TODO\\([@|#]\\w+\\):.*");
  const entity: LineEntity = {
    containsTodo: false,
    content: line,
  };
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
    if (todoSections.length != 2) {
      entity.error = TodoParsingErrorType.CONTAINS_DISALLOWED_CHAR;
      entity.errorMessage = `
                Disallowed characters found in the todo.
                Todo content is: ${targetTodoSubstr}`;
      return entity;
    }
    const todoConfig = todoSections[0];
    const todoTitle = todoSections[1];
    const issueNumberOrUsername = todoConfig.split(RegExp("[(|)]"))[1];
    entity.todoContent = targetTodoSubstr;
    entity.title = todoTitle;
    if (RegExp("^#[0-9]+$").test(issueNumberOrUsername)) {
      const issueNumber = issueNumberOrUsername.trim().replace("#", "");
      entity.issueNumber = Number(issueNumber);
    } else if (RegExp("^@[^s]+$").test(issueNumberOrUsername)) {
      const githubUsername = issueNumberOrUsername.trim().replace("@", "");
      entity.githubUsername = githubUsername;
    } else {
      entity.error = TodoParsingErrorType.MALFORMED_ASSIGNEE;
      entity.errorMessage = `
            Malformed assignee found.
            The TODO is assigned to ${issueNumberOrUsername}.
            Allowed assignee formats are:
                1. @[username] 2. #[issue_number]`;
      return entity;
    }
    return entity;
  }
  return entity;
};

export const populateLines = (context: TodoContext): void => {
  context.files.forEach((file: FileEntity) => {
    const lineContents = file.content.split("\n");
    lineContents.forEach((lineContent: string) => {
      // populate file entities
    });
  });
};
