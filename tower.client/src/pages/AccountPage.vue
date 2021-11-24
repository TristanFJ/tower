<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    <div class="container-fluid text-center">
      <div class="row px-2">
        <Event
          v-for="e in events"
          :key="e.id"
          :event="e.event"
          @click="routeTo(e.event.id)"
          :class="
            e.event.capacity === 0 || e.event.isCanceled
              ? 'border border-danger'
              : 'border border-success'
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { eventsService } from "../services/EventsService"
import { router } from "../router"
import { AuthService } from "../services/AuthService"
import { attendeesService } from "../services/AttendeesService"
export default {
  name: 'Account',
  setup() {
    onMounted(async () => {
      try {
        await eventsService.getMyEvents()
        // await attendeesService.getMyEvents()
      } catch (error) {
        logger.log(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      account: computed(() => AppState.account),
      events: computed(() => AppState.myEvents),

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

<style scoped>
img {
  max-width: 100px;
}
</style>
