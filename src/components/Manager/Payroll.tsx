/* @jsxImportSource solid-js */

import ErrorAlert from "@components/ErrorAlert";
import { payEmployees } from "@data/api/admin/hours";
import { Hours } from "@data/types/hours";
import { numToPrice } from "@utils/strings";
import { createSignal, Show } from "solid-js";

type Props = {
  hours: Hours[];
};

const PAY_RATE = 15 / 60;

export default function Payroll(props: Props) {
  const [error, setError] = createSignal<string | null>(null);

  const data = () => {
    const data = props.hours.reduce((map, hour) => {
      if (!map.has(hour.accountId)) {
        return map.set(hour.accountId, {
          username: hour.Account.username,
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
    }, new Map<number, { username: string; minutes: number; payRate: number; pay: number }>());
    return [...data.values()];
  };

  return (
    <div class="w-full">
      <h1 class="text-3xl my-2">Payroll</h1>
      <table class="table table-zebra w-full">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Unpaid Hours</th>
            <th>Pay Rate</th>
            <th>Pay</th>
          </tr>
        </thead>
        <tbody>
          <Show
            when={data().length > 0}
            fallback={
              <tr>
                <td colspan={4}>No hours to pay</td>
              </tr>
            }
          >
            {data().map((row) => (
              <tr>
                <td>{row.username}</td>
                <td>{row.minutes / 60}</td>
                <td>{numToPrice(row.payRate)}</td>
                <td>{numToPrice(row.pay)}</td>
              </tr>
            ))}
          </Show>
        </tbody>
      </table>

      <Show when={props.hours.length > 0}>
        <div class="flex justify-end mt-4">
          <button
            class="btn btn-primary"
            onClick={async () => {
              try {
                await payEmployees();
                location.reload();
              } catch (err) {
                setError(err.message || "Something unexpected happened");
              }
            }}
          >
            Pay Employees
          </button>
        </div>
      </Show>
      <ErrorAlert error={error()} />
    </div>
  );
}
