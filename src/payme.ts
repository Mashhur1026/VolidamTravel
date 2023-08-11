import axios, { AxiosResponse } from "axios";

interface CardParams {
  number: string;
  expire: string;
}

interface VerifyCodeParams {
  token: string;
}

interface VerifyParams {
  token: string;
  code: string;
}

interface CheckParams {
  token: string;
}

interface ReceiptParams {
  amount: number;
  account: string;
  detail: string;
}

interface PayReceiptParams {
  id: string;
  token: string;
  payer: string;
}

interface SendReceiptParams {
  id: string;
  phone: string;
}

export default class PaymeServices {
  private readonly endpoint: string;
  private readonly id: string;
  private readonly key: string;

  private readonly cardsConfig = {
    headers: {
      "X-Auth": "",
    },
  };
  private readonly receiptConfig = {
    headers: {
      "X-Auth": "",
    },
  };

  constructor(endpoint: string, id: string, key: string) {
    this.endpoint = endpoint;
    this.id = id;
    this.key = key;

    this.cardsConfig.headers["X-Auth"] = id;
    this.receiptConfig.headers["X-Auth"] = `${id}:${key}`;
  }

  private async makeRequest(
    id: string,
    method: string,
    params: any,
    config: any
  ): Promise<any> {
    const data = {
      id,
      method,
      params,
    };

    const response: AxiosResponse = await axios.post(
      this.endpoint,
      data,
      config
    );
    return response.data;
  }

  async createCard(
    id: string,
    cardNumber: string,
    cardExpire: string
  ): Promise<any> {
    const params = {
      card: { number: cardNumber, expire: cardExpire },
      save: true,
    };

    return this.makeRequest(id, "cards.create", params, this.cardsConfig);
  }

  async getVerifyCode(id: string, token: string): Promise<any> {
    const params: VerifyCodeParams = {
      token,
    };

    return this.makeRequest(
      id,
      "cards.get_verify_code",
      params,
      this.cardsConfig
    );
  }

  async verifyCode(id: string, token: string, code: string): Promise<any> {
    const params: VerifyParams = {
      token,
      code,
    };

    return this.makeRequest(id, "cards.verify", params, this.cardsConfig);
  }

  async check(id: string, token: string): Promise<any> {
    const params: CheckParams = {
      token,
    };

    return this.makeRequest(id, "cards.check", params, this.cardsConfig);
  }

  async remove(id: string, token: string): Promise<any> {
    const params: CheckParams = {
      token,
    };

    return this.makeRequest(id, "cards.remove", params, this.cardsConfig);
  }

  async createReceipt(
    id: string,
    amount: number,
    account: string,
    detail: string
  ): Promise<any> {
    const params: ReceiptParams = {
      amount,
      account,
      detail,
    };

    return this.makeRequest(id, "receipts.create", params, this.receiptConfig);
  }

  async payReceipt(
    id: string,
    receiptId: string,
    token: string,
    payer: string
  ): Promise<any> {
    const params: PayReceiptParams = {
      id: receiptId,
      token,
      payer,
    };

    return this.makeRequest(id, "receipts.pay", params, this.receiptConfig);
  }

  async sendReceipt(
    id: string,
    receiptId: string,
    phone: string
  ): Promise<any> {
    const params: SendReceiptParams = {
      id: receiptId,
      phone,
    };

    return this.makeRequest(id, "receipts.send", params, this.receiptConfig);
  }
}
