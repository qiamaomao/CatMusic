<script setup lang="ts">
const { width, height } = withDefaults(defineProps<{
  width?: string
  height?: string
}>(), {
  width: "100%",
  height: "100%"
})
</script>

<template>
  <div class="block">
  </div>
</template>

<style scoped lang="scss">
.block {
  width: v-bind(width);
  height: v-bind(height);
  flex: 1;
  background-color: rgb(255, 246, 246);

  animation: 闪闪 1s infinite;
}

@keyframes 闪闪 {
  from {
    opacity: .8;
  }
}
</style>