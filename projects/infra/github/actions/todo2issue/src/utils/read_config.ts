import { TodoContext } from "../types";

export const readConfig = (context: TodoContext): void => {
  context.config = {
    patterns: [],
    files: [],
  };
};
