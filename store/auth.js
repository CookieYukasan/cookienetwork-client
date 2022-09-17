const redirectUserAfterLogin = ($router) => {
  const redirectUserTo = window.localStorage.getItem('redirectTo')

  if (redirectUserTo) {
    window.localStorage.removeItem('redirectTo')

    return $router.go(redirectUserTo)
  }

  $router.go('/dashboard')
}

export const state = () => ({
  user: null,
  accessToken: null,
})

export const mutations = {
  SET_USER(state, user) {
    state.user = { ...user }
  },
  SET_ACCESS_TOKEN(state, accessToken) {
    state.accessToken = accessToken
  },
}

export const getters = {}

export const actions = {
  async login({ commit }, userData) {
    const { data } = await this.$axios.post('/api/auth/login', userData)

    commit('SET_USER', data.user)

    redirectUserAfterLogin(this.$router)
  },

  async register({ commit }, userData) {
    const { data } = await this.$axios.post('/api/auth/register', userData)

    commit('SET_USER', data.user)

    redirectUserAfterLogin(this.$router)
  },

  async updatePassword({ commit }, userData) {
    await this.$axios.post(
      `/api/users/${userData._id}/profile/change-password`,
      userData
    )

    commit('SET_USER', userData)
  },

  async updateProfileInformation({ commit }, userData) {
    await this.$axios.post(`/api/users/${userData._id}/profile`, userData)

    commit('SET_USER', userData)
  },

  async setUser({ commit }, userData) {
    commit('SET_USER', userData)
  },

  async logout({ commit }) {
    await this.$axios.post('/api/auth/logout')

    commit('SET_USER', {
      user: null,
    })

    window.location.reload()
  },

  async setAccessToken({ commit }, accessToken) {
    commit('SET_ACCESS_TOKEN', accessToken)
  },
}
