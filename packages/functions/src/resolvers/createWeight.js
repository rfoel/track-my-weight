import dayjs from 'dayjs'

import { collection } from '../models/weights'

export default (root, { input }) => {
  const { date, weight } = input

  return collection.findOneAndUpdate(
    {
      date: { $gte: dayjs(date).startOf('day'), $lte: dayjs(date).endOf('day') },
    },
    { date, weight },
    { returnOriginal: false, upsert: true },
  )
}
