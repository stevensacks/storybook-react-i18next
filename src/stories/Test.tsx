import React, {useState} from 'react';
import type {FC} from 'react';
import {useTranslation, Trans} from 'react-i18next';

const Test: FC = () => {
    const {t} = useTranslation();
    const [count, setCount] = useState(0);

    const onClick = () => setCount((count) => count + 1);

    return (
        <div>
            <span>{t('hello')}</span>{' '}
            <span>
                <Trans>world</Trans>
            </span>
            <div style={{marginTop: '1rem'}}>
                <button onClick={onClick}>{t('click', {count})}</button>
            </div>
        </div>
    );
};

export default Test;
