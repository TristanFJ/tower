<template>
  <button @click="type = ''" class="btn btn-primary m-1">
    <h6>All</h6>
  </button>

  <button @click="type = 'concert'" class="btn btn-primary m-1">
    <h6>Concert</h6>
  </button>

  <button @click="type = 'convention'" class="btn btn-primary m-1">
    <h6>Convention</h6>
  </button>

  <button @click="type = 'sport'" class="btn btn-primary m-1">
    <h6>Sport</h6>
  </button>

  <button @click="type = 'digital'" class="btn btn-primary m-1">
    <h6>Digital</h6>
  </button>

  <div class="container-fluid text-center">
    <div class="row px-2">
      <Event
        v-for="event in events"
        class=""
        :key="event.id"
        :event="event"
        @click="routeTo(event.id)"
        :class="
          event.capacity === 0 || event.isCanceled
            ? 'border border-danger'
            : 'border border-success'
        "
      />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import { eventsService } from '../services/EventsService'
import Pop from "../utils/Pop"
import { AppState } from "../AppState"
import { router } from "../router"
export default {
  name: 'Home',


  setup() {
    const type = ref('')

    onMounted(async () => {
      try {
        // await eventsService.getAll('api/events' + AppState.filter)

        await eventsService.getAll('api/events')
      } catch (error) {
        logger.log(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      // events: computed(() => AppState.events),
      type,

      events: computed(() => {

        let events = AppState.events
        if (type.value === 'concert') {
          events = events.filter(e => e.type == type.value)
        }
        if (type.value === 'convention') {
          events = events.filter(e => e.type == type.value)
        }
        if (type.value === 'sport') {
          events = events.filter(e => e.type == type.value)
        }
        if (type.value === 'digital') {
          events = events.filter(e => e.type == type.value)
        }


        return events
      }),


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
