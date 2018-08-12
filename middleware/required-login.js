export default function ({ store, redirect, route }) {
  if (!isLogin(store) && route.name !== 'login') {
    return redirect('/login')
  }
}

const isLogin = (store) => {
  return (store && store.state && store.state.user)
}
