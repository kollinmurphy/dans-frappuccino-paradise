/* @jsxImportSource solid-js */

const SignOutButton = () => {
  return (
    <div class='btn btn-secondary btn-xs' onClick={() => {
      document.cookie = 'token='
      window.location.href = '/'
    }}>
      Sign Out
    </div>
  )
}

export default SignOutButton
