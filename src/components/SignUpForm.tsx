/* @jsxImportSource solid-js */

import createAccount from "@data/api/accounts/create"
import { createSignal } from "solid-js"
import ErrorAlert from "./ErrorAlert"

const SignUpForm = () => {
  const [error, setError] = createSignal<string | null>(null)
  let usernameField: undefined | HTMLInputElement
  let passwordField: undefined | HTMLInputElement

  const handleCreateAccount = async () => {
    try {
      const username = usernameField?.value
      const password = passwordField?.value
      if (!username || !password)
        throw new Error('Please enter a username and a password.')
      const account = await createAccount({ username, password })
      document.cookie = `token=${account.token};path=/;`
      window.location.href= '/account'
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div class='flex flex-col gap-2'>
      <span>Username</span>
      <input class='input input-bordered' ref={usernameField} />

      <span>Password</span>
      <input class='input input-bordered' type='password' ref={passwordField} onKeyPress={e => {
        if (e.key === 'Enter')
          handleCreateAccount()
      }} />

      <button class='btn btn-primary self-end' onClick={handleCreateAccount}>
        Create Account
      </button>
      <a href='/signin' class='btn btn-secondary btn-outline self-end'>
        Log In
      </a>

      <ErrorAlert error={error()} />
    </div>
  )
}

export default SignUpForm
