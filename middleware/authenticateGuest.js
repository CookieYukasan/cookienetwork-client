export default async function ({ redirect, store }) {
  if (store.state.auth.user) return redirect("/dashboard");
}
