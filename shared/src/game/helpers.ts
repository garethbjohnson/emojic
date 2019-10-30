export const makeId = (): string =>
  [...Array(16)].map(() => Math.floor(Math.random() * 36).toString(36)).join('')
