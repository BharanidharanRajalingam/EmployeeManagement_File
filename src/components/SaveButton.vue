<template class="">
  <v-btn type="submit" :size="size" color="blue-darken-4" :density="density" :rounded="rounded" :eleveation="eleveation"
    :variant="variant">{{ btnlabel }}</v-btn>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    btnlabel: {
      type: String,
      default: "Save"
    },
    size: {
      type: String,
      default: "small"
    },
    density: {
      type: String,
      default: "default"
    },
    rounded: {
      type: String,
      default: "sm"
    },
    eleveation: {
      type: String,
      default: "4"
    },
    variant: {
      type: String,
      default: "elevated"
    },

  },
  setup() {
    return {};
  },
});
</script>
<style></style>
