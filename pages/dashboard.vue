<template>
  <div>
    <main class="row gx-0 vh-100">
      <div class="col-2 font-white pt-24 left-side">
        <h1 class="fw-bold font-24 text-center font-purple">Cookie Network</h1>
      </div>
      <div
        class="col-8 mt-24"
        :style="{
          paddingLeft: '50px',
        }"
      >
        <div>
          <h1 class="font-36 font-purple fw-semibold">League of Legends</h1>
          <p class="font-grey-400 mt-16">
            League of Legends account checker.<br />
            Thanks
            <a
              class="font-purple fw-semibold"
              href="https://lol.hydranetwork.org"
              target="_blank"
              >HydraNetwork</a
            >
            for the api.
          </p>
        </div>
        <div class="row gx-0 mt-24">
          <div class="col-6">
            <textarea
              name="account-list"
              id="account-list"
              placeholder="Your account list"
              ref="accountList"
              class="account-list p-16 font-grey-400 br-4 w-100 mb-16"
              :style="{ height: '260px' }"
            ></textarea>
            <Button btnType="button" :btnLoading="false" :btnDisabled="false">
              Start
            </Button>
          </div>
          <div class="col-6 pl-24">
            <div class="d-flex align-items-center">
              <div class="d-flex flex-column align-items-center">
                <p class="font-grey-400 fw-medium">Reproved</p>
                <strong class="font-24 font-purple">2</strong>
              </div>
              <div class="d-flex flex-column align-items-center ml-24">
                <p class="font-grey-400 fw-medium">Approved</p>
                <strong class="font-24 font-purple">5</strong>
              </div>
              <div class="d-flex flex-column align-items-center ml-24">
                <p class="font-grey-400 fw-medium">Waiting</p>
                <strong class="font-24 font-purple">1.6K</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-2 right-side pt-24">
        <div class="d-flex flex-column align-items-center mrl-16">
          <div class="d-flex mb-24 align-items-center">
            <img
              src="https://i.pinimg.com/originals/79/9b/0a/799b0a3eeb7646a586b232baeade9d52.jpg"
              alt="User Image"
              class="rounded-circle user-image"
              width="80px"
              height="80px"
            />
            <div class="ml-16">
              <p class="font-grey-400 font-16">
                Welcome, <strong>{{ currentUser.userName }}</strong>
              </p>
              <p class="font-purple mt-8 cursor-pointer" @click="logout">
                Click to logout
              </p>
            </div>
          </div>

          <div
            class="br-4 w-100 p-16"
            :style="{
              backgroundColor: '#474747',
            }"
          >
            <p class="fw-semibold font-grey-400">Your plan details:</p>
            <div class="mt-24">
              <div class="d-flex justify-content-between">
                <p class="fw-semibold font-grey-400">Name</p>
                <span class="fw-semibold font-purple">Diamond</span>
              </div>
              <div class="d-flex justify-content-between mt-8">
                <p class="fw-semibold font-grey-400">Expiration Date</p>
                <span class="fw-semibold font-purple">25/08/2022</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");
    },
  },
  mounted() {
    this.$nextTick(function () {
      if (!this.$refs.accountList) return;

      this.$refs.accountList.ondrop = function (e) {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        const reader = new FileReader();
        reader.onload = (e) => (this.value = e.target.result);
        reader.readAsText(file);

        return false;
      };
    });
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  middleware: ["authenticateUser"],
};
</script>

<style>
body {
  background-color: #12101a;
}

.left-side {
  border-right: 1px solid #474747;
}

.right-side {
  border-left: 1px solid #474747;
}

.user-image {
  border: 3px solid var(--purple);
}

textarea.account-list {
  border: none;
  outline: none;
  resize: none;
  background-image: url(https://cdn.hydranetwork.org/assets/images/logo-grey.png);
  background-repeat: no-repeat;
  background-size: 40%;
  background-position: center;
  background-color: #474747;
}
</style>
