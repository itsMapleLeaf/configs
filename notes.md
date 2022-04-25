- [ ] every feature should have an id (when i need it)
- [ ] prefix with that id during logging (if possible?)
- [x] might be helpful for features to know which other feature IDs are enabled
- [ ] resolve conflicts between npm scripts
- [ ] make ignored paths unique
- [ ] maybe categorize ignored paths, so they can go to the appropriate files
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

## feature ideas

- [ ] cypress
- [ ] react
