import { AppState } from '../AppState'
import { Profile } from '../Models/Profile.js'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async editProfile(pro) {
    const res = await api.put('/account', pro)
    logger.log('edit profile', res)
    AppState.account = new Profile(res.data)
  }
}

export const accountService = new AccountService()
