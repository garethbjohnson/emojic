import { ManaAmount } from 'emojic-shared'

import { getManaMinusCost } from './helpers'

const getManaAmount = (string: string): ManaAmount => {
  const pattern = /^([0-9]*)[^0-9]*$/
  const [_, colorlessString] = string.match(pattern)

  return {
    colorless: Number(colorlessString),

    black: (string.match(/💀/g) || []).length,
    blue: (string.match(/💧/g) || []).length,
    green: (string.match(/🌳/g) || []).length,
    red: (string.match(/🔥/g) || []).length,
    white: (string.match(/☀️/g) || []).length,
  }
}

describe('getManaMinusCost', () => {
  const testMap: [string, string, string | typeof Error][] = [
    // [pool, cost, expectation]
    ['0', '0', '0'],
    ['0', '1', Error],
    ['0', '💀', Error],
    ['1', '0', '1'],
    ['1', '1', '0'],
    ['1', '💀', Error],
    ['💀', '0', '💀'],
    ['💀', '1', '0'],
    ['💀', '💀', '0'],
    ['💀', '💧', Error],
    ['💀', '1💀', Error],
    ['💀', '💀💀', Error],
    ['💀💀', '1', '💀'],
    ['💀💀', '💀', '💀'],
    ['💀💀', '1💀', '0'],
    ['💀💀', '2', '0'],
    ['💀💀', '💀💧', Error],
  ]

  for (const [poolString, costString, expectation] of testMap) {
    const pool = getManaAmount(poolString)
    const cost = getManaAmount(costString)

    if (expectation === Error) {
      test(`${poolString} minus ${costString} throws an error`, () => {
        expect(() => getManaMinusCost(pool, cost)).toThrow()
      })
    } else {
      test(`${poolString} minus ${costString} is ${expectation}`, () => {
        const result = getManaMinusCost(pool, cost)
        const expectedResult = getManaAmount(expectation as string)
        expect(result).toEqual(expectedResult)
      })
    }
  }
})
