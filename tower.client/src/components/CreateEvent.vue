<template>
  <div class="createEvent text-dark">
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary btn-lg"
      data-bs-toggle="modal"
      data-bs-target="#create"
    >
      Create Event
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="create"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create New Event</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createEvent()">
              <input
                class="form-control"
                v-model="state.editable.name"
                type="text"
                placeholder="Event name"
              />
              <input
                class="form-control"
                v-model="state.editable.description"
                type="text"
                placeholder="Description"
              />
              <input
                class="form-control"
                v-model="state.editable.coverImg"
                type="text"
                placeholder="coverImg"
              />
              <input
                class="form-control"
                v-model="state.editable.location"
                type="text"
                placeholder="Location"
              />
              <input
                class="form-control"
                v-model="state.editable.capacity"
                type="number"
                placeholder="Capacity"
              />
              <input
                class="form-control"
                v-model="state.editable.startDate"
                type="date"
                placeholder="Start date"
              />
              <input
                class="form-control"
                v-model="state.editable.type"
                type="text"
                placeholder="'concert', 'convention', 'sport', 'digital'"
              />
              <div class="modal-footer">
                <button class="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>

                <button
                  type="submit"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  @click.prevent="createEvent()"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { reactive } from "@vue/reactivity"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { eventsService } from "../services/EventsService"
import { useRouter } from "vue-router"
import { AppState } from "../AppState"
export default {
  setup() {
    const router = useRouter()
    const state = reactive({
      editable: {},
    })
    return {
      state,
      async createEvent() {
        try {
          await eventsService.createEvent(state.editable)
          // logger.log(state.editable)
          state.editable = {}
          router.push({
            name: "Event",
            params: { eventId: AppState.activeEvent.id }
          })
        } catch (e) {
          logger.error(e)
          Pop.toast(e.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>