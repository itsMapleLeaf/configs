import { promptList } from "prompt-fns"
import { SetRequired } from "type-fest"

export type ProjectEnvironment = {
  name: string
  isBrowser: boolean
  isNode: boolean
  isApplication: boolean
  isLibrary: boolean
}

function defineEnvironment(
  environment: SetRequired<Partial<ProjectEnvironment>, "name">,
): ProjectEnvironment {
  return {
    isBrowser: false,
    isNode: false,
    isApplication: false,
    isLibrary: false,
    ...environment,
  }
}

const environments = {
  browserApplication: defineEnvironment({
    name: "Browser Application",
    isBrowser: true,
    isApplication: true,
  }),
  browserLibrary: defineEnvironment({
    name: "Browser Library",
    isBrowser: true,
    isLibrary: true,
  }),
  nodeApplication: defineEnvironment({
    name: "Node Application",
    isNode: true,
    isApplication: true,
  }),
  nodeLibrary: defineEnvironment({
    name: "Node Library",
    isNode: true,
    isLibrary: true,
  }),
  electron: defineEnvironment({
    name: "Electron",
    isBrowser: true,
    isNode: true,
    isApplication: true,
  }),
}

export function promptEnvironment() {
  return promptList({
    message: "Project environment:",
    choices: Object.values(environments).map((environment) => ({
      name: environment.name,
      value: environment,
    })),
  })
}
