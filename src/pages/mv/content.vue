<script setup lang="ts">
import { useRoute } from "vue-router"
import http from "@/tool/http"
import { reactive, ref } from "vue";
import { videoPlay } from 'vue3-video-play'
import "vue3-video-play/dist/style.css"; // 引入css

const { params: { id } } = useRoute()

const { data } = await http.request<{
  data: {
    [key: string]: string[]
  }
}>("/mv/url" + `?id=${id}`, {
  method: "POST"
})

const mvD = await http.request<{
  data: {
    info: {
      cover_pic: string;
      name: string
    }
  }
}>("/mv" + `?id=${id}`, {
  method: "POST"
})

console.log(mvD);



const mvUrl = ref(data[id as string])

const options = reactive({
  width: "100%", //播放器高度
  height: "100%", //播放器高度
  title: mvD.data.info.name, //视频名称
  src: mvUrl.value[0], //视频源
  poster: mvD.data.info.cover_pic, //封面
});
</script>

<template>
  <div class="video">
    <videoPlay v-bind="options" />
  </div>
</template>

<style scoped lang="scss">
.video {
  border-radius: 2em;
  overflow: hidden;

  height: 100%;
}
</style>