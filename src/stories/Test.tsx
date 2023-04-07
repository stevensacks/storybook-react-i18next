import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';

const Test: FC = () => {
    const {t} = useTranslation();

    return <div>{t('hello')}</div>;
};

export default Test;
