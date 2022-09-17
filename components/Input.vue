<template>
  <div class="position-relative">
    <label
      v-if="inputLabel"
      :for="inputName"
      class="font-16 font-regular mb-8"
      >{{ inputLabel }}</label
    >
    <input
      class="form-control"
      :class="[
        inputClass,
        {
          'cursor-pointer-disabled': isDisabled,
        },
      ]"
      :id="inputName"
      :name="inputName"
      :placeholder="placeholderValue"
      :type="inputType"
      :disabled="isDisabled"
      :required="isRequired"
      :autocomplete="autoComplete ? 'on' : 'off'"
      v-model="dynamicValue"
    />
  </div>
</template>

<script>
export default {
  props: {
    inputClass: {
      type: String,
      default: "br-4 pl-16 pr-16 ptb-16 form-control border-grey-200",
    },
    inputType: {
      type: String,
      required: true,
    },
    autoComplete: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    placeholderValue: String,
    inputName: String,
    inputLabel: String,
  },
  data() {
    return {
      dynamicValue: "",
    };
  },
  watch: {
    dynamicValue(newDynamicValue) {
      this.$emit("onUpdate", newDynamicValue);
    },
  },
};
</script>
