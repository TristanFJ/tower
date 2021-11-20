import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { AttendantSchema } from '../models/Attendant'
import { EventSchema } from '../models/Event'
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');

  Events = mongoose.model('Event', EventSchema, 'events')

  Attendees = mongoose.model('Attendant', AttendantSchema, 'attendees')
}

export const dbContext = new DbContext()
