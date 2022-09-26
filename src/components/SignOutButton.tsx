/* @jsxImportSource solid-js */

const SignOutButton = () => {
  return (
    <div class='btn btn-primary' onClick={() => {
      document.cookie = 'token='
      location.reload()
    }}>
      Log Out
    </div>
  )
}

export default SignOutButton
