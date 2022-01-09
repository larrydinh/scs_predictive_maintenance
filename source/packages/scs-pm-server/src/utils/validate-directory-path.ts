import * as fs from 'fs'

export function validateDirectoryExistence(path: string): boolean {
  return fs.existsSync(path)
}
