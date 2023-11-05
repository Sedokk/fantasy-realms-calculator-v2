import type { Card } from "./types"
import { actions } from "./cards"

class Hand {
  container: Element
  hand: Map<string, Card>
  blocked: Set<string>
  protectedSuits: Set<string>
  allowedCardAmount: number

  constructor(container: Element) {
    this.container = container
    this.hand = new Map()
    this.blocked = new Set()
    this.protectedSuits = new Set()
    this.allowedCardAmount = 7
    this.calculate()
  }

  add(name: string, card: Card): void {
    if (this.hand.size >= this.allowedCardAmount) return
    if (!card || this.hand.has(name)) return
    this.hand.set(name, card)
    const template = `
      <div class="hand-card" data-name="${name}">
        <span class="hand-card__text">${card.title}</span>
        <span class="hand-card__power">${card.power}</span>
      </div>
    `
    this.container.insertAdjacentHTML("beforeend", template)
    this.container.lastElementChild?.addEventListener("click", () => {
      this.remove(name)
    })
    //================
    this.calculate()
  }

  remove(name: string): void {
    if (!this.hand.has(name)) return
    this.hand.delete(name)
    this.container.querySelector(`[data-name="${name}"]`)?.remove()
    // =================
    this.calculate()
  }

  private calculate() {
    this.blocked.clear()
    this.protectedSuits.clear()
    let sum = 0

    for (const list of actions) {
      for (const [name, card] of this.hand) {
        if (this.blocked.has(name)) continue
        sum +=
          list[name]?.call(
            card,
            this.hand,
            this.blocked,
            this.protectedSuits
          ) ?? 0
      }
    }

    const countElem = document.querySelector(
      ".results__count"
    ) as HTMLSpanElement
    if (!countElem) return
    countElem.innerText = sum.toString()

    //=================
    this.renewCardsAmount()
  }

  private renewCardsAmount() {
    const amountElem = document.querySelector(
      ".results__has-cards"
    ) as HTMLSpanElement
    if (!amountElem) return
    amountElem.innerText = this.hand.size.toString()
  }
}

export { Hand }
