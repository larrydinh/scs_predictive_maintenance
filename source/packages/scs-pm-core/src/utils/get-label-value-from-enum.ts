import { LabelValue } from '../models'

export function getLabelValueFromEnum<E>(a: E): LabelValue[] {
  return Object.keys(a).map(key => {
    return {
      label: a[key],
      value: a[key],
    }
  })
}
