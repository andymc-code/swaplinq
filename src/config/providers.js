export const PROVIDERS = {
  CHANGENOW: {
    name: 'ChangeNow',
    linkId: 'ddff246bc01549',
    baseUrl: 'https://changenow.io/embeds/exchange-widget/v2/widget.html',
    supportedFeatures: ['fiat', 'crypto', 'stepper']
  },
  // Placeholders for future expansion
  SIMPLESWAP: {
    name: 'SimpleSwap',
    apiKey: '',
    baseUrl: 'https://simpleswap.io/widget',
  },
  STEPCITEX: {
    name: 'Stepcitex',
    apiKey: '',
    baseUrl: '',
  }
};

export const DEFAULT_PROVIDER = 'CHANGENOW';
