import React from 'react'

import { GameCard } from 'emojic-shared'

import {
  getCardTypeDisplay,
  getManaAmountDisplay,
  getCardAttributeDisplay,
} from '../../helpers/card'
import {
  Attribute,
  Attributes,
  Back,
  Image,
  Main,
  ManaCost,
  PowerToughness,
  Type,
  Wrap,
} from './style'

interface Props {
  activateAbility?: (attributeIndex: number) => void
  card: GameCard
  onClick?: () => void
}

export const Card: React.FC<Props> = ({
  activateAbility,
  card: {
    isTapped,
    name,
    manaCost,
    type,
    attributes,
    basePower,
    baseToughness,
  },
  onClick,
}) => (
  <Wrap isTapped={isTapped}>
    <Main isTapped={isTapped} onClick={onClick}>
      {manaCost && <ManaCost>{getManaAmountDisplay(manaCost)}</ManaCost>}

      <Image>{name}</Image>

      <Type>{getCardTypeDisplay(type)}</Type>

      <Attributes>
        {attributes &&
          attributes.map((attribute, index) => (
            <Attribute
              key={index}
              onClick={
                activateAbility && attribute.type === 'ActivatedAbility'
                  ? () => activateAbility(index)
                  : undefined
              }
            >
              {getCardAttributeDisplay(attribute)}
            </Attribute>
          ))}
      </Attributes>

      {basePower && baseToughness && (
        <PowerToughness>
          {basePower} / {baseToughness}
        </PowerToughness>
      )}
    </Main>

    <Back isTapped={isTapped} />
  </Wrap>
)
