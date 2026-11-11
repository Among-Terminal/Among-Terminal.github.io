<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  before: { type: String, required: true },
  after: { type: String, required: true },
  beforeAlt: { type: String, default: 'Without the plugin' },
  afterAlt: { type: String, default: 'With the plugin' },
  caption: { type: String, default: '' },
})

const position = ref(50)
const rangeLabel = computed(
  () => `Reveal the plugin status: ${position.value}% with the plugin`,
)
</script>

<template>
  <figure class="comparison-slider">
    <div class="comparison-frame" :style="{ '--position': `${position}%` }">
      <img class="comparison-before" :src="props.before" :alt="props.beforeAlt">
      <div class="comparison-after">
        <img :src="props.after" :alt="props.afterAlt">
      </div>
      <span class="comparison-tag comparison-tag-before">Without</span>
      <span class="comparison-tag comparison-tag-after">With plugin</span>
      <span class="comparison-handle" aria-hidden="true"></span>
      <input
        v-model.number="position"
        class="comparison-range"
        type="range"
        min="0"
        max="100"
        step="1"
        :aria-label="rangeLabel"
      >
    </div>
    <figcaption v-if="props.caption">{{ props.caption }}</figcaption>
  </figure>
</template>
