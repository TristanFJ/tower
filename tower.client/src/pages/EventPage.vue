<template>
  <div class="eventDetails" v-if="active">
    <img :src="active.coverImg" height="200" class="m-2" alt="" />
    <h1 class="m-2">{{ active.name }}</h1>
    <h4 class="m-2">{{ active.location }}, {{ active.capacity }} spots left</h4>
    <h5 class="m-2">Event Type: {{ active.type }}</h5>
    <p class="m-4">{{ active.description }}</p>
    <p class="m-2">Begins {{ new Date(active.startDate) }}</p>
  </div>
  <form @submit.prevent="createComment()">
    <input
      class="form-control w-25"
      v-model="state.editable.body"
      type="text"
      placeholder="comment"
    />
  </form>

  <Comment v-for="comment in comments" :key="comment.id" :comment="comment" />
</template>


<script>
import { computed, onMounted, reactive } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import { eventsService } from "../services/EventsService"
import { AppState } from "../AppState"
import { useRoute } from "vue-router"
import { commentsService } from '../services/CommentsService'
export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      editable: {},
    })
    onMounted(async () => {
      try {
        await commentsService.getAll('api/events/' + route.params.eventId + '/comments')
      } catch (e) {
        logger.log(e)
      }
    })


    return {
      state,
      active: computed(() => AppState.events.find(e => e.id == route.params.eventId)),
      comments: computed(() => AppState.comments),

      async createComment() {
        try {
          state.editable.eventId = route.params.eventId
          await commentsService.createComment(state.editable)
          // logger.log(state.editable)
          state.editable = {}
        } catch (error) {
          logger.log(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>