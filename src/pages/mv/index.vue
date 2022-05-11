<script setup lang="ts">
import category from './component/category.vue';
import http from "@/tool/http"
import { onBeforeMount, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import list from '../components/list.vue';
import { useRouter } from "vue-router"

const router = useRouter()

// import { computed } from "@vue/reactivity";

const load = ref(false)
const upLoad = ref(false)
const page = ref(1)

interface ICategory {
  data: {
    area: {
      id: number
      name: string
    }[],
    version: {
      id: number
      name: string
    }[]
  }
}
interface IMvdata {
  data: {
    list: {
      picurl: string;
      title: string;
      vid: string
    }[]
  }
}

const { data: Categorydata } = await http.request<ICategory>("/mv/category", {
  method: "POST"
})

const choice = ref({
  area: {
    id: 16,
    name: "内地"
  },
  version: {
    type: 10,
    name: "翻唱"
  }
})

const { data: Mvdata } = await getMvdata()

const mvDataList = ref(Mvdata.list.map(({ picurl, title, vid }) => ({ picurl, title, id: vid })))

watch(choice.value, async () => {
  load.value = true
  page.value = 1

  const { data: Mvdata } = await getMvdata()

  mvDataList.value = reactive(Mvdata.list.map(({ picurl, title, vid }) => ({ picurl, title, id: vid })))

  load.value = false
})

function getMvdata() {
  return http.request<IMvdata>(`/mv/list?area=${choice.value.area.id}&pageSize=15&version=${choice.value.version.type}&pageNo=${page.value}`, {
    method: "POST"
  })
}

const box = ref<HTMLDivElement | null>(null)

const loadingStatus = ref(false)
async function scrollUp(this: HTMLDivElement) {
  if (loadingStatus.value) return

  // console.log(this.scrollTop);

  if (this.scrollHeight <= this.scrollTop + this.offsetHeight + 5.21) {
    page.value++
    upLoad.value = true
    loadingStatus.value = true

    const { data: mvData } = await getMvdata()
    await new Promise(r => setTimeout(() => { r("假装加载很慢~~~") }, 600))

    mvDataList.value.push(...mvData.list.map(({ picurl, title, vid }) => ({ picurl, title, id: vid })))

    upLoad.value = false
    loadingStatus.value = false
  }
}

onMounted(() => {
  box.value?.parentNode?.parentNode?.addEventListener("scroll", scrollUp)
})

onBeforeUnmount(() => {
  // console.log("喵喵喵");
  box.value?.parentNode?.parentNode?.removeEventListener("scroll", scrollUp)
})

const toOontent = (id: string) => {
  router.push({
    name: "视频页",
    params: {
      id
    }
  })
}
</script>

<template>
  <category :data="Categorydata" :choice="choice"></category>
  <div class="mvList" ref="box">
    <Transition name="fade" appear>
      <list class="mv-list" :dataList="mvDataList" :cols="3" v-if="!load || upLoad">
        <template #default="{ id }">
          <button @click="toOontent(id)">
            <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M15.875 10.72a3.482 3.482 0 000 4.925l5.582 5.581c.7.7 1.623 1.04 2.54 1.02a3.472 3.472 0 002.547-1.02l5.581-5.581a3.482 3.482 0 10-4.924-4.925l-3.2 3.2-3.201-3.2a3.482 3.482 0 00-4.925 0z"
                fill="#69A0FF" />
              <g filter="url(#svg_c4ca4238a0__filter0_b_924:86354)">
                <path d="M9 21a8 8 0 018-8h14a8 8 0 018 8v9a8 8 0 01-8 8H17a8 8 0 01-8-8v-9z"
                  fill="url(#svg_c4ca4238a0__paint0_linear_924:86354)" fill-opacity=".7" />
              </g>
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M29.702 24.555c0 2.095-6.298 6.21-7.873 4.658-1.574-1.553-1.574-7.763 0-9.316 1.575-1.553 7.873 2.563 7.873 4.658z"
                fill="#fff" />
              <defs>
                <linearGradient id="svg_c4ca4238a0__paint0_linear_924:86354" x1="23.546" y1="16.788" x2="23.546" y2="38"
                  gradientUnits="userSpaceOnUse">
                  <stop stop-color="#3CB8FF" />
                  <stop offset="1" stop-color="#36B6FF" />
                </linearGradient>
                <filter id="svg_c4ca4238a0__filter0_b_924:86354" x="3" y="7" width="42" height="37"
                  filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImage" stdDeviation="3" />
                  <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_924:86354" />
                  <feBlend in="SourceGraphic" in2="effect1_backgroundBlur_924:86354" result="shape" />
                </filter>
              </defs>
            </svg>
          </button>
        </template>
      </list>
    </Transition>

    <n-space vertical v-show="upLoad">
      <n-grid x-gap="20" y-gap="20" :cols="3">
        <n-gi v-for="i in 3" :key="i">
          <n-skeleton height="140px" width="100%" />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<style scoped lang="scss">
button {
  position: absolute;
  top: .5em;
  right: .5em;
  bottom: .5em;
  left: .5em;
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

  &:hover+img {
    filter: blur(2px);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.n-skeleton {
  border-radius: 1em;
}

.n-space {
  margin-top: 1em;
}
</style>