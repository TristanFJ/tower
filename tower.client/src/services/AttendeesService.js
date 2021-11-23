import { AppState } from "../AppState"
import { api } from "./AxiosService"


class AttendeesService {
  async getAll(query = '') {
    const res = await api.get(query)
    AppState.attendees = res.data
  }
}
export const attendeesService = new AttendeesService()