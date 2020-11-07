import { TodoContext } from "../types";
import YAML from "yaml";
import fs from "fs";

export const readConfig = (context: TodoContext): void => {
  const configFilename = context.args.configFilename;
  const configRawContent = fs.readFileSync(configFilename, "utf-8");
  let config: Record<string, unknown>;
  if (RegExp("^[^s]+.json$").test(configFilename)) {
    const parsed = JSON.parse(configRawContent);
    if (parsed === undefined) {
      throw Error(`Failed parsing the config from file ${configFilename}`);
    }
    config = parsed as Record<string, unknown>;
  } else if (RegExp("^[^s]+.[yaml|yml]$")) {
    config = YAML.parse(configRawContent) as Record<string, unknown>;
  } else {
    throw Error(
      `The configuration file extension is not
      supported, please use a JSON or YAML file.`
    );
  }
  if ("todo_config" in config) {
    const todoConfig: Record<string, unknown> = config["todo_config"] as Record<
      string,
      unknown
    >;
    if ("include_files" in todoConfig) {
      const patterns: string[] = todoConfig["include_files"] as string[];
      context.config.patterns = patterns;
    }
  }
};
