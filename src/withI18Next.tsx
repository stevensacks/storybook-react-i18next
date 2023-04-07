import React, {Fragment, ReactNode} from 'react';
import {useEffect, useGlobals, useRef, useState} from '@storybook/client-api';
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
            return () => {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locale]);

    if (i18n && show) {
        return (
            <Fragment key={locale}>
                <I18nextProvider i18n={i18n}>
                    {story(context) as ReactNode | null}
                </I18nextProvider>
            </Fragment>
        );
    }
    return story(context);
};
