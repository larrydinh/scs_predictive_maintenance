export function cloneJson(json: object): object {
  return JSON.parse(JSON.stringify(json))
}
