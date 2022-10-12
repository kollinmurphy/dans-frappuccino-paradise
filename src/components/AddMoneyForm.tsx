/* @jsxImportSource solid-js */

import { createSignal } from "solid-js"

export default function AddMoneyForm() {
  const [money, setMoney] = createSignal(0)

  return (
    <div class='flex flex-col gap-2'>
      <div class='flex flex-row gap-2 items-center'>
        <span>Money to add</span>
        <div class='flex flex-row items-center gap-1'>
          <span>$</span>
          <input type='number' class='input input-bordered' value={money()} onChange={(e) => setMoney(e.currentTarget.valueAsNumber)} />
        </div>
      </div>
      <div class='self-end'>
        <button class='btn btn-primary'>
          Add Money
        </button>
      </div>
    </div>
  )
}
