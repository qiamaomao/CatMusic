<script setup lang="ts">
import http from "@/tool/http"
import { ref } from "vue";
import list from '../components/list.vue';

interface IRadioC {
  data: {
    id: string;
    title: string;
    list: {
      id: string;
      title: string;
      pic_url: string
    }[]
  }[]
}

const { data: RadioCategorydata } = await http.request<IRadioC>("/radio/category", {
  method: "POST"
})

const radioList = ref(RadioCategorydata.map(item => {
  const list = item.list.map(({ id, pic_url, title }) => {
    return {
      picurl: pic_url,
      title: title,
      id: id,
    }
  })

  return { ...item, list }
}))

</script>

<template>

  <div class="radio">
    <div class="radio-list" v-for="item of radioList">
      <h3 v-if="item.list.length">{{ item.title }}</h3>
      <list :dataList="item.list" :cols="4">
        <button>
          <VueFeather type="play-circle" size="14px"></VueFeather>
        </button>
      </list>
    </div>
  </div>

</template>

<style scoped lang="scss">
.radio {
  margin-top: 1em;
  margin-bottom: 1em;

  .radio-list {
    h3 {
      font-size: 1.8em;
      padding: 0 1em;
      padding-bottom: 14px;
      padding-top: 14px;
    }

    &:first-child {
      h3 {
        padding-top: 0;
      }
    }
  }

}


button {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  background-color: white;
  padding: 6px;
  width: 2vw;
  height: 2vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  color: blueviolet;
  cursor: pointer;
  box-shadow: 0px 0px 30px 0px rgb(3 65 157 / 10%);
  border: none;
  transition: .6s;
  opacity: 0;
  z-index: 999;

  &:hover {
    color: rgb(243, 52, 52);
  }

  &:hover+:deep(img) {
    filter: blur(2px);
  }
}
</style>