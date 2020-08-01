import React from 'react'

import { GameCard, getColor, getManaAmountDisplay } from 'emojic-shared'

import { getCardTypeDisplay, getCardAttributeDisplay } from '../../helpers/card'
import {
  Attribute,
  Attributes,
  Back,
  Image,
  Main,
  ManaCost,
  PowerToughness,
  PowerToughnessWrap,
  StatusIcons,
  Type,
  Wrap,
} from './style'

interface Props {
  activateAbility?: (attributeIndex: number) => void
  card: GameCard
  onClick?: () => void
}

export const Card: React.FC<Props> = ({ activateAbility, card, onClick }) => {
  const {
    attributes,
    basePower,
    baseToughness,
    hasSummoningSickness,
    isAttacking,
    isTapped,
    manaCost,
    name,
    type,
  } = card

  const color = getColor(card)

  return (
    <Wrap isAttacking={isAttacking} isTapped={isTapped}>
      <Main color={color} isTapped={isTapped} onClick={onClick}>
        {manaCost && <ManaCost>{getManaAmountDisplay(manaCost)}</ManaCost>}

        <Image>{name}</Image>

        <StatusIcons>{hasSummoningSickness && <span>🤢</span>}</StatusIcons>

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
          <PowerToughnessWrap color={color}>
            <PowerToughness>
              {basePower} / {baseToughness}
            </PowerToughness>
          </PowerToughnessWrap>
        )}
      </Main>

      <Back isTapped={isTapped} />
    </Wrap>
  )
}
