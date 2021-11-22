import { dbContext } from '../db/DbContext'
import { logger } from '../utils/Logger'
import { BadRequest, Forbidden } from '../utils/Errors'

class EventsService {
  async getAll(query = {}) {
    const res = await dbContext.Events.find({}).populate('creator', 'name picture')
    // const page = query.page || 1
    // delete query.page
    // const totalPages = Math.ceil(await dbContext.Events.count() / 15)
    // const events = await dbContext.Events.find(query).populate('creator', 'name picture').limit(15).skip((page - 1) * 15)
    // return { results: events, page, totalPages }
    return res
  }

  async getById(id) {
    const foundEvent = await dbContext.Events.findById(id).populate('creator', 'name picture')
    if (!foundEvent) {
      throw new BadRequest('invalid id good sir')
    }
    return foundEvent
  }

  async create(body) {
    const newEvent = await dbContext.Events.create(body)
    logger.log('eventsService', newEvent)
    return await this.getById(newEvent.id)
  }

  async edit(body) {
    const foundEvent = await this.getById(body.id)
    if (foundEvent.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('ACCESS DENIED')
    }
    if (foundEvent.isCanceled) {
      throw new BadRequest('already canceled')
    }
    const editedEvent = dbContext.Events.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body)
    return editedEvent
  }
}

export const eventsService = new EventsService()
