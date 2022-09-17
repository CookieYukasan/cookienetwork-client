export default async function ({ route, $axios, store }) {
  if (!process.server || !route.name) return;

  try {
    const currentUser = await $axios.get("/api/auth/me").then((res) => {
      const cookieMatch = res.config.headers.cookie.match(
        /(^|(?:\/))*access_token=([^;]+)/
      );

      store.dispatch(
        "auth/setAccessToken",
        cookieMatch[cookieMatch.length - 1]
      );

      return res.data;
    });

    // await Promise.all([store.dispatch("auth/setUser", currentUser)]);
    await store.dispatch("auth/setUser", currentUser);
  } catch (err) {
    // user unAuthenticated
  }
}
