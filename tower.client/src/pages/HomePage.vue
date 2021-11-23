<template>
  <div class="container-fluid text-center">
    <div class="row px-2">
      <Event
        v-for="event in events"
        class="my-1"
        :key="event.id"
        :event="event"
        @click="routeTo(event.id)"
        :class="event.capacity == 0 || event.isCanceled ? 'bg-warning' : ''"
      />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import { eventsService } from '../services/EventsService'
import Pop from "../utils/Pop"
import { AppState } from "../AppState"
import { router } from "../router"
export default {
  name: 'Home',


  setup() {
    onMounted(async () => {
      try {
        await eventsService.getAll('api/events')
      } catch (error) {
        logger.log(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      events: computed(() => AppState.events),

      routeTo(id) {
        router.push({
          name: "Event",
          params: { eventId: id }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
