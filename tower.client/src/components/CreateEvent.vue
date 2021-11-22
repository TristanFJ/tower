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
            <form @submit.prevent="createEvent">
              <input
                class="form-control"
                v-model="state.editable.name"
                type="text"
                placeholder="Event name"
              />

              <input
                class="form-control"
                v-model="state.editable.startDate"
                type="text"
                placeholder="Start date"
              />
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save</button>
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
export default {
  setup() {
    const state = reactive({
      editable: {},
    })
    return {
      state,
      async createEvent() {
        try {
          // await eventsService.createEvent(state.editable)
          logger.log(state.editable)
          state.editable = {}
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