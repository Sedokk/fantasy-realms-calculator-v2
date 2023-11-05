import "./style.scss"
import { cards } from "./modules/cards"
import { Hand } from "./modules/helpers"
;(function () {
  const btns = document.querySelectorAll(".suit-card")
  const handContainer = document.querySelector(".results__hand")
  if (!handContainer) return

  const hand = new Hand(handContainer)

  btns.forEach((btn) => {
    btn.addEventListener("click", (ev) => {
      const target = ev.target as HTMLButtonElement
      if (target.dataset.name === undefined) return
      hand.add(target.dataset.name, cards[target.dataset.name])
    })
  })
})()
