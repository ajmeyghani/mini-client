# Minimal Client

- Clone the repo
- `npm i` or `yarn install`
- `node tasks/dev` or `node tasks\dev` for windows users.

Hack away the stuff and see the result at `http://localhost:9989`.

## Build

To build the project do `node tasks/build` or `node tasks\build` for windows users.

## Line Ending

Make sure to always use LF for line endings:

```
git config core.eol lf
git config core.autocrlf input
```

Add the following to `.gitattributes` file:

```
* text=auto eol=lf
```

and then commit the file. After that, reset the index:

```
git rm --cached -r .  # Remove every file from git's index.
git reset --hard      # Rewrite git's index to pick up all the new line endings.
```

Always use `LF` line ending.

## TODO

- Add dockerfile.
- Add example for react.
