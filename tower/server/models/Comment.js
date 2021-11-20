import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const CommentSchema = new Schema({
  eventId: { type: ObjectId, required: true },
  creatorId: { type: ObjectId, required: true },
  body: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

CommentSchema.virtual('event', {
  localField: 'eventId',
  ref: 'Event',
  foreignField: '_id',
  justOne: true
})

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})
