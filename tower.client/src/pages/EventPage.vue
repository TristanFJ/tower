<template>
  <div
    :class="active.capacity == 0 ? 'bg-danger' : ''"
    class="eventDetails"
    v-if="active"
  >
    <img :src="active.coverImg" height="200" class="m-2" alt="" />
    <div class="col-md-1 p-0">
      <i
        v-if="account.id == active.creatorId && !active.isCanceled"
        class="selectable mdi mdi-pencil m-3"
        data-bs-toggle="modal"
        :data-bs-target="'#edit-' + active.id"
        title="Edit"
        aria-label="Edit event"
      ></i>

      <i
        v-if="account.id == active.creatorId && !active.isCanceled"
        class="selectable mdi mdi-trash-can bg-danger rounded m-3"
        title="Cancel"
        aria-label="Cancel event"
        @click="cancel()"
      ></i>

      <button
        @click="attend()"
        v-if="!active.isCanceled && active.capacity > 0"
        class="btn btn-success m-3"
        :disabled="
          !account.id || hasAttended || active.capacity < 1 || active.isCanceled
        "
      >
        Attend
      </button>

      <div :id="'edit-' + active.id" class="modal" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit event</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="edit()">
                <div class="row">
                  <div class="col-8">
                    <input
                      v-model="state.editable.name"
                      type="text"
                      class="form-control"
                      placeholder="Event Name"
                      aria-label="Example text with button addon"
                      aria-describedby="button-addon1"
                      required
                    />
                  </div>
                  <div class="col-4">
                    <input
                      v-model="state.editable.location"
                      type="text"
                      class="form-control"
                      placeholder="Location"
                      aria-label="Example text with button addon"
                      aria-describedby="button-addon1"
                      required
                    />
                  </div>
                  <div class="col-4">
                    <input
                      v-model="state.editable.capacity"
                      type="number"
                      class="form-control"
                      placeholder="Capacity"
                      aria-label="Example text with button addon"
                      aria-describedby="button-addon1"
                      required
                    />
                  </div>
                  <div class="col-4">
                    <input
                      v-model="state.editable.type"
                      type="text"
                      class="form-control"
                      placeholder="Type"
                      aria-label="Example text with button addon"
                      aria-describedby="button-addon1"
                      required
                    />
                  </div>
                  <div class="col-4">
                    <input
                      v-model="state.editable.description"
                      type="text"
                      class="form-control"
                      placeholder="Description"
                      aria-label="Example text with button addon"
                      aria-describedby="button-addon1"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  class="btn btn-primary m-1"
                  @submit.prevent="edit()"
                >
                  edit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
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
import { computed, onMounted, reactive, watchEffect } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import { eventsService } from "../services/EventsService"
import { AppState } from "../AppState"
import { useRoute } from "vue-router"
import { commentsService } from '../services/CommentsService'
import { attendeesService } from '../services/AttendeesService'
import { router } from "../router"
export default {
  // props: { event: { type: Object, required: true } },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      editable: {},
    })
    onMounted(async () => {
      try {
        await eventsService.getAll('api/events/')
        await attendeesService.getAll('api/events/' + route.params.eventId + '/attendees')
        await commentsService.getAll('api/events/' + route.params.eventId + '/comments')
      } catch (e) {
        logger.log(e)
      }
    })

    return {
      state,
      active: computed(() => AppState.events.find(e => e.id == route.params.eventId)),
      events: computed(() => AppState.events),
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),
      hasAttended: computed(() => {
        const found = AppState.attendees.find(a => a.accountId === AppState.account.id)
        return found ? true : false
      }),


      async createComment() {
        try {
          state.editable.eventId = route.params.eventId
          await commentsService.createComment(state.editable)
          // logger.log(state.editable)
          state.editable = {}
        } catch (error) {
          logger.error(error)
        }
      },

      async edit() {
        try {
          await eventsService.edit(route.params.eventId, state.editable)
          state.editable = {}
        } catch (error) {
          logger.error(error)
        }
      },

      async cancel() {

        try {
          await eventsService.cancel(route.params.eventId)
          router.push({
            name: "Home"
          })
        } catch (error) {
          logger.error(error)
        }
      },



      async attend() {
        try {
          let data = {}
          data.eventId = route.params.eventId
          data.accountId = this.account.id
          await eventsService.attend(data)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>