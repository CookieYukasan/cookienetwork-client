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
      <form class="w-75" @submit.prevent="handleLogin">
        <Input
          inputType="text"
          :isRequired="true"
          placeholderValue="Inform your email or username"
          inputName="email"
          inputLabel="Email or username"
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
        <div v-if="error" class="float-start mt-8">
          <p class="font-red font-14 font-medium mb-16">
            Invalid credentials. Try again.
          </p>
        </div>
        <NuxtLink
          to="/recovery-password"
          class="fw-bold font-14 font-purple float-end mt-8 mb-16"
        >
          Forgot password
        </NuxtLink>
        <HcaptchaWrapper
          v-if="!!!$config.hcaptcha.disabled"
          :onVerify="onVerifyCaptcha"
          :onExpire="onExpireCaptcha"
          :onError="onErrorCaptcha"
          ref="loginHcaptcha"
        />
        <Button
          btnType="submit"
          :btnLoading="loading.login"
          :btnDisabled="
            (!!$config.hcaptcha.disabled ? false : !captcha.isFilled) ||
            $v.user.email.$invalid ||
            $v.user.password.$invalid
          "
          >Sign in</Button
        >
        <div class="font-14 mt-16">
          <span class="fw-medium font-grey-100">Don't have an account?</span>
          <NuxtLink to="/register" class="fw-bold font-purple">
            Sign up for free
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
      loading: {
        login: false,
      },
      captcha: {
        isFilled: false,
        token: null,
      },
      user: {
        email: "",
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
    async handleLogin() {
      this.loading.login = true;
      this.error = false;

      try {
        await this.$store.dispatch("auth/login", {
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
      title: `CookieNetwork - Login`,
      meta: [
        { hid: "robots", name: "robots", content: "index, follow" },
        {
          name: "description",
          content: `cookinho cookie cuq cukie.`,
        },
        {
          property: "og:title",
          content: "CookieNetwork - Login",
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
