<template>
  <div>{{ props.ftext }}</div>
</template>
<script lang="ts" setup>
const props = defineProps({
  ftext: {
    type: String,
    required: true,
  },
});
</script>
