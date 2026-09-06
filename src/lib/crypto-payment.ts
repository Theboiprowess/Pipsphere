// Export string values for client-side usage (doesn't require Prisma client)
export const CryptoNetworkValues = {
  TRC20: 'TRC20',
  ERC20: 'ERC20',
} as const

export type CryptoNetworkString = typeof CryptoNetworkValues[keyof typeof CryptoNetworkValues]

// Define enum for server-side usage (doesn't require Prisma client)
export enum CryptoNetwork {
  TRC20 = 'TRC20',
  ERC20 = 'ERC20',
}

export interface CryptoPaymentConfig {
  provider: 'nowpayments' | 'coinbase' | 'bitpay'
  apiKey?: string
  apiSecret?: string
  merchantId?: string
  walletAddresses?: {
    trc20?: string
    erc20?: string
  }
}

export interface CryptoPaymentRequest {
  amount: number
  currency: string
  network: CryptoNetwork | CryptoNetworkString
  orderId: string
  customerEmail: string
}

export interface CryptoPaymentResponse {
  paymentId: string
  address: string
  amount: number
  currency: string
  network: string
  expiresAt: Date
  qrCode?: string
}

export class CryptoPaymentService {
  private config: CryptoPaymentConfig

  constructor(config: CryptoPaymentConfig) {
    this.config = config
  }

  async createPayment(request: CryptoPaymentRequest): Promise<CryptoPaymentResponse> {
    switch (this.config.provider) {
      case 'nowpayments':
        return this.createNowPaymentsPayment(request)
      case 'coinbase':
        return this.createCoinbasePayment(request)
      case 'bitpay':
        return this.createBitPayPayment(request)
      default:
        throw new Error('Unsupported crypto payment provider')
    }
  }

  private async createNowPaymentsPayment(
    request: CryptoPaymentRequest
  ): Promise<CryptoPaymentResponse> {
    // Placeholder for NOWPayments API integration
    // In production, this would make actual API calls to NOWPayments

    const networkStr = typeof request.network === 'string' ? request.network : request.network.toString()
    const networkMap: Record<string, string> = {
      'TRC20': 'TRC20',
      'ERC20': 'ERC20',
    }

    return {
      paymentId: `np_${Date.now()}`,
      address: this.config.walletAddresses?.[networkStr.toLowerCase() as keyof typeof this.config.walletAddresses] || '',
      amount: request.amount,
      currency: request.currency,
      network: networkMap[networkStr] || networkStr,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${this.config.walletAddresses?.[networkStr.toLowerCase() as keyof typeof this.config.walletAddresses]}`,
    }
  }

  private async createCoinbasePayment(
    request: CryptoPaymentRequest
  ): Promise<CryptoPaymentResponse> {
    // Placeholder for Coinbase Commerce API integration
    // In production, this would make actual API calls to Coinbase Commerce

    const networkStr = typeof request.network === 'string' ? request.network : request.network.toString()
    const networkMap: Record<string, string> = {
      'TRC20': 'TRC20',
      'ERC20': 'ERC20',
    }

    return {
      paymentId: `cb_${Date.now()}`,
      address: this.config.walletAddresses?.[networkStr.toLowerCase() as keyof typeof this.config.walletAddresses] || '',
      amount: request.amount,
      currency: request.currency,
      network: networkMap[networkStr] || networkStr,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000),
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${this.config.walletAddresses?.[networkStr.toLowerCase() as keyof typeof this.config.walletAddresses]}`,
    }
  }

  private async createBitPayPayment(
    request: CryptoPaymentRequest
  ): Promise<CryptoPaymentResponse> {
    // Placeholder for BitPay API integration
    // In production, this would make actual API calls to BitPay

    const networkStr = typeof request.network === 'string' ? request.network : request.network.toString()
    const networkMap: Record<string, string> = {
      'TRC20': 'TRC20',
      'ERC20': 'ERC20',
    }

    return {
      paymentId: `bp_${Date.now()}`,
      address: this.config.walletAddresses?.[networkStr.toLowerCase() as keyof typeof this.config.walletAddresses] || '',
      amount: request.amount,
      currency: request.currency,
      network: networkMap[networkStr] || networkStr,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000),
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${this.config.walletAddresses?.[networkStr.toLowerCase() as keyof typeof this.config.walletAddresses]}`,
    }
  }

  async verifyPayment(paymentId: string): Promise<boolean> {
    // Placeholder for payment verification
    // In production, this would verify the payment status with the provider
    return false
  }
}

export function getCryptoPaymentService(): CryptoPaymentService {
  const provider = (process.env.CRYPTO_PAYMENT_PROVIDER || 'nowpayments') as 'nowpayments' | 'coinbase' | 'bitpay'
  
  return new CryptoPaymentService({
    provider,
    apiKey: process.env.NOWPAYMENTS_API_KEY || process.env.COINBASE_COMMERCE_API_KEY,
    apiSecret: process.env.NOWPAYMENTS_API_SECRET,
    merchantId: process.env.BITPAY_MERCHANT_ID,
    walletAddresses: {
      trc20: process.env.USDT_TRC20_WALLET_ADDRESS,
      erc20: process.env.USDT_ERC20_WALLET_ADDRESS,
    },
  })
}
