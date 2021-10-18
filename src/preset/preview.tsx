import React, { useEffect, useRef, useState, Suspense, Fragment } from "react";
import {StoryContext, StoryGetter} from '@storybook/addons/dist/ts3.9/types';
import {useGlobals} from '@storybook/client-api';
import {addDecorator} from '@storybook/react';
import {I18nextProvider} from 'react-i18next';

const withI18Next = (story: StoryGetter, context: StoryContext) => {
  const {
    parameters: {i18n},
  } = context;

  const [{locale}] = useGlobals();
  const [show, setShow] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (locale) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setShow(false);
      i18n?.changeLanguage(locale);
      timeoutRef.current = setTimeout(() => setShow(true), 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  if (i18n && show) {
    return (
      <Suspense fallback="Loading...">
        <Fragment key={locale}>
         <I18nextProvider i18n={i18n}>{story(context)}</I18nextProvider>
        </Fragment>
      </Suspense>
    );
  }
  return story(context);
};

addDecorator(withI18Next);
