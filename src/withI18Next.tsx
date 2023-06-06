import React, {ReactNode} from 'react';
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

    const [{locale}] = useGlobals();

    useEffect(() => {
        if (locale) {
            i18n?.changeLanguage(locale);
        }
    }, [locale]);

    return (
        <I18nextProvider i18n={i18n}>
            {story(context) as ReactNode | null}
        </I18nextProvider>
    );
};
