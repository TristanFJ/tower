import { Auth0Provider } from '@bcwdev/auth0provider'
import { attendeesService } from '../services/AttendeesService'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'

export class AttendeesController extends BaseController {
  constructor() {
    super('')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/api/attendees', this.create)
      .get('/account/attendees', this.getMyAttendance)
      .get('/api/events/:eventId/attendees', this.getEventAttendance)
      .delete('api/attendees/:attendeeId', this.remove)
  }

  async getMyAttendance(req, res, next) {
    try {
      const query = req.params
      const myAttendance = await attendeesService.getMyAttendance(query)
      return res.send(myAttendance)
    } catch (e) {
      next(e)
    }
  }

  async getEventAttendance(req, res, next) {
    try {
      req.body.eventId = req.params.eventId
      req.body.creatorId = req.userInfo.id
      const attendance = await attendeesService.getMyAttendance({ eventId: req.body.eventId })
      return res.send(attendance)
    } catch (e) {
      next(e)
    }
  }

  async create(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const attendant = await attendeesService.create(req.body)
      return res.send(attendant)
    } catch (e) {
      next(e)
    }
  }

  // TODO delete attendee passes tests but returns 404
  async remove(req, res, next) {
    try {
      await attendeesService.remove(req.params.attendeeId, req.userInfo.id)
      res.send({ message: 'Removed Attendee' })
    } catch (e) {
      next(e)
    }
  }
}
