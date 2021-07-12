import React, {useEffect, Suspense} from 'react';
import {addDecorator} from '@storybook/react';
import {I18nextProvider} from 'react-i18next';
import {StoryContext, StoryGetter} from "@storybook/addons/dist/ts3.9/types";
import {useGlobals} from '@storybook/client-api';
import i18n from 'i18next';

export const parameters = {
  i18n,
}

const withI18Next = (story: StoryGetter, context: StoryContext) => {
  const [{locale}] = useGlobals();
  const {
    parameters: {i18n},
  } = context;

  useEffect(() => {
    if (locale) {
      i18n?.changeLanguage(locale);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  if (i18n) {
    return (
      <Suspense fallback="Loading...">
        <I18nextProvider i18n={i18n}>{story(context)}</I18nextProvider>
      </Suspense>
    );
  }
  return story(context);
};

addDecorator(withI18Next);
