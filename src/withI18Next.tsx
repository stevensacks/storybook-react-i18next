import React, {Fragment, ReactNode, useState} from 'react';
import {useEffect, useGlobals} from '@storybook/client-api';
import {
    PartialStoryFn as StoryFunction,
    Renderer,
    StoryContext,
} from '@storybook/types';
import {I18nextProvider} from 'react-i18next';

export const withI18Next = (
    story: StoryFunction<Renderer>,
    context: StoryContext
) => {
    const {
        parameters: {i18n},
    } = context;

    const language = i18n.language;

    const [{locale}] = useGlobals();
    const [key, setKey] = useState(0);

    useEffect(() => {
        i18n.on('languageChanged', () => {
            setKey(Date.now());
        });
        return () => i18n.off('languageChanged');
    }, []);

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
