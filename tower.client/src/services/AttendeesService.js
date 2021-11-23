import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class AttendeesService {
  async getAll(query = '') {
    const res = await api.get(query)
    AppState.attendees = res.data
  }

  async getEventAttendees(eventId) {
    logger.log(eventId)
    const res = await api.get('api/events/' + eventId + '/attendees')
    logger.log(res)
    AppState.attendees = res.data
  }

  // async getMyEvents(query = '') {
  //   const res = await api.get(query)
  //   AppState.myEvents = res.data
  // }
}
export const attendeesService = new AttendeesService()