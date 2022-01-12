export function getLabelValue(array: any[] | undefined, toUpperCase = false) {
  if (array === undefined) {
    return []
  }
  return array.map(x => {
    let val = x.value
    if (typeof val === 'string' || val instanceof String) {
      val = toUpperCase !== undefined && toUpperCase === true ? val.toUpperCase() : val
    }
    return {
      value: val,
      label: `${x.label || x.title} (${val})`,
    }
  })
}
