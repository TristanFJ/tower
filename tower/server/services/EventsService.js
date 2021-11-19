import { dbContext } from '../db/DbContext'
import { logger } from '../utils/Logger'
import { BadRequest, Forbidden } from '../utils/Errors'

class EventsService {
  async getAll(query = {}) {
    const res = await dbContext.Events.find({}).populate('creator', 'name picture')
    logger.log(res)
    return res
  }

  async getById(id) {
    const found = await dbContext.Events.findById(id).populate('creator', 'name picture')
    if (!found) {
      throw new BadRequest('invalid id good sir')
    }
    return found
  }

  async create(body) {
    const newEvent = await dbContext.Events.create(body)
    logger.log('eventsService', newEvent)
    return await this.getById(newEvent.id)
  }

  async edit(body) {
    const event = await this.getById(body.id)
    if (event.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('ACCESS DENIED')
    }
    const editedEvent = dbContext.Events.findByIdAndUpdate(body.id, body)
    return editedEvent
  }
}

export const eventsService = new EventsService()
