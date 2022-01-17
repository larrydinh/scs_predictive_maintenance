import * as fs from 'fs'
import * as path from 'path'

export function readFile(directory: string, fileName: string, fileType: 'JSON' | 'CSV') {
  const data =
    fileType === 'JSON'
      ? JSON.parse(fs.readFileSync(path.join(directory, fileName), 'utf-8'))
      : fs.readFileSync(path.join(directory, fileName), 'utf-8')
  return data
}
