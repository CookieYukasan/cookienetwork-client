<template>
  <main
    :class="{
      'mt-24': $device.isMobile,
      'row gx-0 vh-100': $device.isDesktop,
    }"
  >
    <div
      class="left-side d-flex flex-column justify-content-center align-items-center"
      :class="`${$device.isDesktop ? 'col-6' : 'col-12 align-items-center'}`"
    >
      <span class="fw-bold font-26">
        Hi, Welcome to
        <span class="fw-bold font-26 font-purple">CookieNetwork</span>
        !</span
      >
      <p class="font-grey-100 font-14 font-medium mb-16 mt-8">
        Start your 7-day free trial
      </p>
      <form class="w-75" @submit.prevent="handleRegister">
        <Input
          inputType="text"
          :isRequired="true"
          placeholderValue="Inform your username"
          inputName="username"
          inputLabel="Username"
          @onUpdate="(value) => (user.userName = value)"
        />
        <Input
          class="mt-16"
          inputType="text"
          :isRequired="true"
          placeholderValue="Inform your email"
          inputName="email"
          inputLabel="Email"
          @onUpdate="(value) => (user.email = value)"
        />
        <Input
          class="mt-16"
          inputType="password"
          :isRequired="true"
          placeholderValue="Inform your password"
          inputName="password"
          inputLabel="Password"
          @onUpdate="(value) => (user.password = value)"
        />
        <HcaptchaWrapper
          v-if="!!!$config.hcaptcha.disabled"
          :onVerify="onVerifyCaptcha"
          :onExpire="onExpireCaptcha"
          :onError="onErrorCaptcha"
          ref="loginHcaptcha"
        />
        <Button
          class="mt-16"
          btnType="submit"
          :btnLoading="loading.login"
          :btnDisabled="
            (!!$config.hcaptcha.disabled ? false : !captcha.isFilled) ||
            $v.user.email.$invalid ||
            $v.user.password.$invalid ||
            $v.user.userName.$invalid
          "
          >Sign up</Button
        >
        <div class="font-14 mt-16">
          <span class="fw-medium font-grey-100">Already have an account?</span>
          <NuxtLink to="/login" class="fw-bold font-purple">
            Sign in here
          </NuxtLink>
        </div>
      </form>
    </div>
    <div class="right-side col-6 font-white">
      <div class="position-absolute bottom-0 mb-48 mrl-48">
        <h1 class="mb-16 font-26 fw-bold">CookieNetwork</h1>
        <p class="font-20 fw-regular">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id nulla
          totam deserunt, ut ratione debitis magni voluptas quos quisquam, amet
          modi eligendi deleniti, voluptatibus obcaecati perferendis repellat
          accusamus? Mollitia, exercitationem?
        </p>
      </div>
    </div>
  </main>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import Bowser from "bowser";

export default {
  data() {
    return {
      error: false,
      loading: {
        login: false,
      },
      captcha: {
        isFilled: false,
        token: null,
      },
      user: {
        email: "",
        userName: "",
        password: "",
      },
    };
  },
  methods: {
    onVerifyCaptcha(token) {
      this.captcha.token = token;
      this.captcha.isFilled = true;
    },
    onExpireCaptcha() {
      if (!this.$refs.loginHcaptcha) return;
      this.$refs.loginHcaptcha.resetCaptcha();
      this.captcha.isFilled = false;
      this.captcha.token = null;
    },
    onErrorCaptcha(error) {
      this.$sentryCaptureException(error);
    },
    async handleRegister() {
      this.loading.login = true;

      try {
        await this.$store.dispatch("auth/register", {
          ...this.user,
          token: this.captcha.token,
          device: Bowser.parse(window.navigator.userAgent),
        });
      } catch (error) {
        if (this.$refs.loginHcaptcha) {
          this.$refs.loginHcaptcha.resetCaptcha();
          this.captcha.isFilled = false;
          this.captcha.token = null;
        }

        this.error = true;
        this.$sentryCaptureException(error);
      }

      this.loading.login = false;
    },
  },
  head() {
    return {
      title: `CookieNetwork - Sign up`,
      meta: [
        { hid: "robots", name: "robots", content: "index, follow" },
        {
          name: "description",
          content: `cookinho cookie cuq cukie.`,
        },
        {
          property: "og:title",
          content: "CookieNetwork - Sign up",
        },
        {
          property: "og:description",
          content: `cookinho cookie cuq cukie.`,
        },
      ],
    };
  },
  validations: {
    user: {
      userName: {
        required,
        minLength: minLength(3),
      },
      email: {
        required,
      },
      password: {
        minLength: minLength(6),
        required,
      },
    },
  },
  middleware: ["authenticateGuest"],
};
</script>

<style>
.right-side {
  background: linear-gradient(
      0deg,
      rgba(98, 74, 221, 0.75),
      rgba(98, 74, 221, 0.75)
    ),
    url("/img/web/landing-bg.png");
  background-position: center;
  background-size: cover;
}
</style>
