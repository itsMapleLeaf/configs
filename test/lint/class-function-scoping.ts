/* eslint-disable @typescript-eslint/no-unused-vars */
export {}

class The {
  method = wrapper(() => {})
}

function wrapper(inner: () => void) {}
