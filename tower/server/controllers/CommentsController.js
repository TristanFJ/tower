import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService'
import BaseController from '../utils/BaseController'

export class CommentsController extends BaseController {
  constructor() {
    super('/api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:commentId/:clientId', this.remove)
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
      const clientId = 'RhH4WBOfK3'
      req.body.creatorId = userId
      await commentsService.remove(commentId, userId)
      res.send('deleted comment')
    } catch (e) {
      next(e)
    }
  }
}
