import * as fs from 'fs'

export function validateFileExistence(path: string): boolean {
  return fs.existsSync(path)
}
