import {
  Attribute,
  AttributeActivatedAbility,
  CardType,
  EffectGetMana,
  ManaAmount,
  Phase,
  getManaAmountDisplay,
} from 'emojic-shared'

const getActivatedAbilityCostDisplay = (
  cost: AttributeActivatedAbility['cost']
): string | undefined => {
  const costs: string[] = []
  if (cost.tap) costs.push('⤵️')
  if (cost.mana) costs.push(getManaAmountDisplay(cost.mana))

  if (costs.length) return `${costs.join(', ')}`
}

const getActivatedAbilityDisplay = (
  ability: AttributeActivatedAbility
): string | undefined => {
  let display = getActivatedAbilityEffectDisplay(ability.effect)

  const costDisplay = getActivatedAbilityCostDisplay(ability.cost)
  if (costDisplay) display = `${costDisplay}: ${display}`

  return display
}

const getActivatedAbilityEffectDisplay = (
  effect: AttributeActivatedAbility['effect']
): string => {
  if (isEffectGetMana(effect)) return getEffectGetManaDisplay(effect.amount)
  else throw new Error('Unknown effect type')
}

export const getCardAttributeDisplay = (
  attribute: Attribute
): string | undefined => {
  if (attribute.type === 'ActivatedAbility')
    return getActivatedAbilityDisplay(attribute)
  else return ''
}

export const getCardTypeDisplay = (type: CardType): string => {
  let display: string = type.main
  if (type.modifier) display = `${type.modifier} ${display}`
  if (type.subtypes) display = `${display} – ${type.subtypes.join(' ')}`
  return display
}

export const getEffectGetManaDisplay = (manaAmount: ManaAmount): string =>
  `add ${getManaAmountDisplay(manaAmount)} to your mana pool`

export const getPhaseDisplay = (phase: Phase): string =>
  ({
    [Phase.Upkeep]: 'Upkeep',
    [Phase.Main1]: 'Main 1',
    [Phase.Combat]: 'Combat',
    [Phase.Main2]: 'Main 2',
    [Phase.End]: 'End',
  }[phase])

const isEffectGetMana = (
  effect: AttributeActivatedAbility['effect']
): effect is EffectGetMana => effect.type === 'GetMana'
