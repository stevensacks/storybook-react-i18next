import React, {useEffect, useRef, useState, Suspense, Fragment} from 'react';
import {
    AnyFramework,
    PartialStoryFn as StoryFunction,
    StoryContext,
} from '@storybook/csf';
import {useGlobals} from '@storybook/client-api';
import {I18nextProvider} from 'react-i18next';

export const withI18Next = (
    Story: StoryFunction<AnyFramework>,
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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locale]);

    if (i18n && show) {
        return (
            <Suspense fallback="Loading...">
                <Fragment key={locale}>
                    <I18nextProvider i18n={i18n}>
                        <Story {...context} />
                    </I18nextProvider>
                </Fragment>
            </Suspense>
        );
    }
    return <Story {...context} />;
};
