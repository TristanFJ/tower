import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentsService {
  async getEventComments(query = {}) {
    const comments = await dbContext.Comments.find(query)
      .populate('creator event', 'name picture')

    return comments
  }

  async getById(id) {
    const comment = await dbContext.Comments.findById(id)
      .populate('creator event', 'name picture')

    if (!comment) {
      throw new BadRequest('invalid id')
    }

    return comment
  }

  async create(body) {
    const newComment = await dbContext.Comments.create(body)
    return await this.getById(newComment.id)
  }

  async remove(commentId, userId) {
    const comment = await this.getById(commentId)
    if (comment.creatorId.toString() !== userId) {
      throw new BadRequest('ACCESS DENIED')
    }
    await dbContext.Comments.findByIdAndDelete(commentId)
  }
}

export const commentsService = new CommentsService()
