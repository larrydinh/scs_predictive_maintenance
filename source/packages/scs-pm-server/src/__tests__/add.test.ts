import { add } from '../math/add'

describe('MathTest', () => {
  test('Test Add', () => {
    const result = add(1, 2)
    expect(result).toBeDefined()
    expect(result).toEqual(3)

    const result1 = add(1, 5)
    expect(result1).toBeDefined()
    expect(result1).toEqual(6)
  })
})
