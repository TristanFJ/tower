<template>
  <div class="comment m-2 border border-dark p-2">
    <h5>
      <img
        :title="comment.creator.name"
        :src="comment.creator.picture"
        width="50"
        alt=""
      />
      {{ comment.creator.name
      }}<i
        @click="remove()"
        v-if="account.id == active.creatorId"
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
import { useRoute } from "vue-router"
export default {
  props: { comment: { type: Object, required: true } },
  setup(props) {
    const route = useRoute()

    return {
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),
      active: computed(() => AppState.events.find(e => e.id == route.params.eventId)),


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