<script setup lang="ts">
import banner from './component/banner.vue';
import listenAsYouPlease from './component/listenAsYouPlease.vue';
import mYlist from '../components/list.vue';
import http from "@/tool/http"
import { ref } from 'vue';

interface ImusicList {
  data: {
    list: Array<{
      dissname: string
      imgurl: string
      dissid: string
    }>
  }
}

const { data: { list } } = await http.request<ImusicList>("/songlist/list?category=15", {
  method: "POST"
})

const dataList = ref(list.map(({ dissid, dissname, imgurl }) => ({
  picurl: imgurl,
  title: dissname,
  id: dissid,
})))

</script>

<template>
  <header>
    <Suspense>
      <template #default>
        <banner class="banner"></banner>
      </template>
      <template #fallback>
        <n-space vertical class="banner">
          <n-skeleton height="240px" width="100%" />
        </n-space>
      </template>
    </Suspense>

    <aside>
      <listenAsYouPlease></listenAsYouPlease>
    </aside>
  </header>
  <div class="musicList">
    <mYlist :dataList="dataList.splice(0, 16)" :cols="4">
      <button>
        <VueFeather type="play-circle" size="14px"></VueFeather>
      </button>
    </mYlist>
  </div>
</template>

<style scoped lang="scss">
header {
  display: flex;
  margin-bottom: 2em;

  .banner {
    height: 240px;
    overflow: hidden;
    margin-right: 1.6em;
    border-radius: 2em;
    flex: 2.8;
    width: 0;
  }

  aside {
    flex: 1;
    padding: 2em;
    border-radius: 2em;
    box-shadow: 0px 0px 30px 0px rgb(3 65 157 / 10%);

    overflow: hidden;
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
  }

}


button {
  position: absolute;
  top: .5em;
  right: .5em;
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