/* @jsxImportSource solid-js */

const SignOutButton = () => {
  return (
    <div class='btn btn-secondary btn-sm' onClick={() => {
      document.cookie = 'token='
      window.location.href = '/'
    }}>
      Log Out
    </div>
  )
}

export default SignOutButton
