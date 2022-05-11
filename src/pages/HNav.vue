<script setup lang="ts">
import 喵喵喵 from "@/assets/images/左侧动态图/喵喵喵.jpg"
import { useRouter, useRoute } from "vue-router"
const router = useRouter()
const route = useRoute()


const navList = [
  {
    icon: "music",
    name: "音乐馆"
  },
  {
    icon: "video",
    name: "视频 (MV)"
  },
  {
    icon: "activity",
    name: "电台"
  }
]

const toPage = (name: string) => {
  router.push({
    name
  })
}

</script>

<template>
  <aside>
    <div class="logo">
      <img src="https://y.qq.com/mediastyle/yqq/img/logo.png?max_age=2592000" alt="">
    </div>
    <nav>
      <li :class="{ active: item.name == route.name }" v-for="item of navList" :key="item.name"
        @click="toPage(item.name)">
        <VueFeather :type="item.icon" size="14px"></VueFeather>
        <span>{{ item.name }}</span>
      </li>
    </nav>

    <n-popover trigger="hover">
      <template #trigger>
        <div class="xzkb">
          <img :src="喵喵喵" alt="星之卡比">
        </div>
      </template>
      <span>很高兴遇见你 🌟</span>
    </n-popover>
  </aside>
</template>

<style scoped lang="scss">
aside {
  display: flex;
  flex-direction: column;
  width: 220px;
  box-shadow: 0px 0px 30px 0px rgb(3 65 157 / 10%);
  padding: 2.5vw 2vw;
  flex: 0 0 auto;
  background-color: white;
  position: relative;

  .logo {
    margin-bottom: 40px;

    img {
      width: 100px;
      height: 27px;
    }
  }
}

nav {
  position: relative;

  li {
    display: flex;
    align-items: center;
    margin-bottom: 1em;
    font-size: small;
    padding: .7em .8em;

    span {
      margin: 0 .4em;
    }

    cursor: pointer;
    background-color: white;

    transition: background 1s;
  }

  li.active {
    background-image: linear-gradient(to left, rgb(242, 197, 114), rgb(195, 139, 247));
    color: white;
    border-radius: .6em;

    i {
      color: rgb(250, 185, 65);
    }
  }
}

.xzkb {
  position: absolute;
  bottom: -1em;
  right: 0;
  left: 0;
  opacity: .6;
  cursor: cell;
}
</style>