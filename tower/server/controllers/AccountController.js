import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { attendeesService } from '../services/AttendeesService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/attendees', this.getMyEvents)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
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
}
