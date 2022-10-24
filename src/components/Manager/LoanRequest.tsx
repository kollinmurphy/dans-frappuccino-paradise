/* @jsxImportSource solid-js */

import takeLoan from "@data/api/admin/loan"

export default function LoanRequest() {
    let ref: HTMLInputElement | undefined

    const handleTakeLoan = async () => {
        const value = ref?.valueAsNumber
        await takeLoan({ amount: value })
        location.reload()
    }

    return (
        <div class="flex flex-row gap-3 items-center justify-end pt-2">
            <p>Take out a loan: </p>
            <input ref={ref} type="number" class="input input-bordered input-sm" min={0} />
            <button class="btn btn-secondary btn-sm" onClick={handleTakeLoan}>
                Take out Loan
            </button>
        </div>
    )
}


