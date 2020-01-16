### Message syntax

Under the hood, `formatjs` is used for localizing your messages. It allows `svelte-i18n` to support the ICU message syntax. It is strongly recommended to read their documentation about it.

- [Basic Internationalization Principles](https://formatjs.io/guides/basic-i18n/)
- [Runtime Environments](https://formatjs.io/guides/runtime-environments/)
- [ICU Message Syntax](https://formatjs.io/guides/message-syntax/)

### `$format` or `$_` or `$t`

`import { _, t, format } from 'svelte-i18n'`

The `$format` store is the actual formatter method. It's also aliased as `$_` and `$t` for convenience. To format a message is as simple as executing the `$format` method:

```svelte
<script>
  import { _ } from 'svelte-i18n'
</script>

<h1>{$_('page_title')}</h1>
```

The formatter can be called with two different signatures:

- `format(messageId: string, options?: MessageObject): string`
- `format(options: MessageObject): string`

```ts
interface MessageObject {
  id?: string
  locale?: string
  format?: string
  default?: string
  values?: Record<string, string | number | Date>
}
```

- `id`: represents the path to a specific message;
- `locale`: forces a specific locale;
- `default`: the default value in case of message not found in the current locale;
- `format`: the format to be used. See [#formats](#formats);
- `values`: properties that should be interpolated in the message;

You can pass a `string` as the first parameter for a less verbose way of formatting a message.

If the message id literal value is not in the root of the dicitonary, `.` (dots) are interpreted as a path:

```jsonc
// en.json
{
  "shallow.prop": "Shallow property",
  "deep": {
    "property": "Deep property"
  }
}
```

```svelte
<div>{$_('shallow.prop')}</div> <!-- Shallow property -->
<div>{$_('deep.prop')}</div> <!-- Deep property -->
```

### `$formatTime(number: Date, options: MessageObject)`

`import { formatTime } from 'svelte-i18n'`

Formats a date object into a time string with the specified format. Please refer to the [#formats](#formats) section to see available formats.

```html
<div>{$formatTime(new Date(2019, 3, 24, 23, 45))}</div>
<!-- 11:45 PM -->

<div>{$formatTime(new Date(2019, 3, 24, 23, 45), { format: 'medium' } )}</div>
<!-- 11:45:00 PM -->
```

#### `$formatDate(date: Date, options: MessageObject)`

`import { formatDate } from 'svelte-i18n'`

Formats a date object into a string with the specified format. Please refer to the [#formats](#formats) section to see available formats.

```html
<div>{$formatDate(new Date(2019, 3, 24, 23, 45))}</div>
<!-- 4/24/19 -->

<div>{$formatDate(new Date(2019, 3, 24, 23, 45), { format: 'medium' } )}</div>
<!-- Apr 24, 2019 -->
```

#### `$formatNumber(number: number, options: MessageObject)`

`import { formatNumber } from 'svelte-i18n'`

Formats a number with the specified locale and format. Please refer to the [#formats](#formats) section to see available formats.

```html
<div>{$formatNumber(100000000)}</div>
<!-- 100,000,000 -->

<div>{$formatNumber(100000000, { locale: 'pt' })}</div>
<!-- 100.000.000 -->
```

### Formats

`svelte-i18n` comes with a default set of `number`, `time` and `date` formats:

**Number:**

- `currency`: `{ style: 'currency' }`
- `percent`: `{ style: 'percent' }`
- `scientific`: `{ notation: 'scientific' }`
- `engineering`: `{ notation: 'engineering' }`
- `compactLong`: `{ notation: 'compact', compactDisplay: 'long' }`
- `compactShort`: `{ notation: 'compact', compactDisplay: 'short' }`

**Date:**

- `short`: `{ month: 'numeric', day: 'numeric', year: '2-digit' }`
- `medium`: `{ month: 'short', day: 'numeric', year: 'numeric' }`
- `long`: `{ month: 'long', day: 'numeric', year: 'numeric' }`
- `full`: `{ weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }`

**Time:**

- `short`: `{ hour: 'numeric', minute: 'numeric' }`
- `medium`: `{ hour: 'numeric', minute: 'numeric', second: 'numeric' }`
- `long`: `{ hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' }`
- `full`: `{ hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' }`

### Accessing formatters directly

`svelte-i18n` also provides a low-level API to access its formatter methods:

```js
import {
  getDateFormatter,
  getNumberFormatter,
  getTimeFormatter,
  getMessageFormatter,
} from 'svelte-i18n'
```

By using these methods, it's possible to manipulate values in a more specific way that fits your needs. For example, it's possible to create a method which receives a `date` and returns its relevant date related parts:

```js
import { getDateFormatter } from 'svelte-i18n'

const getDateParts = date =>
  getDateFormatter()
    .formatToParts(date)
    .filter(({ type }) => type !== 'literal')
    .reduce((acc, { type, value }) => {
      acc[type] = value
      return acc
    }, {})

getDateParts(new Date(2020, 0, 1)) // { month: '1', day: '1', year: '2020' }
```

Check the [methods documentation](/docs/Methods.md#low-level-api) for more information.
