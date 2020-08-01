import { Card, ManaAmount, getColor, getManaAmountDisplay } from 'emojic-shared'

import { getManaMinusCost, hiddenCard, getSortedCards } from './helpers'

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

const mockCard = (cardProps?: Partial<Card>): Card => ({
  ...hiddenCard,
  ...cardProps,
})

const mockMana = (amount: ManaAmount): Card => ({
  ...hiddenCard,
  type: {
    modifier: 'Basic',
    main: 'Mana',
  },
  attributes: [
    {
      type: 'ActivatedAbility',
      cost: {
        tap: true,
      },
      effect: {
        type: 'GetMana',
        amount,
      },
    },
  ],
})

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

describe('getSortedCards', () => {
  const manaG = mockMana({ green: 1 })
  const manaR = mockMana({ red: 1 })
  const card1 = mockCard({ manaCost: { colorless: 1 } })
  const cardG = mockCard({ manaCost: { green: 1 } })
  const cardR = mockCard({ manaCost: { red: 1 } })
  const card1G = mockCard({ manaCost: { colorless: 1, green: 1 } })
  const cardGR = mockCard({ manaCost: { green: 1, red: 1 } })

  const testMap: [Card[], Card[]][] = [
    // [cards, expectedResult]
    [[], []],
    [[cardG], [cardG]],
    [[manaG], [manaG]],
    [
      [card1, cardG],
      [card1, cardG],
    ],
    [
      [cardG, card1],
      [card1, cardG],
    ],
    [
      [card1G, cardG],
      [cardG, card1G],
    ],
    [
      [card1G, cardG, cardGR],
      [cardG, card1G, cardGR],
    ],
    [
      [cardG, cardR, card1G],
      [cardG, card1G, cardR],
    ],
    [
      [manaG, manaR],
      [manaG, manaR],
    ],
    [
      [manaR, manaG],
      [manaG, manaR],
    ],
    [
      [manaG, card1],
      [manaG, card1],
    ],
    [
      [card1, manaG],
      [manaG, card1],
    ],
    [
      [card1, manaR, manaG],
      [manaG, manaR, card1],
    ],
  ]

  const getCardsDisplay = (cards: Card[]) =>
    '[' +
    cards
      .map((card: Card) =>
        card.type.main === 'Mana'
          ? `${getColor(card)}-mana`
          : (card.manaCost && getManaAmountDisplay(card.manaCost)) || 0,
      )
      .join(', ') +
    ']'

  for (const [cards, expectedResult] of testMap) {
    test(`${getCardsDisplay(cards)} sorts to ${getCardsDisplay(
      expectedResult,
    )}`, () => {
      const result = getSortedCards<Card>(cards)
      expect(result).toEqual(expectedResult)
    })
  }
})
