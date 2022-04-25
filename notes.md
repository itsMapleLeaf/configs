- [ ] resolve conflicts between npm scripts
- [ ] make ignored paths unique
- [x] maybe categorize ignored paths, so they can go to the appropriate files
  - e.g. it doesn't make sense to add .vscode to tsconfig excludes, but we want that in .gitignore
  - might be best to just hardcode specific ignores?
- [x] application types should be more atomic:
  - app-browser
  - app-node
  - library-browser
  - library-node
  - electron
- [ ] for features dependent on other features, should write that as a separate feature to avoid circular dependencies
  - e.g. the vite feature depends on tailwind, should generate the vite index.html in a separate feature (?)
- [ ] always-on features, relevant to ^
- [x] eslint feature should write a .eslintrc.cjs file with a require.resolve() call
- [ ] update eslint config
- [ ] allow features to run commands on completion
- [ ] prettier feature should format on completion
- [ ] tsup/esmo feature should create an src/main.ts file
- [ ] allow features to ask their own questions for things

## feature ideas

- [ ] cypress
