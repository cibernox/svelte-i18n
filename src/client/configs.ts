export { init } from 'icu-helpers';
// import { getClientLocale } from './includes/utils'
// import { ConfigureOptions } from './types'
// import { $locale } from './stores/locale'

// interface Formats {
//   number: Record<string, any>
//   date: Record<string, any>
//   time: Record<string, any>
// }

// interface Options {
//   fallbackLocale: string
//   initialLocale: string
//   formats: Formats
//   loadingDelay: number
//   warnOnMissingMessages: boolean
// }

// export const defaultFormats: Formats = {
//   number: {
//     scientific: { notation: 'scientific' },
//     engineering: { notation: 'engineering' },
//     compactLong: { notation: 'compact', compactDisplay: 'long' },
//     compactShort: { notation: 'compact', compactDisplay: 'short' },
//   },
//   date: {
//     short: { month: 'numeric', day: 'numeric', year: '2-digit' },
//     medium: { month: 'short', day: 'numeric', year: 'numeric' },
//     long: { month: 'long', day: 'numeric', year: 'numeric' },
//     full: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
//   },
//   time: {
//     short: { hour: 'numeric', minute: 'numeric' },
//     medium: { hour: 'numeric', minute: 'numeric', second: 'numeric' },
//     long: {
//       hour: 'numeric',
//       minute: 'numeric',
//       second: 'numeric',
//       timeZoneName: 'short',
//     },
//     full: {
//       hour: 'numeric',
//       minute: 'numeric',
//       second: 'numeric',
//       timeZoneName: 'short',
//     },
//   },
// }

// export const defaultOptions: Options = {
//   fallbackLocale: null,
//   initialLocale: null,
//   loadingDelay: 200,
//   formats: defaultFormats,
//   warnOnMissingMessages: true,
// }

// const options: Options = defaultOptions

// export function getOptions() {
//   return options
// }

// export function init(opts: ConfigureOptions) {
//   const { formats, ...rest } = opts
//   const initialLocale = opts.initialLocale
//     ? typeof opts.initialLocale === 'string'
//       ? opts.initialLocale
//       : getClientLocale(opts.initialLocale) || opts.fallbackLocale
//     : opts.fallbackLocale

//   Object.assign(options, rest, { initialLocale })

//   if (formats) {
//     if ('number' in formats) {
//       Object.assign(options.formats.number, formats.number)
//     }
//     if ('date' in formats) {
//       Object.assign(options.formats.date, formats.date)
//     }
//     if ('time' in formats) {
//       Object.assign(options.formats.time, formats.time)
//     }
//   }

//   return $locale.set(initialLocale)
// }
