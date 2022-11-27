#!/usr/bin/env node

import { spawn } from "child_process";
import { Argument, Command } from "commander";
import { readFile } from "fs/promises";
const { version } = JSON.parse(
  await readFile(new URL("./package.json", import.meta.url))
);

const program = new Command("ssh-code");

program
  .version(version)
  .description("A simple command for opening a ssh folder in vscode")
  .argument(
    "<target>",
    "The target folder to open in the format of [user@]host:path"
  )
  .usage("[options] [user@]host:path")
  .action((target) => {
    // Regex for the target string
    // The user is optional
    const targetRegex = /^((?<user>[^@]+)@)?(?<host>[^:]+):(?<path>.+)$/;
    const result = targetRegex.exec(target);

    if (!result) {
      console.error("Invalid target");
      process.exit(1);
    }
    const { user, host, path } = result.groups;

    // Run vscode with the ssh folder
    const connection = `${user ? user + "@" : ""}${host}`;
    const proc = spawn("code", [
      `--folder-uri=vscode-remote://ssh-remote+${connection}/${path}`,
    ]);
  });

program.parse();
