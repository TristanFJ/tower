import { commentsService } from '../services/CommentsService'
import BaseController from '../utils/BaseController'

export class CommentsController extends BaseController {
  constructor() {
    super('')
    this.router
      .post('/api/comments', this.create)
      .get('/api/events/:eventId/comments', this.getEventComments)
      .delete('/api/comments/:commentId', this.remove)
  }

  async getEventComments(req, res, next) {
    try {
      const query = req.params
      const comments = await commentsService.getEventComments(query)
      return res.send(comments)
    } catch (e) {
      next(e)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.create(req.body)
      return res.send(comment)
    } catch (e) {
      next(e)
    }
  }

  async remove(req, res, next) {
    try {
      const userId = req.userInfo.id
      const commentId = req.params.commentId
      req.body.creatorId = userId
      await commentsService.remove(commentId, userId)
      res.send('deleted comment')
    } catch (e) {
      next(e)
    }
  }
}
