import { capitalizeFirstCharacter, cloneJson, getLabelValueFromEnum } from '../utils'

describe('Utils', () => {
  test('Capitalize first character, with lowercase string', () => {
    const str = 'scsPM'
    const expectedStr = 'ScsPM'

    const resultStr = capitalizeFirstCharacter(str)

    expect(resultStr).toBeDefined()
    expect(resultStr).toEqual(expectedStr)
  })

  test('Capitalize first character, with uppercase string', () => {
    const str = 'ScsPM'
    const expectedStr = 'ScsPM'

    const resultStr = capitalizeFirstCharacter(str)

    expect(resultStr).toBeDefined()
    expect(resultStr).toEqual(expectedStr)
  })

  test('Capitalize first character, with complete uppercase string', () => {
    const str = 'SCSPM'
    const expectedStr = 'SCSPM'

    const resultStr = capitalizeFirstCharacter(str)

    expect(resultStr).toBeDefined()
    expect(resultStr).toEqual(expectedStr)
  })

  test('Capitalize first character, with complete lowercase string', () => {
    const str = 'scspm'
    const expectedStr = 'Scspm'

    const resultStr = capitalizeFirstCharacter(str)

    expect(resultStr).toBeDefined()
    expect(resultStr).toEqual(expectedStr)
  })

  test('Clone JSON', () => {
    const sampleJson = { a: 'hello', b: true, c: 10, d: ['world'] }

    const resultJson = cloneJson(sampleJson)

    expect(resultJson).toBeDefined()
    expect(JSON.parse(JSON.stringify(resultJson))).toBeDefined()
    expect(resultJson).toEqual(sampleJson)
  })

  test('Get label value from enum with single value', () => {
    enum TestEnum {
      MACHINES = 'Machines',
    }
    const expectedResult = [{ label: 'Machines', value: 'Machines' }]

    const result = getLabelValueFromEnum(TestEnum)

    expect(result).toBeDefined()
    expect(result).toEqual(expectedResult)
  })

  test('Get label value from enum with single value', () => {
    enum TestEnum {
      MACHINES = 'Machines',
      PERSON = 'person',
    }
    const expectedResult = [
      { label: 'Machines', value: 'Machines' },
      { label: 'person', value: 'person' },
    ]

    const result = getLabelValueFromEnum(TestEnum)

    expect(result).toBeDefined()
    expect(result).toEqual(expectedResult)
  })
})
