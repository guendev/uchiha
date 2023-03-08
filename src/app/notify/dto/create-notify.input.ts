import { Notify } from '~/app/notify/entities/notify.entity'

export interface CreateNotifyInput {
  notifyFired: Omit<Notify, 'id'>
}
