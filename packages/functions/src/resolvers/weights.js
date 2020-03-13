import dayjs from 'dayjs'

import { collection } from '../models/weights'

export default (root, { filter: { date = new Date(), by = 'week' } }) =>
  collection.find({
    date: { $gte: dayjs(date).startOf(by), $lte: dayjs(date).endOf(by) },
  })
