<template>
  <div class="comment m-2 border border-dark p-2">
    <h5>
      <img :src="comment.creator.picture" width="50" alt="" />
      {{ comment.creator.name
      }}<i
        @click="remove()"
        class="
          selectable
          bg-danger
          mdi mdi-close
          rounded-circle
          align-self-center
          p-0
          m-5
        "
        title="remove"
      ></i>
    </h5>
    <p>
      {{ comment.body }}
    </p>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { commentsService } from "../services/CommentsService"
export default {
  props: { comment: { type: Object, required: true } },
  setup(props) {
    return {
      comments: computed(() => AppState.comments),

      async remove() {
        try {
          const commentId = props.comment.id
          logger.log(commentId)
          await commentsService.remove(commentId)
        } catch (e) {
          logger.log(e)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>