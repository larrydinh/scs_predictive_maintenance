export function getFileName(fileName: string, fileExtension: 'csv' | 'json' | 'txt', filePrefix?: string) {
  return filePrefix
    ? `${filePrefix}_${fileName}_${new Date().toLocaleDateString()}.${fileExtension}`
    : `${fileName}_${new Date().toLocaleDateString()}.${fileExtension}`
}
