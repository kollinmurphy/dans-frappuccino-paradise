import { createSignal, onMount } from "solid-js";

const authSignal = createSignal<string | null>(null)

const [auth, setAuth] = authSignal

onMount(() => {
  const el = document.querySelector('#authorization')
  setAuth(el.innerHTML)
})

export default authSignal
