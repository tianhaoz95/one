export enum TodoParsingErrorType {
  MULTIPLE_TODO_ENTRIES,
  CONTAINS_DISALLOWED_CHAR,
  MALFORMED_ASSIGNEE,
}

export interface LineEntity {
  containsTodo: boolean;
  content: string;
  todoContent?: string;
  title?: string;
  githubUsername?: string;
  issueNumber?: number;
  error?: TodoParsingErrorType;
  errorMessage?: string;
}

export interface TodoIssue {
  id: Number;
}

export interface FileEntity {
  filename: string;
  content: string;
  lines: LineEntity[];
}

export interface TodoConfig {
  patterns: string[];
  files: string[];
}

export interface ActionArgs {
  configFilename: string;
}

export interface TodoContext {
  args: ActionArgs;
  config: TodoConfig;
  files: FileEntity[];
  issues: Map<Number, TodoIssue>;
}
