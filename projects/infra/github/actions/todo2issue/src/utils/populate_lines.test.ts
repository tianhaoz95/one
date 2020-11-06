import { TodoParsingErrorType } from "../types";
import { lineToLineEntity } from "./populate_lines";

describe("Line parser tests", () => {
  test("Should not crash", () => {
    expect(() => {
      lineToLineEntity("some random content");
    }).not.toThrow();
  });

  test("Should identify todo", () => {
    const entity = lineToLineEntity("// TODO(@tianhaoz95): some random todo");
    expect(entity.containsTodo).toBeTruthy();
  });

  test("Should block non-todo", () => {
    const entity = lineToLineEntity("// I am just a comment");
    expect(entity.containsTodo).toBeFalsy();
  });

  test("Should parse todo section", () => {
    const entity = lineToLineEntity("// TODO(@tianhaoz95): some random todo");
    expect(entity.containsTodo).toBeTruthy();
    expect(entity.todoContent).toBeDefined();
    expect(entity.todoContent).toMatch("TODO(@tianhaoz95): some random todo");
  });

  test("Should error if todo has colon", () => {
    const entity = lineToLineEntity("// TODO(@tianhaoz95): some:random:todo");
    expect(entity.error).toBeDefined();
    expect(entity.error).toEqual(TodoParsingErrorType.CONTAINS_DISALLOWED_CHAR);
  });

  test("Should parse todo title correctly", () => {
    const entity = lineToLineEntity("// TODO(@tianhaoz95): some random todo");
    expect(entity.githubUsername).toBeDefined();
    expect(entity.githubUsername).toMatch("tianhaoz95");
  });

  test("Should parse issue number correctly", () => {
    const entity = lineToLineEntity("// TODO(#256): some random todo");
    console.log(JSON.stringify(entity));
    expect(entity.issueNumber).toBeDefined();
    expect(entity.issueNumber).toEqual(256);
  });

  test("Should error if assignee if malformed", () => {
    const entity = lineToLineEntity(
      "// TODO(some_random_stuff): some random todo"
    );
    expect(entity.error).toBeDefined();
    expect(entity.error).toEqual(TodoParsingErrorType.MALFORMED_ASSIGNEE);
  });
});
