import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"



class CommentsService {
  async getAll(query = '') {
    const res = await api.get(query)
    logger.log('comments', res)
    AppState.comments = res.data
  }

  async createComment(data) {
    Pop.toast('created', 'success')
    const res = await api.post('api/comments', data)
    AppState.comments.push(res.data)
  }
}

export const commentsService = new CommentsService()