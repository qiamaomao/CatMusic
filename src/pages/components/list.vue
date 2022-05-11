<script setup lang="ts">
defineProps<{
  dataList: {
    picurl: string;
    title: string;
    id: string;
  }[],
  cols: number
}>()
</script>


<template>
  <n-grid x-gap="20" y-gap="20" :cols="cols">
    <n-gi v-for="item of dataList" :key="item.id">
      <div class="List-item">
        <slot :id="item.id"></slot>
        <img :src="item.picurl" :alt="item.title">
        <span>{{ item.title }}</span>
      </div>
    </n-gi>
  </n-grid>
</template>

<style scoped lang="scss">
.List-item {
  border-radius: 1em;
  display: inline-flex;
  overflow: hidden;
  transition: transform .4s, opacity 1s, box-shadow 1s;
  position: relative;
  box-shadow: 0px 0px 30px 0px rgb(3 65 157 / 10%);

  &:hover {
    cursor: pointer;
    box-shadow: 6px 6px 30px 0px rgba(9, 29, 59, 0.1);
    transform: translateY(-4.6px);
    opacity: .9;

    :deep(button) {
      opacity: 1;
    }
  }

  span {
    position: absolute;
    bottom: 0;
    left: 1em;
    right: 10px;
    color: white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: right;
  }

  img {
    transition: .6s ease-in-out;
  }
}

.n-skeleton {
  border-radius: .5em;
}
</style>