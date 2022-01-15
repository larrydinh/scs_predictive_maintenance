export function getErrorMessage(error: unknown) {
  const errorMsg = error instanceof Error ? error.message : JSON.stringify(error)
  return errorMsg
}
