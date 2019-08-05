<template>
  <div id="app" class="flex flex-col font-sans">
    <div class="container mx-auto flex-1">
      <div class="pt-32 flex flex-col items-center">
        <img src="@/assets/ig_logo.png" alt="logo instagram" class="w-48" />
        <div class="flex mt-8">
          <div class="relative mr-6">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-6 h-6 text-gray-500 absolute"
              style="top: 50%; transform: translateY(-50%); left: 14px;"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              ref="usernameInput"
              v-model="username"
              type="text"
              class="border-2 border-gray-200 bg-gray-200 py-2 pl-12 pr-8 text-xl rounded-lg focus:outline-none focus:bg-white"
              placeholder="Instagram username"
              @keydown="onKeyDown"
            />
          </div>
          <button
            class="text-xl px-4 rounded-lg font-bold text-white focus:outline-none"
            style="background: linear-gradient(to right, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5);"
            @click="getUserImages"
          >Fetch Images</button>
        </div>
      </div>
      <div class="mt-20 grid-container" v-show="images.length">
        <div
          v-for="(photo, i) in images"
          :key="i"
          class="picture border-gray-200 shadow-lg rounded-lg overflow-hidden"
        >
          <a class="flex flex-col" :href="photo.path" target="_blank">
            <img class="rounded-t-lg" :src="photo.imgUrl" :alt="`picture number ${i}`" />
            <div class="py-3 px-8" v-if="photo.description.length">
              <p class="text-lg">{{ photo.description }}</p>
            </div>
          </a>
        </div>
      </div>
    </div>

    <footer class="bg-gray-900 py-4 mt-16">
      <div class="container mx-auto">
        <a href="#" class="text-gray-400 tracking-wide mr-8 hover:text-white">❤ Bruno De Angelis</a>
        <a
          href="https://github.com/brunodeangelis/instafeed"
          target="_blank"
          class="text-gray-400 tracking-wide hover:text-white"
        >View on GitHub</a>
      </div>
    </footer>

    <div
      v-show="loading"
      class="fixed top-0 left-0 h-screen w-screen flex justify-center items-center"
    >
      <div class="h-screen w-screen fixed bg-black opacity-50"></div>
      <div class="z-10 flex flex-col items-center">
        <div class="lds-heart">
          <div></div>
        </div>
        <h2 class="text-white text-2xl mt-2">Please wait while Puppeteer fetches all your pictures.</h2>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "app",
  data() {
    return {
      images: [],
      username: "",
      loading: false
    };
  },
  methods: {
    onKeyDown(e) {
      if (e.key == "Enter") {
        this.getUserImages();
      }
    },
    async getUserImages() {
      this.loading = true;
      this.$refs.usernameInput.blur();

      try {
        const images = await axios.get(
          `${process.env.VUE_APP_API_URL}/${this.username}`
        );
        this.images = images.data;
        console.log(this.images);
        this.loading = false;
      } catch (e) {
        this.loading = false;
        console.error(e);
      }
    }
  }
};
</script>

<style>
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 40px;
}

input,
.picture {
  transition: all 200ms ease;
}

#app {
  min-height: 100vh;
}

.picture:hover {
  transform: translateY(-1px);
  @apply shadow-xl;
}

.lds-heart {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
  transform: rotate(45deg);
  transform-origin: 32px 32px;
}
.lds-heart div {
  top: 23px;
  left: 19px;
  position: absolute;
  width: 26px;
  height: 26px;
  background: #fff;
  animation: lds-heart 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
}
.lds-heart div:after,
.lds-heart div:before {
  content: " ";
  position: absolute;
  display: block;
  width: 26px;
  height: 26px;
  background: #fff;
}
.lds-heart div:before {
  left: -17px;
  border-radius: 50% 0 0 50%;
}
.lds-heart div:after {
  top: -17px;
  border-radius: 50% 50% 0 0;
}
@keyframes lds-heart {
  0% {
    transform: scale(0.95);
  }
  5% {
    transform: scale(1.1);
  }
  39% {
    transform: scale(0.85);
  }
  45% {
    transform: scale(1);
  }
  60% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(0.9);
  }
}
</style>
