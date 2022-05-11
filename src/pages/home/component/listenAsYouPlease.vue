<script setup lang="ts">
import http from "@/tool/http"

interface IYouPlease {
  data: {
    tracks: Array<{
      album: {
        mid: string
      }
      mid: string
    }>
  }
}
// { data: bannerList }
const { data: { tracks } } = await http.request<IYouPlease>("/radio?id=101", {
  method: "POST"
})

// console.log(tracks);

</script>

<template>
  <div class="vague">
    <img :src="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${tracks[0].album.mid}.jpg`" alt="">
  </div>
  <div class="play">
    <img :src="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${tracks[0].album.mid}.jpg`" alt="">
    <button>
      <VueFeather type="play-circle" size="14px"></VueFeather>
    </button>
  </div>
</template>

<style scoped lang="scss">
.vague {
  position: absolute;
  filter: blur(1.8em);
  animation: 变化 10s infinite;
  z-index: -1;
}

.play {
  z-index: 1;
  overflow: hidden;
  border-radius: 1em;
  width: 130px;
  height: 130px;
  margin: auto;
  box-shadow: 0px 0px 30px 0px rgb(3 65 157 / 10%);
  position: relative;

  button {
    border: none;
    position: absolute;
    right: .5vw;
    bottom: .5vw;
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
  }
}


@keyframes 变化 {
  0% {
    filter: blur(1.8em);
    transform: scale(1);
  }

  50% {
    filter: blur(1em);
    transform: scale(2);
    opacity: .8;
  }

  100% {
    filter: blur(1.8em);
    transform: scale(1);
  }
}
</style>