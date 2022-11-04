/* @jsxImportSource solid-js */

import addHours from "@data/api/employee/addHours";
import { createSignal } from "solid-js";


export default function AddHoursForm() {
  const [hours, setHours] = createSignal(0);
  const [error, setError] = createSignal<string | null>(null);

//   const handleAddHours = async () => {
//     setError(null);
//     try {
        
//     } catch (err) {
//       setError(err.message);
//     }
//   };

  return (
    <div class="flex flex-col gap-2">
      <div class="flex flex-row gap-2 items-center">
        <span>Hours to add:</span>
        <div class="flex flex-row items-center gap-1">
          <input
            type="number"
            class="input input-bordered"
            value={hours()}
            onChange={(e) => setHours(e.currentTarget.valueAsNumber)}
            min={0}
          />
          <button class="btn btn-primary" onClick={async () => { handleAddHours }}>
            Add Hours
          </button>
        </div>
      </div>
      <div class="self-end">
        
      </div>
    </div>
  );
}
