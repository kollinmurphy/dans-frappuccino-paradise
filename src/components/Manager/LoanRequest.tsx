/* @jsxImportSource solid-js */

import takeLoan from "@data/api/admin/loan"

// export interface Props {
//   tag?: string;
// }

// const { drink, tag } = Astro.props;


export default function LoanRequest() {
    let ref: HTMLInputElement | undefined

    const handleTakeLoan = async () => {
        const value = ref?.valueAsNumber
        await takeLoan({ amount: value })
        location.reload()
    }

    return (
        <div class="flex flex-row gap-3 items-center justify-end">
            <p>Take out a loan: </p>
            <input ref={ref} type="number" class="input input-bordered input-sm"/>
            <button class="btn btn-secondary" onClick={handleTakeLoan}>
                Add to Balance
            </button>
        </div>
    )
}


