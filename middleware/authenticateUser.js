export default async function ({ redirect, store, route }) {
  if (!store.state.auth.user) return redirect('/login')
}
