<script setup lang="ts">
import HNav from "./pages/HNav.vue"
import { useRoute } from "vue-router"
import { computed } from "@vue/reactivity";
import { onMounted, ref, watch } from "vue"
const route = useRoute()

const key = computed(() => {
  return "" + route.path
})

const main_box = ref<HTMLDivElement | null>(null)

watch(route, () => {
  main_box.value!.scrollTop = 0
})

onMounted(() => {
  main_box.value?.addEventListener("scroll", function () {
    if (this.scrollTop < 521) {
      top.value = false

      return
    }

    top.value = true
  })
})

const top = ref(false)
const goTop = () => {
  main_box.value!.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}
</script>

<template>
  <div class="musicBox">
    <HNav></HNav>

    <main>
      <div class="main-box" ref="main_box">
        <RouterView v-slot="{ Component }">
          <template v-if="Component">
            <Transition name="fade" mode="out-in">
              <KeepAlive :include="key" :key="key">
                <Suspense>
                  <!-- 主要内容 -->
                  <div>
                    <component :is="Component"></component>
                  </div>

                  <!-- 加载中状态 -->
                  <template #fallback v-if="route.name == `音乐馆`">
                    <n-space vertical>
                      <n-grid x-gap="12" :cols="2">
                        <n-gi v-for="i in 2">
                          <n-skeleton height="180px" width="100%" />
                        </n-gi>
                      </n-grid>
                      <n-grid x-gap="12" :cols="4">
                        <n-gi v-for="i in 4">
                          <n-skeleton height="140px" width="100%" />
                        </n-gi>
                      </n-grid>
                      <n-grid x-gap="12" :cols="4">
                        <n-gi v-for="i in 4">
                          <n-skeleton height="140px" width="100%" />
                        </n-gi>
                      </n-grid>
                      <n-grid x-gap="12" :cols="3">
                        <n-gi v-for="i in 3">
                          <n-skeleton height="180px" width="100%" />
                        </n-gi>
                      </n-grid>
                    </n-space>
                  </template>

                  <template #fallback v-if="route.name == `电台`">
                    <n-space vertical>
                      <n-grid x-gap="20" y-gap="20" :cols="4">
                        <n-gi v-for="i in 16">
                          <n-skeleton height="140px" width="100%" />
                        </n-gi>
                      </n-grid>
                    </n-space>
                  </template>

                  <template #fallback v-if="route.name == `视频 (MV)`">
                    <n-space vertical>
                      <n-grid v-for="i in 3" x-gap="40" y-gap="40" :cols="1">
                        <n-gi>
                          <n-skeleton height="60px" width="100%" />
                        </n-gi>
                      </n-grid>
                      <n-grid x-gap="20" y-gap="20" :cols="3">
                        <n-gi v-for="i in 16">
                          <n-skeleton height="140px" width="100%" />
                        </n-gi>
                      </n-grid>
                    </n-space>
                  </template>
                </Suspense>
              </KeepAlive>
            </Transition>
          </template>
        </RouterView>
        <Transition name="fade">
          <div class="top" @click="goTop" v-show="top">
            <VueFeather type="chevron-up" size="22px"></VueFeather>
          </div>
        </Transition>
      </div>
    </main>
  </div>

</template>

<style scoped lang="scss">
.musicBox {
  display: flex;
  background: #fafcffba;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  width: 68vw;
  height: 84vh;

  margin: auto;
  overflow: hidden;

  border-radius: 1.2vw;
  box-shadow: 0px 0px 30px 0px rgb(3 65 157 / 10%);
}

main {
  flex: 1;
  margin: 2.5vw 2vw;

  position: relative;
  overflow: hidden;
  border-radius: 2em;

  .main-box {
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
    display: flex;
    flex-direction: column;

    &>div {
      height: 100%;
    }

    &::-webkit-scrollbar {
      width: 0 !important
    }
  }
}

.n-skeleton {
  border-radius: .5em;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.top {
  position: fixed;
  right: 10.5vw;
  bottom: 10vh;
  box-shadow: 0px 0px 30px 0px rgb(3 65 157 / 10%);
  border-radius: 100px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: .6em;
  cursor: pointer;
  color: white;
  background-image: linear-gradient(to left, rgb(245, 202, 181), rgb(255, 236, 200));
  transition: all 1s;

  height: auto !important;

  &:hover {
    opacity: .8;
    cursor: grab
  }
}
</style>