/* @jsxImportSource solid-js */

import addFunds from "@data/api/accounts/addFunds";
import { Account } from "@data/types/account";
import { createSignal } from "solid-js";

export default function AddMoneyForm(props: { balance: number }) {
  const [money, setMoney] = createSignal(0);

  return (
    <div class="flex flex-col gap-2">
      <div>
        You currently have <span class='font-bold'>${props.balance || 0}</span> in your account.
      </div>
      <div class="flex flex-row gap-2 items-center">
        <span>Money to add</span>
        <div class="flex flex-row items-center gap-1">
          <span>$</span>
          <input
            type="number"
            class="input input-bordered"
            value={money()}
            onChange={(e) => setMoney(e.currentTarget.valueAsNumber)}
            min={0}
          />
        </div>
      </div>
      <div class="self-end">
        <button class="btn btn-primary" onClick={async () => {
          await addFunds({ amount: money() })
          location.reload()
        }}>Add Money</button>
      </div>
    </div>
  );
}
