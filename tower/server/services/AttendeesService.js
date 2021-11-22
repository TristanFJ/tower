import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { logger } from '../utils/Logger'

class AttendeesService {
  async getMyEvents(userId) {
    return await dbContext.Attendees.find({ userId }).populate('event')
  }

  async getEventAttendance(query = {}) {
    const myAttendance = await dbContext.Attendees.find(query)
      .populate('account')
    return myAttendance
  }

  async getById(id) {
    const attendant = await dbContext.Attendees.findById(id)
      .populate('account event', 'name picture')
    if (!attendant) {
      throw new BadRequest('invalid id')
    }
    return attendant
  }

  async create(body) {
    const foundEvent = await dbContext.Events.findById(body.eventId)
    logger.log(foundEvent)
    if (foundEvent.isCanceled) {
      throw new BadRequest('event canceled')
    }
    if (foundEvent.capacity < 1) {
      throw new BadRequest('event full')
    }
    foundEvent.capacity = (foundEvent.capacity - 1)
    await foundEvent.save()

    const newAttendant = await dbContext.Attendees.create(body)
    await newAttendant.populate('account event')

    return await this.getById(newAttendant.id)
  }

  async remove(attendeeId, userId) {
    // I need to find the event that the removed attendant is attending so that I can increase the capacity
    const attendee = await this.getById(attendeeId)
    // and then access the event that is populated
    const foundEvent = await dbContext.Events.findById(attendee.eventId)
    // TODO
    // capacity is undefined
    // it might not work because it's a populated event, but I don't know how to get that event without it being a populated

    if (foundEvent.isCanceled) {
      throw new BadRequest('event canceled')
    }
    if (foundEvent.capacity < 1) {
      throw new BadRequest('event full')
    }
    if (foundEvent.creatorId.toString() !== userId) {
      throw new BadRequest('ACCESS DENIED')
    }
    foundEvent.capacity = (foundEvent.capacity + 1)
    await foundEvent.save()
    await dbContext.Attendees.findByIdAndDelete(attendeeId)
  }
}

export const attendeesService = new AttendeesService()
