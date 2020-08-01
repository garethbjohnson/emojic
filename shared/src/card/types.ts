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
    | 'Angel'
    | 'Aura'
    | 'Boar'
    | 'Cat'
    | 'Demon'
    | 'Dragon'
    | 'Elf'
    | 'Frog'
    | 'Goblin'
    | 'Human'
    | 'Kraken'
    | 'Lion'
    | 'Lizard'
    | 'Merfolk'
    | 'Ogre'
    | 'Owl'
    | 'Rhino'
    | 'Soldier'
    | 'Spider'
    | 'Vampire'
    | 'Wizard'
    | 'Zombie'
  )[]
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
