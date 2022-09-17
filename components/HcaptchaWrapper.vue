<template>
  <hcaptcha
    @verify="onVerify"
    @expired="onExpire"
    @challengeExpired="onExpire"
    @error="onError"
    :class="hCaptchaClass"
    :sitekey="$config.hcaptcha.siteKey"
    ref="hcaptcha"
  ></hcaptcha>
</template>

<script>
export default {
  props: {
    onVerify: {
      type: Function,
      default: () => {},
    },
    onExpire: {
      type: Function,
      default: () => {},
    },
    onError: {
      type: Function,
      default: () => {},
    },
    hCaptchaClass: {
      type: String,
      default: "mt-16 d-flex justify-content-center",
    },
  },
  methods: {
    resetCaptcha() {
      this.$refs.hcaptcha.reset();
    },
  },
};
</script>
