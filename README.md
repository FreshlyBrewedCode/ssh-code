# ssh-code

A simple command for starting vscode in a remote ssh folder.

## Usage

You need to have node and vscode installed.

Install via npm:
```
npm i -g ssh-code
```
then run the `ssh-code` or `scode` command (both commands do the same `scode` is just an alias):
```
ssh-code user@host:/path
```
the user is optional so you can also just run:
```
scode host:/path
```

alternativly you can also run directly via npx (note: only the `ssh-code` command will work):
```
npx ssh-code user@host:/path
```

## How it works

All it does is parse the user, host and path from the arguments and run the vscode command:
```
code --folder-uri=vscode-remote://ssh-remote+<user>@<host>/<path>
```

see the [related issue](https://github.com/microsoft/vscode-remote-release/issues/3324) for more info.

## License

MIT