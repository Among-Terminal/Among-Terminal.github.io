<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const dialog = ref(null)
const closeButton = ref(null)
const source = ref('')
const alt = ref('')
let trigger = null
let addedTabIndex = false

function open(event) {
  if (event.defaultPrevented || event.button !== 0) return
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  const target = event.target
  if (!(target instanceof Element)) return
  const image = target.closest('img')
  if (!image || !image.closest('.vp-doc, .showcase')) return
  const anchor = image.closest('a')
  if (anchor) {
    const href = anchor.getAttribute('href') || ''
    if (!/\.(?:png|jpe?g|gif|webp|svg|avif)(?:[?#]|$)/i.test(href)) return
  }
  event.preventDefault()
  source.value = image.currentSrc || image.src
  alt.value = image.alt || ''
  trigger = anchor || image
  if (!anchor) {
    image.setAttribute('tabindex', '-1')
    addedTabIndex = true
  }
  dialog.value.showModal()
  document.body.classList.add('media-preview-open')
  nextTick(() => closeButton.value?.focus())
}

function close() {
  dialog.value?.close()
}

function onClose() {
  document.body.classList.remove('media-preview-open')
  trigger?.focus({ preventScroll: true })
  if (addedTabIndex) {
    trigger?.removeAttribute('tabindex')
    addedTabIndex = false
  }
  trigger = null
}

function onBackdrop(event) {
  if (event.target === dialog.value) close()
}

onMounted(() => document.addEventListener('click', open, true))
onBeforeUnmount(() => {
  document.removeEventListener('click', open, true)
  document.body.classList.remove('media-preview-open')
})
</script>

<template>
  <dialog
    ref="dialog"
    class="media-preview"
    aria-label="Image preview"
    @close="onClose"
    @click="onBackdrop"
  >
    <button
      ref="closeButton"
      type="button"
      class="media-preview-close"
      aria-label="Close image preview"
      @click="close"
    >
      ×
    </button>
    <img v-if="source" :src="source" :alt="alt">
    <p v-if="alt" class="media-preview-caption">{{ alt }}</p>
  </dialog>
</template>
