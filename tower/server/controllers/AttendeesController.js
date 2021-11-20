import { Auth0Provider } from '@bcwdev/auth0provider'
import { attendeesService } from '../services/AttendeesService'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'

export class AttendeesController extends BaseController {
  constructor() {
    super('api/attendees')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .get('/account/attendees', this.getMyAttendance)
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

  async create(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      req.body.id = req.params.id
      const attendant = await attendeesService.create(req.body)
      return res.send(attendant)
    } catch (e) {
      next(e)
    }
  }
}
