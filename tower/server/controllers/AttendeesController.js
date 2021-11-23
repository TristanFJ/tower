import { Auth0Provider } from '@bcwdev/auth0provider'
import { attendeesService } from '../services/AttendeesService'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'

export class AttendeesController extends BaseController {
  constructor() {
    super('/api/attendees')
    this.router
      // NOTE the super shouldn't be empty, the account/attendees shouldn't be in here
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:attendeeId', this.remove)
  }

  async getMyEvents(req, res, next) {
    try {
      const query = req.userInfo.id
      const myAttendance = await attendeesService.getMyEvents(query)
      return res.send(myAttendance)
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

  async remove(req, res, next) {
    try {
      await attendeesService.remove(req.params.attendeeId, req.userInfo.id)
      return res.send({ message: 'Removed Attendee' })
    } catch (e) {
      next(e)
    }
  }
}
