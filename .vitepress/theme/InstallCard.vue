<script setup>
import { computed, ref } from 'vue'

const packages = [
  {
    id: 'deb',
    label: 'Debian / Ubuntu',
    file: (arch) => `among-terminal-ubuntu24.04-${arch}.deb`,
    command: (file) => `sudo apt install ./${file}`,
    note: 'Ubuntu 24.04. Debian 13 uses the debian13 package.',
  },
  {
    id: 'rpm',
    label: 'Fedora',
    file: (arch) => `among-terminal-fedora44-${arch}.rpm`,
    command: (file) => `sudo dnf install ./${file}`,
    note: 'Fedora 44. Fedora 43 uses the fedora43 package.',
  },
  {
    id: 'appimage',
    label: 'AppImage',
    file: (arch) => `among-terminal-${arch}.AppImage`,
    command: (file) => `chmod +x ${file} && ./${file}`,
    note: 'Needs glibc 2.39 or newer. The host libraries are listed in the guide.',
  },
  {
    id: 'archive',
    label: 'Archive',
    file: (arch) => `among-terminal-ubuntu24.04-${arch}.tar.gz`,
    command: (file) =>
      `mkdir -p ~/among && tar -xzf ${file} -C ~/among && ~/among/bin/among`,
    note: 'Ubuntu 24.04 archive. Debian 13 uses the debian13 archive.',
  },
]

const arch = ref('amd64')
const selected = ref('deb')
const copied = ref('')

const active = computed(() => packages.find((item) => item.id === selected.value))
const fileName = computed(() => active.value.file(arch.value))
const command = computed(() => active.value.command(fileName.value))
const download = computed(
  () => `https://github.com/Among-Terminal/among/releases/latest/download/${fileName.value}`,
)
const checksum =
  'sha256sum --check --ignore-missing SHA256SUMS'

async function copy(text, key) {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = key
    window.setTimeout(() => {
      if (copied.value === key) copied.value = ''
    }, 1600)
  } catch {
    copied.value = ''
  }
}
</script>

<template>
  <section class="install-card" aria-labelledby="install-heading">
    <div class="install-head">
      <div>
        <p class="install-eyebrow">Linux · 0.2.0</p>
        <h2 id="install-heading">Install Among Terminal</h2>
      </div>
      <div class="install-arch" role="group" aria-label="Processor">
        <button
          v-for="value in ['amd64', 'arm64']"
          :key="value"
          type="button"
          class="install-chip"
          :class="{ active: arch === value }"
          :aria-pressed="arch === value"
          @click="arch = value"
        >
          {{ value === 'amd64' ? 'x86-64' : 'ARM64' }}
        </button>
      </div>
    </div>

    <div class="install-tabs" role="tablist" aria-label="Package type">
      <button
        v-for="item in packages"
        :key="item.id"
        type="button"
        class="install-tab"
        :class="{ active: selected === item.id }"
        role="tab"
        :aria-selected="selected === item.id"
        @click="selected = item.id"
      >
        {{ item.label }}
      </button>
    </div>

    <div class="install-rows">
      <div class="install-row">
        <span class="install-label">Package</span>
        <code class="install-value">{{ fileName }}</code>
        <a class="install-download" :href="download">Download</a>
      </div>
      <div class="install-row">
        <span class="install-label">Command</span>
        <code class="install-value">{{ command }}</code>
        <button type="button" class="install-copy" @click="copy(command, 'command')">
          {{ copied === 'command' ? 'Copied' : 'Copy' }}
        </button>
      </div>
      <div class="install-row">
        <span class="install-label">Verify</span>
        <code class="install-value">{{ checksum }}</code>
        <button type="button" class="install-copy" @click="copy(checksum, 'checksum')">
          {{ copied === 'checksum' ? 'Copied' : 'Copy' }}
        </button>
      </div>
    </div>
    <p class="install-note">{{ active.note }}</p>
    <p class="install-more">
      <a href="/install/">Full installation guide</a> ·
      <a href="https://github.com/Among-Terminal/among/releases/latest/download/SHA256SUMS">SHA256SUMS</a>
    </p>
  </section>
</template>
