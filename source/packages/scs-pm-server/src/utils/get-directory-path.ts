import * as path from 'path'

export function getDirectoryPath(destinationFolder: string, directoryName: string): string {
  const directoryPath = path.join(destinationFolder, directoryName)
  return directoryPath
}
