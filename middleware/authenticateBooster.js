export default async function ({ redirect, store }) {
  const currentUser = store.state.auth.user

  if (!currentUser) return redirect('/login')

  if (!currentUser.isBooster && !currentUser.isAdmin) return redirect('/')
}
