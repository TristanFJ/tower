import { logger } from '../utils/Logger'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { eventsService } from '../services/EventsService'

export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .post('', this.create)
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const events = await eventsService.getAll(query)
      logger.log('events controller get all', events)
      return res.send(events)
    } catch (e) {
      next(e)
    }
  }

  async getById(req, res, next) {
    try {
      const event = await eventsService.getById(req.params.id)
      return res.send(event)
    } catch (e) {
      next(e)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const newEvent = await eventsService.create(req.body)
      logger.log('events controller create event', newEvent)
      return res.send(newEvent)
    } catch (e) {
      next(e)
    }
  }
}
