import React from 'react'

import { GameCard } from 'emojic-shared'

import {
  getCardTypeDisplay,
  getManaAmountDisplay,
  getCardAttributeDisplay,
} from '../../helpers/card'
import {
  Attributes,
  Image,
  ManaCost,
  PowerToughness,
  Type,
  Wrap,
} from './style'

interface Props {
  card: GameCard
}

export const Card: React.FC<Props> = ({
  card: { name, manaCost, type, attributes, basePower, baseToughness },
}) => (
  <Wrap>
    {manaCost && <ManaCost>{getManaAmountDisplay(manaCost)}</ManaCost>}

    <Image>{name}</Image>

    <Type>{getCardTypeDisplay(type)}</Type>

    <Attributes>
      {attributes &&
        attributes.map(attribute => (
          <li>{getCardAttributeDisplay(attribute)}</li>
        ))}
    </Attributes>

    <PowerToughness>
      {basePower && baseToughness && `${basePower} / ${baseToughness}`}
    </PowerToughness>
  </Wrap>
)
