import { logger } from '../utils/Logger'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { eventsService } from '../services/EventsService'
import { BadRequest } from '../utils/Errors'
import { attendeesService } from '../services/AttendeesService'
import { commentsService } from '../services/CommentsService'

export class EventsController extends BaseController {
  constructor() {
    super('/api/events')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:eventId/attendees', this.getEventAttendance)
      .get('/:eventId/comments', this.getEventComments)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.cancel)
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

  async getEventAttendance(req, res, next) {
    try {
      const attendance = await attendeesService.getEventAttendance({ eventId: req.params.eventId })
      return res.send(attendance)
    } catch (e) {
      next(e)
    }
  }

  async getEventComments(req, res, next) {
    try {
      const query = req.params
      const comments = await commentsService.getEventComments(query)
      return res.send(comments)
    } catch (e) {
      next(e)
    }
  }

  async getById(req, res, next) {
    try {
      const foundEvent = await eventsService.getById(req.params.id)
      return res.send(foundEvent)
    } catch (e) {
      next(e)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.accountId = req.userInfo.id
      const newEvent = await eventsService.create(req.body)
      logger.log('events controller create event', newEvent)
      return res.send(newEvent)
    } catch (e) {
      next(e)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      req.body.isCanceled = false
      const editedEvent = await eventsService.edit(req.body)
      return res.send(editedEvent)
    } catch (e) {
      next(e)
    }
  }

  async cancel(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      req.body.isCanceled = true
      const editedEvent = await eventsService.edit(req.body)
      return res.send(editedEvent)
    } catch (e) {
      next(e)
    }
  }
}
