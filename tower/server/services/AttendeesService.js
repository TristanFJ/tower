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
    const foundEvent = await dbContext.Events.findById(body.eventId)
    logger.log(foundEvent)
    // TODO can't get event by id. Don't know how to check if attending or reduce capacity without this. My get event by id test passes, but it returns undefined in the event. Very confused
    const newAttendant = await dbContext.Attendees.create(body)
    await newAttendant.populate('account event')
    logger.log('newAttendant', newAttendant)
    // TODO decrease attendance capacity
    return await this.getById(newAttendant.id)
  }

  async remove(attendeeId, userId) {
    const attendee = await this.getById(attendeeId)
    if (attendee.id.toString() !== userId) {
      throw new BadRequest('ACCESS DENIED')
    }
    await dbContext.Attendees.findByIdAndDelete(attendeeId)
  }
}

export const attendeesService = new AttendeesService()
