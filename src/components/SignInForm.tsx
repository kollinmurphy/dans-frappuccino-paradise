/* @jsxImportSource solid-js */

import signIn from "@data/api/accounts/signIn"
import { createSignal } from "solid-js"
import ErrorAlert from "./ErrorAlert"

const SignInForm = () => {
  const [error, setError] = createSignal<string | null>(null)
  let usernameField: undefined | HTMLInputElement
  let passwordField: undefined | HTMLInputElement

  const handleSignIn = async () => {
    try {
      const username = usernameField?.value
      const password = passwordField?.value
      if (!username || !password)
        throw new Error('Please enter a username and a password.')
      const account = await signIn({ username, password })
      document.cookie = `token=${account.token};path=/;`
      window.location.href= '/account'
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div class='flex flex-col gap-2'>
      <span>Username</span>
      <input class='input input-bordered w-full' ref={usernameField} />

      <span>Password</span>
      <input class='input input-bordered' type='password' ref={passwordField} onKeyPress={e => {
        if (e.key === 'Enter')
          handleSignIn()
      }} />

      <button class='btn btn-primary self-end' onClick={handleSignIn}>
        Sign In
      </button>
      <a href='/signup' class='btn btn-secondary btn-outline self-end'>
        Create Account
      </a>

      <ErrorAlert error={error()} />
    </div>
  )
}

export default SignInForm
