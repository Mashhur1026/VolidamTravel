import axios from 'axios'

export default class PaymeServices {
  constructor(endpoint, id, key) {
    this.endpoint = endpoint
    this.id = id
    this.key = key

    this.cardsConfig = {
      headers: {
        'X-Auth': `${id}`,
      },
    }
    this.receiptConfig = {
      headers: {
        'X-Auth': `${id}:${key}`,
      },
    }
  }

  async createCard(id, cardNumber, cardExpire) {
    const data = {
      id,
      method: 'cards.create',
      params: {
        card: { number: cardNumber, expire: cardExpire },
        save: true,
      },
    }

    let request = await axios.post(this.endpoint, data, this.cardsConfig)

    return request.data
  }

  async getVerifyCode(id, token) {
    const data = {
      id,
      method: 'cards.get_verify_code',
      params: {
        token,
      },
    }

    let request = await axios.post(this.endpoint, data, this.cardsConfig)

    return request.data
  }

  async verifyCode(id, token, code) {
    const data = {
      id,
      method: 'cards.verify',
      params: {
        token,
        code,
      },
    }

    let request = await axios.post(this.endpoint, data, this.cardsConfig)

    return request.data
  }

  async check(id, token) {
    const data = {
      id,
      method: 'cards.check',
      params: {
        token,
      },
    }

    let request = await axios.post(this.endpoint, data, this.cardsConfig)

    return request.data
  }

  async remove(id, token) {
    const data = {
      id,
      method: 'cards.remove',
      params: {
        token,
      },
    }

    let request = await axios.post(this.endpoint, data, this.cardsConfig)

    return request.data
  }

  async createReceipt(id, amount, account, detail) {
    const data = {
      id,
      method: 'receipts.create',
      params: {
        amount,
        account,
        detail,
      },
    }

    let request = await axios.post(this.endpoint, data, this.receiptConfig)

    return request.data
  }

  async payReceipt(id, receiptId, token, payer) {
    const data = {
      id,
      method: 'receipts.pay',
      params: {
        id: receiptId,
        token,
        payer,
      },
    }

    let request = await axios.post(this.endpoint, data, this.receiptConfig)

    return request.data
  }
  async sendReceipt(id, receiptId, phone) {
    const data = {
      id,
      method: 'receipts.send',
      params: {
        id: receiptId,
        phone,
      },
    }

    let request = await axios.post(this.endpoint, data, this.receiptConfig)

    return request.data
  }
}
