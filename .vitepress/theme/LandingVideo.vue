<script setup>
import { ref } from 'vue'

const video = ref(null)
const started = ref(false)

async function play() {
  if (!video.value) return
  video.value.muted = false
  video.value.volume = 1
  started.value = true
  try {
    await video.value.play()
    video.value.focus()
  } catch {
    started.value = false
  }
}

function reset() {
  started.value = false
  if (video.value) {
    video.value.pause()
    video.value.currentTime = 0
  }
}
</script>

<template>
  <div class="landing-player" :class="{ started }">
    <video
      ref="video"
      class="landing-player-video"
      src="/media/app/overview.mp4"
      poster="/media/app/overview-poster.png"
      preload="metadata"
      playsinline
      :controls="started"
      @ended="reset"
    ></video>
    <button
      v-if="!started"
      type="button"
      class="landing-play"
      aria-label="Play the Among Terminal overview with sound"
      @click="play"
    >
      <span class="landing-play-icon" aria-hidden="true"></span>
      <span class="landing-play-label">Watch the overview</span>
    </button>
  </div>
</template>
