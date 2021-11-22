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
    AppState.events.push(res.data)
    AppState.activeEvent = res.data
  }
}
export const eventsService = new EventsService()