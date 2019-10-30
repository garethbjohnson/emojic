export type Attribute = AttributeActivatedAbility

export interface AttributeActivatedAbility {
  type: 'ActivatedAbility'
  cost: {
    mana?: ManaAmount
    tap?: boolean
  }
  effect: EffectGetMana
}

export interface Card {
  name: string
  manaCost?: ManaAmount
  type: CardType
  attributes?: Attribute[]
  basePower?: number
  baseToughness?: number
}

export interface CardType {
  modifier?: 'Basic' | 'Legendary'
  main: 'Artifact' | 'Creature' | 'Enchantment' | 'Instant' | 'Mana' | 'Sorcery'
  subtypes?: (
    | 'Aura'
    | 'Demon'
    | 'Elf'
    | 'Goblin'
    | 'Human'
    | 'Kraken'
    | 'Merfolk'
    | 'Owl'
    | 'Spider'
    | 'Vampire'
    | 'Wizard'
    | 'Zombie')[]
}

export type Effect = EffectGetMana

export interface EffectGetMana {
  type: 'GetMana'
  amount: ManaAmount
}

export interface ManaAmount {
  colorless?: number

  black?: number
  blue?: number
  green?: number
  red?: number
  white?: number
}
