<template>
  <div class="comment m-2 border border-dark p-2">
    <h5>
      <img :src="comment.creator.picture" width="50" alt="" />
      {{ comment.creator.name }}
    </h5>
    <p>{{ comment.body }}</p>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  props: { comment: { type: Object, required: true } },
  setup(props) {
    return {
      comments: computed(() => AppState.comments)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>