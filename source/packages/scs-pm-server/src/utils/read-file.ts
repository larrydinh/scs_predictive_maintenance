import * as fs from 'fs'
import * as path from 'path'

export function readFile(directory: string, fileName: string): object {
  const data = JSON.parse(fs.readFileSync(path.join(directory, fileName), 'utf-8'))
  return data
}
