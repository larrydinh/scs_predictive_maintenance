import moment from 'moment'

export function convertIsoStringToDate(isoString: string) {
  return moment(isoString).format('YYYY-MM-DD HH:mm:ss')
}
