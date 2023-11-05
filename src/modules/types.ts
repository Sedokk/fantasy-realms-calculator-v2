type Card = {
  power: number
  title: string
  suit: string
}

type Cards = {
  [a: string]: Card
}

type Action = (
  this: Card,
  hand: Map<string, Card>,
  blocked: Set<string>,
  protectedSuits: Set<string>
) => number | void

type Actions = { [name: string]: Action }

export type { Card, Cards, Action, Actions }
