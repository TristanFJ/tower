import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { logger } from '../utils/Logger'

class AttendeesService {
  async getMyAttendance(query = {}) {
    const myAttendance = await dbContext.Events.find(query)
      .populate('creator', 'name picture')
    return myAttendance
  }

  async getById(id) {
    const attendant = await dbContext.Attendees.findById(id)
      .populate('account', 'name picture')
    if (!attendant) {
      throw new BadRequest('invalid id')
    }
    return attendant
  }

  async create(body) {
    const newAttendant = await dbContext.Attendees.create(body)
    await newAttendant.populate('account event')
    logger.log('newAttendant', newAttendant)
    // TODO decrease attendance capacity
    return await this.getById(newAttendant.id)
  }
}

export const attendeesService = new AttendeesService()
