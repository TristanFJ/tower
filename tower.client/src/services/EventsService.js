import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";


class EventsService {
  async getAll(query = '') {
    const res = await api.get(query)
    logger.log(res)
    // NOTE paginated
    // AppState.events = res.data.results
    AppState.events = res.data
  }
}
export const eventsService = new EventsService()