import { TodoContext, TodoIssue } from "../types";

export const getDefaultContext = (): TodoContext => {
  const context: TodoContext = {
    args: {
      configFilename: "",
    },
    config: {
      patterns: [],
      files: [],
    },
    files: [],
    issues: new Map<Number, TodoIssue>(),
  };
  return context;
};
