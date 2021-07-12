# Storybook Addon i18next

Add i18next support to Storybook.

## Installation

You will need to install `i18next` and `react-i18next` in your project if they are not already present.

Install with npm
```bash
npm i -D storybook-addon-i18next
```

Or yarn
```bash
yarn add -D storybook-addon-i18next
```

## Usage

Insert this addon into your storybook main.js addons array.
```javascript
{
  addons: [
    'storybook-addon-i18next',
  ]
}
```
### i18next configuration

Create a file in your `.storybook` folder called something like `i18next.js`. In this file, you should write your i18next configuration.

For example:
```javascript
import {initReactI18next} from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

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
        ns: ['common'],
        supportedLngs: ['en', 'ja'],
    });

supportedLngs.forEach((lang) => {
    ns.forEach((n) => {
        i18n.addResources(
            lang,
            n,
            require(`../../public/locales/${lang}/${n}.json`)
        );
    });
});
```

In your `preview.js`, add the locales and default locale to the parameters.

`Locales` is an object where the keys are the "ids" of the locale/language and the values are the plain text name of that locale you want to use. This is what will appear in the dropdown in the toolbar.

```javascript
export const parameters = {
  locale: 'en',
  locales: {
    en: 'English',
    fr: 'Français',
    ja: '日本語',    
  },
};
```

You can also use full locale strings.

```javascript
export const parameters = {
  locale: 'en_US',
  locales: {
    en_US: 'English (US)',
    en_GB: 'English (GB)',
    fr_FR: 'Français',
    ja_JP: '日本語',    
  },
};
```

You should use whichever format your i18next implementation expects.
