import React, {Fragment, ReactNode} from 'react';
import {useEffect, useGlobals, useState} from '@storybook/preview-api';
import type {
    PartialStoryFn as StoryFunction,
    Renderer,
    StoryContext,
} from '@storybook/types';
import {I18nextProvider} from 'react-i18next';

export const withI18Next = (
    story: StoryFunction<Renderer>,
    context: StoryContext<Renderer>,
) => {
    const {
        parameters: {i18n},
    } = context;

    if (i18n === undefined) {
        console.error(`The 'i18n' parameter is missing in 'parameters' configuration of preview.js. Define the 'i18n' parameter as follows:
parameters: {
    i18n,
},
`);
    }

    const language = i18n?.language;

    const [{locale}] = useGlobals();
    const [key, setKey] = useState(0);

    useEffect(() => {
        if (i18n) {
            i18n.on('languageChanged', () => {
                setKey(Date.now());
            });
            return () => i18n.off('languageChanged');
        }
    }, [i18n]);

    useEffect(() => {
        if (i18n && locale && language && locale !== language) {
            i18n.changeLanguage(locale);
        }
    }, [language, locale, i18n]);

    return (
        <Fragment key={key}>
            <I18nextProvider i18n={i18n}>
                {story(context) as ReactNode | null}
            </I18nextProvider>
        </Fragment>
    );
};
