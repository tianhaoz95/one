import { TodoContext } from "../types";

export const populateFiles = (context: TodoContext): void => {
  context.config.files = [];
};
