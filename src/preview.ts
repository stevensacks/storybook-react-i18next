import type {Renderer, ProjectAnnotations} from 'storybook/internal/types';
import i18n from 'storybook-i18n/preview';
import {withI18Next} from './withI18Next';

// @ts-ignore
const i18nDecorators = i18n.decorators || [];

const preview: ProjectAnnotations<Renderer> = {
    ...i18n,
    decorators: [...i18nDecorators, withI18Next],
};

export default preview;
