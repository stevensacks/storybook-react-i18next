import React, {useEffect, useState, useRef, Suspense} from 'react';
import {StoryContext, StoryGetter} from '@storybook/addons/dist/ts3.9/types';
import {useGlobals} from '@storybook/client-api';
import {addDecorator} from '@storybook/react';
import {I18nextProvider} from 'react-i18next';

const withI18Next = (story: StoryGetter, context: StoryContext) => {
  const [{locale}] = useGlobals();
  const {
    parameters: {i18n},
  } = context;

  const timeoutRef = useRef<number | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (locale) {
      i18n?.changeLanguage(locale);
      // react-i18next requires a forced render after short delay
      setShow(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => setShow(true), 200);
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [locale]);

  if (i18n && show) {
    return (
      <Suspense fallback="Loading...">
        <I18nextProvider i18n={i18n}>{story(context)}</I18nextProvider>
      </Suspense>
    );
  }
  return story(context);
};

addDecorator(withI18Next);
