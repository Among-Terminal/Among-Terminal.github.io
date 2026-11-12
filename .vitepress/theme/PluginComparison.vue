<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  before: { type: String, required: true },
  after: { type: String, required: true },
  beforeAlt: { type: String, default: 'Without the plugin' },
  afterAlt: { type: String, default: 'With the plugin' },
  caption: { type: String, default: '' },
})

const showAfter = ref(false)
const playing = ref(false)
let timer = null

function schedule() {
  if (timer) clearInterval(timer)
  timer = null
  if (!playing.value) return
  timer = setInterval(() => {
    showAfter.value = !showAfter.value
  }, 2000)
}

function toggle() {
  playing.value = !playing.value
  schedule()
}

onMounted(() => {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    playing.value = true
    schedule()
  }
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <figure class="plugin-comparison">
    <div class="comparison-frame">
      <div
        class="comparison-layer comparison-before"
        :class="{ hidden: showAfter }"
      >
        <img class="comparison-image" :src="props.before" :alt="props.beforeAlt">
        <span class="comparison-tag comparison-tag-before">Without</span>
      </div>
      <div
        class="comparison-layer comparison-after"
        :class="{ visible: showAfter }"
      >
        <img class="comparison-image" :src="props.after" :alt="props.afterAlt">
        <span class="comparison-tag comparison-tag-after">With plugin</span>
      </div>
      <button
        type="button"
        class="comparison-toggle"
        :aria-label="playing ? 'Pause the plugin comparison' : 'Play the plugin comparison'"
        @click="toggle"
      >
        {{ playing ? 'Pause' : 'Play' }}
      </button>
    </div>
    <figcaption v-if="props.caption">{{ props.caption }}</figcaption>
  </figure>
</template>
