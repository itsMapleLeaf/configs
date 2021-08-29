type Action = {
  description: string
  run: () => Promise<unknown> | void
}
