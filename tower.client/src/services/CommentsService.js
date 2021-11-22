import { applyStyles } from "@popperjs/core"
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

  async remove(id) {
    const yes = await Pop.confirm('delete?')
    if (!yes) { return }
    await api.delete('api/comments/' + id)
    AppState.comments = AppState.comments.filter(c => c.id !== id)
  }

}

export const commentsService = new CommentsService()