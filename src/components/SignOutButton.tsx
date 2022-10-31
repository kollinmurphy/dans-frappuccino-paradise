/* @jsxImportSource solid-js */

function delete_cookie( name, path, domain ) {
  if( get_cookie( name ) ) {
    document.cookie = name + "=" +
      ((path) ? ";path="+path:"")+
      ((domain)?";domain="+domain:"") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}

function get_cookie(name){
  return document.cookie.split(';').some(c => {
      return c.trim().startsWith(name + '=');
  });
}

const SignOutButton = () => {
  return (
    <div class='btn btn-secondary btn-xs' onClick={() => {
      // document.cookie = 'token='
      delete_cookie('token', '/', 'localhost')
      window.location.href = '/'
    }}>
      Sign Out
    </div>
  )
}

export default SignOutButton
