import { createBranch } from "./utils/create_branch";
import { getDefaultContext } from "./utils/default_context";
import { populateFiles } from "./utils/populate_files";
import { populateLines } from "./utils/populate_lines";
import { readConfig } from "./utils/read_config";
import { readFiles } from "./utils/read_files";
import { updateFiles } from "./utils/update_files";
import { updateIssues } from "./utils/update_issues";

const main = async (): Promise<void> => {
  const context = getDefaultContext();
  readConfig(context);
  populateFiles(context);
  readFiles(context);
  populateLines(context);
  await updateIssues(context);
  await createBranch(context);
  updateFiles(context);
};

main();
