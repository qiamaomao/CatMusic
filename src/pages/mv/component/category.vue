<script setup lang="ts">
defineProps<{
  data: {
    area: {
      id: number
      name: string
    }[],
    version: {
      id: number
      name: string
    }[]
  },
  choice: {
    area: {
      id: number;
      name: string;
    };
    version: {
      type: number;
      name: string;
    };
  }
}>()
</script>

<template>
  <div class="mv-category">
    <div v-for="item of data.area" class="category-list" :class="{ active: item.name === choice.area.name }"
      @click="choice.area.id = item.id; choice.area.name = item.name">
      {{ item.name }}
    </div>
    <span>地区</span>
  </div>
  <div class="mv-category">
    <div v-for="item of data.version" class="category-list" :class="{ active: item.name === choice.version.name }"
      @click="choice.version.type = item.id; choice.version.name = item.name">
      {{ item.name }}
    </div>
    <span>类型</span>
  </div>


</template>

<style scoped lang="scss">
.mv-category {
  display: flex;
  margin: 1em;
  background-color: #f5faff;
  border-radius: 100em;
  padding: .8em 1.4em;
  overflow: hidden;
  overflow-x: auto;
  margin-bottom: 1.6em;
  align-items: center;
  margin-top: .8em;

  span {
    margin-right: 1em;
    margin-left: auto;
  }

  .category-list {
    margin-right: 1em;
    padding: .3em 1em;
    border-radius: 100px;
    box-shadow: 1px 4px 30px 0px rgb(0 0 0 / 10%);
    cursor: pointer;
    transition: all .3s ease-in;

    flex-shrink: 0;
  }

  .active {
    background-color: black;
    color: white;
  }
}
</style>