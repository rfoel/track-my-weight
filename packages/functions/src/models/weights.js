import mongoose from 'mongoose'

const { Schema, model } = mongoose

export const schema = new Schema(
  {
    date: Date,
    weight: Number,
  },
  { timestamps: true },
)

export const collection = model('weights', schema)
