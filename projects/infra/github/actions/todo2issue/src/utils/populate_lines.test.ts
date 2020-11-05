import { lineToLineEntity } from "./populate_lines";

describe("Line parser tests", () => {
    test("Should not crash", () => {
        expect(() => {
            lineToLineEntity("some random content");
        }).not.toThrow();
    });

    test("Should identify todo", () => {
        const entity = lineToLineEntity("// TODO(tianhaoz95): some random todo");
        expect(entity.containsTodo).toBeTruthy();
    });

    test("Should block non-todo", () => {
        const entity = lineToLineEntity("// I am just a comment.");
        expect(entity.containsTodo).toBeFalsy();
    });

    test("Should parse todo section", () => {
        const entity = lineToLineEntity("// TODO(tianhaoz95): some random todo");
        expect(entity.containsTodo).toBeTruthy();
        expect(entity.todoContent).toBeDefined();
        expect(entity.todoContent).toMatch("TODO(tianhaoz95): some random todo");
    });
});