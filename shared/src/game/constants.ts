export enum Phase {
  Combat = 'COMBAT',
  End = 'END',
  Main = 'MAIN',
  Upkeep = 'UPKEEP',
}

export const phaseOrder = [
  Phase.Upkeep,
  Phase.Main,
  Phase.Combat,
  Phase.Main,
  Phase.End,
]
