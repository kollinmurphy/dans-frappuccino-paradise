/* @jsxImportSource solid-js */

import addHours from "@data/api/employee/addHours";
import { numToPrice } from "@utils/strings";
import { Order } from "@data/types/order";
import { Hours } from "@data/types/hours"
import { For, Show } from "solid-js";

type Props = {
  hours: Hours[];
};

const PAY_RATE = 15 / 60;


export default function Payroll(props: Props) {
  const data = () => {
    const data = props.hours.reduce((map, hour) => {
      if (!map.has(hour.accountId)) {
        return map.set(hour.accountId, {
          minutes: hour.minutesWorked,
          payRate: PAY_RATE * 60,
          pay: PAY_RATE * hour.minutesWorked,
        });
      }
      const acc = map.get(hour.accountId);
      return map.set(hour.accountId, {
        ...acc,
        minutes: acc.minutes + hour.minutesWorked,
        pay: acc.pay + PAY_RATE * hour.minutesWorked,
      });
    }, new Map<number, { minutes: number; payRate: number; pay: number }>());
    return [...data.values()]
  }

  return (
    <div class='w-full'>
      <h1 class="text-3xl my-2">Work History</h1>
      <table class="table table-zebra w-full">
        <thead>
          <tr>
            <th>Hours</th>
            <th>Pay Rate</th>
            <th>Total Earned</th>
            <th>Paid</th>
          </tr>
        </thead>
        <tbody>
          <Show when={data().length > 0} fallback={(
            <tr>
              <td colspan={4}>No hours logged</td>
            </tr>
          )}>
            <For each={props.hours.reverse()}>
              {(hour) => (
                <tr>
                  <td>{hour.minutesWorked / 60}</td>
                  <td>{numToPrice(PAY_RATE * 60)} / hr</td>
                  <td>{numToPrice(PAY_RATE * hour.minutesWorked)}</td>
                  <td>{hour.paid ? "Yes" : "No"}</td>
                </tr>
              )}
            </For>
          </Show>
        </tbody>
      </table>
      
    </div>
  );
}