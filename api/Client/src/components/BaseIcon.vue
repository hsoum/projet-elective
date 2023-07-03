<template>
  <div v-html="iconSvg" :style="styleObject"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { IconStyleObject } from '@/types'

import feather from 'feather-icons'

export default defineComponent({
  name: 'base-icon',
  props: {
    name: {
      type: String,
      required: true,
      validator: (value: string) => {
        return !!feather.icons[value]
      },
    },
    size: {
      type: Number,
      default: 22,
    },
  },
  data() {
    return {
      styleObject: {
        width: `${this.size}px`,
        height: `${this.size}px`,
      } as IconStyleObject,
    }
  },
  computed: {
    iconSvg(): string {
      return feather.icons[this.name].toSvg({
        width: this.size,
        height: this.size,
      })
    },
  },
})
</script>
