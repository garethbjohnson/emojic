export enum Phase {
  Combat = 'COMBAT',
  End = 'END',
  Main1 = 'MAIN_1',
  Main2 = 'MAIN_2',
  Upkeep = 'UPKEEP',
}

export const phaseOrder = [
  Phase.Upkeep,
  Phase.Main1,
  Phase.Combat,
  Phase.Main2,
  Phase.End,
]
