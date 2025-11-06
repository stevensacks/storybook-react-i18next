# Storybook react-i18next addon

Easy react-i18next Storybook integration.

Required Peer Dependencies:
* Version 10.x - storybook - `^10.0.0`
* Version 4.x - storybook - `^9.0.0`
* Version 3.x - storybook - `^8.0.0`

* i18next - `^22.0.0 || ^23.0.0 || ^24.0.0 || ^25.0.0`
* i18next-browser-languagedetector - `^7.0.0 || ^8.0.0`
* i18next-http-backend: `^2.0.0 || ^3.0.0`
* react-i18next - `^12.0.0 || ^13.0.0 || ^14.0.0 || ^15.0.0 || ^16.0.0` 

This Storybook addon assumes your project is already set up with [i18next](https://www.i18next.com/overview/getting-started) and [react-i18next](https://react.i18next.com/getting-started), with all the required packages installed, and that it is properly configured and working.

## Installation

Install this addon as a devDependency.

```bash
npm i -D storybook-react-i18next
```

You will need to install `i18next` and `react-i18next` as dependencies to your project if they are not already installed.
```bash
npm i -S i18next react-i18next i18next-browser-languagedetector i18next-http-backend
```

## Usage

After installing, follow these 3 steps to enable this addon in Storybook.

### main.ts
Insert this addon into your addons array:
```typescript
{
  addons: [
    // other addons...
    'storybook-react-i18next',
  ]
}
```
---

### i18next.ts
Create a file in your `.storybook` folder called `i18next.ts` (or whatever you like). 

In this file, copy and paste the below code and make whatever modifications you need (paths to resource files, languages, etc.).
```typescript
import {initReactI18next} from 'react-i18next';
import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const ns = ['common'];
const supportedLngs = ['en', 'fr', 'ja'];
const resources = ns.reduce((acc, n) => {
    supportedLngs.forEach((lng) => {
    if (!acc[lng]) acc[lng] = {};
        acc[lng] = {
            ...acc[lng],
            [n]: require(`../public/locales/${lng}/${n}.json`),
        };
    });
    return acc;
}, {});

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .use(Backend)
    .init({
        //debug: true,
        lng: 'en',
        fallbackLng: 'en',
        defaultNS: 'common',
        ns,
        interpolation: {escapeValue: false},
        react: {useSuspense: false},
        supportedLngs,
        resources,
    });

export default i18n;
```

Refer to the [i18next Configuration Options](https://www.i18next.com/overview/configuration-options) documentation for detailed information about the configuration options.

---

### preview.ts
In your `preview.ts`, you need to add the `locales` and `locale` to` initialGlobals` (or `globals` if you're not using the latest version of storybook), as well as adding `i18n` that you exported from the above file to parameters.

`locales` is an object where the keys are the "ids" of the locales/languages and the values are the names you want to display in the dropdown.

`locale` is what you want the default locale to be.

```typescript
import i18n from './i18next';

const preview: Preview = {
    initialGlobals: {
        locale: 'en',
        locales: {
            en: 'English',
            fr: 'Français',
            ja: '日本語',
        },
    },
    parameters: {
        i18n,
    },
};

export default preview;
```

You can also use full locale strings as keys. It depends on your i18next configuration.

```typescript
import i18n from './i18next';

const preview: Preview = {
    initialGlobals: {
        locale: 'en_US',
        locales: {
            en_US: 'English (US)',
            en_GB: 'English (GB)',
            fr_FR: 'Français',
            ja_JP: '日本語',
        },
    },
    parameters: {
        i18n,
    },
};

export default preview;
```


The `locales` object can also have values as an object with keys of `title`, `left`, or `right`.

This is useful if you want to include an emoji flag or some other string to the left or right side.

For example:
```typescript
import i18n from './i18next';

const preview: Preview = {
    initialGlobals: {
        locale: "en",
        locales: {
            en: {icon: '🇺🇸', title: 'English', right: 'EN'},
            fr: {icon: '🇫🇷', title: 'Français', right: 'FR'},
            ja: {icon: '🇯🇵', title: '日本語', right: 'JP'},
        },
    },
    parameters: {
        i18n,
    },
};

export default preview;
```

Or something like this:
```typescript
import i18n from './i18next';

const preview: Preview = {
    initialGlobals: {
        locale: 'en_US',
        locales: {
            en_US: {title: 'English', right: 'US'},
            en_GB: {title: 'English', right: 'GB'},
            fr_FR: {title: 'Français', right: 'FR'},
            ja_JP: {title: '日本語', right: 'JP'},
        },
    },
    parameters: {
        i18n,
    },
};

export default preview;
```

## Story Parameters Locale

If you want to have a story use a specific locale, set it in that Story's parameters.

```typescript jsx
export const Default: StoryObj = {
    render: () => <YourComponent/>,
};

export const Japanese: StoryObj = {
    parameters: {
        locale: 'ja',
    },
    render: () => <YourComponent/>,
};
```
Note that doing this switches the current locale to the parameter one, so when you change to a story without a parameter, it will stay at the last selected locale.

In the above example, if you view the Japanese story and then click back on the Default story, the locale will stay `ja`.

---
Once you have finished these steps and launch storybook, you should see a globe icon in the toolbar.

Clicking this globe icon will show a dropdown with the locales you defined in `parameters`. 

Switching locales will use the strings defined in your locale json files.
