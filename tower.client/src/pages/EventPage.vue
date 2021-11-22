<template>
  <div class="eventDetails">
    <img :src="active.coverImg" height="200" class="m-2" alt="" />
    <h1 class="m-2">{{ active.name }}</h1>
    <h4 class="m-2">{{ active.location }}, {{ active.capacity }} spots left</h4>
    <h5 class="m-2">Event Type: {{ active.type }}</h5>
    <p class="m-4">{{ active.description }}</p>
    <p class="m-2">Begins {{ new Date(active.startDate) }}</p>
  </div>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import { eventsService } from "../services/EventsService"
import { AppState } from "../AppState"
import { useRoute } from "vue-router"
export default {
  setup() {
    const route = useRoute()
    return {
      active: computed(() => AppState.events.find(e => e.id == route.params.eventId))
    }
  }
}
</script>


<style lang="scss" scoped>
</style>