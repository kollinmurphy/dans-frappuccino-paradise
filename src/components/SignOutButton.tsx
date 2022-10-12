/* @jsxImportSource solid-js */

const SignOutButton = () => {
  return (
    <div class='btn btn-secondary btn-sm' onClick={() => {
      document.cookie = 'token='
      location.reload()
    }}>
      Log Out
    </div>
  )
}

export default SignOutButton
