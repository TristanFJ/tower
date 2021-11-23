import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { api } from "./AxiosService";


class EventsService {
  async getAll(query = '') {
    const res = await api.get(query)
    logger.log(res)
    // NOTE paginated
    // AppState.events = res.data.results
    AppState.events = res.data
  }

  async createEvent(data) {
    Pop.toast('created', 'success')
    const res = await api.post('api/events', data)
    AppState.events.unshift(res.data)
    AppState.activeEvent = res.data
  }

  async edit(id, data) {
    const res = await api.put('api/events/' + id, data)
    logger.log(res)
    const index = AppState.events.findIndex(e => e.id === res.data.id)
    AppState.events.splice(index, 1, res.data)
  }

  async cancel(id) {

    const yes = await Pop.confirm('cancel?')
    if (!yes) { return }
    await api.delete('api/events/' + id)
    AppState.events = AppState.events.filter(e => e.id !== id)
    AppState.activeEvent = {}
  }

  async attend(data) {
    const res = await api.post('api/attendees/', data)
    logger.log(res)
    AppState.attendees.push(res.data)
  }
}
export const eventsService = new EventsService()