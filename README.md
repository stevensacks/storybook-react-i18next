# Storybook react-i18next addon

Easy react-i18next Storybook integration.

Required Versions:
* storybook - `^6.4.17`
* i18next - `^20.0.0 || ^21.0.0`
* react-i18next - `^11.16.5`

This Storybook addon assumes your project is already set up with [i18next](https://www.i18next.com/overview/getting-started) and [react-i18next](https://react.i18next.com/getting-started), with all the required packages installed, and that it is properly configured and working.

## Installation

Install this addon as a dev dependency.

```bash
npm i -D storybook-react-i18next
```

```bash
yarn add -D storybook-react-i18next
```

You will need to install `i18next` and `react-i18next` as dependencies to your project if they are not already installed.
```bash
npm i -S i18next react-i18next
```

```bash
yarn add i18next react-i18next
```

## Usage

After installing, follow these 3 steps to enable this addon in Storybook.

### main.js
Insert this addon into your addons array:
```javascript
{
  addons: [
    // other addons...
    'storybook-react-i18next',
  ]
}
```
---

### i18next.js
Create a file in your `.storybook` folder called `i18next.js` (or whatever you like). 

In this file, copy and paste the below code and make whatever modifications you need.
```javascript
import {initReactI18next} from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const ns = ['common'];
const supportedLngs = ['en', 'fr', 'ja'];

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        //debug: true,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        defaultNS: 'common',
        ns,
        supportedLngs,
    });

supportedLngs.forEach((lang) => {
    ns.forEach((n) => {
        i18n.addResourceBundle(
            lang,
            n,
            require(`../public/locales/${lang}/${n}.json`)
        );
    });
});

export default i18n;
```

Refer to the [i18next Configuration Options](https://www.i18next.com/overview/configuration-options) documentation for detailed information about the configuration options.

---

### preview.js
In your `preview.js`, you need to add the `locales` and `locale` parameters, as well as the `i18n` that you exported from the above file.

`locales` is an object where the keys are the "ids" of the locales/languages and the values are the names you want to display in the dropdown.

`locale` is what you want the default locale to be.

```javascript
import {i18n} from './i18next.js';

export const parameters = {
  i18n,
  locale: 'en',
  locales: {
    en: 'English',
    fr: 'Français',
    ja: '日本語',    
  },
};
```

You can also use full locale strings as keys. It depends on your i18next configuration.

```javascript
import {i18n} from './i18next.js';

export const parameters = {
  i18n,
  locale: 'en_US',
  locales: {
    en_US: 'English (US)',
    en_GB: 'English (GB)',
    fr_FR: 'Français',
    ja_JP: '日本語',    
  },
};
```


The `locales` object can also have values as an object with keys of `title`, `left`, or `right`.

This is useful if you want to include an emoji flag or some other string to the left or right side.

For example:
```javascript
import {i18n} from './i18next.js';

export const parameters = {
  i18n,
  locale: "en",
  locales: {
    en: {title: "English", left: '🇺🇸'},
    fr: {title: "Français", left: '🇫🇷'},
    ja: {title: "日本語", left: '🇯🇵'},
  },
};
```

Or something like this:
```javascript
import {i18n} from './i18next.js';

export const parameters = {
  i18n,
  locale: "en_US",
  locales: {
    en_US: {title: "English", right: 'US'},
    en_GB: {title: "English", right: 'GB'},
    fr_FR: {title: "Français", right: 'FR'},
    ja_JP: {title: "日本語", right: 'JP'},
  },
};
```
---
Once you have finished these steps and launch storybook, you should see a globe icon in the toolbar.

Clicking this globe icon will show a dropdown with the locales you defined in `parameters`. 

Switching locales will use the strings defined in your locale json files.
