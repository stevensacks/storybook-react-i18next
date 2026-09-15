import type {Renderer, ProjectAnnotations} from 'storybook/internal/types';
import i18n from 'storybook-i18n/preview';
import {withI18Next} from './withI18Next';

const i18nDecorators = i18n.decorators || [];

const preview: ProjectAnnotations<Renderer> = {
    ...i18n,
    // @ts-expect-error withI18Next's StoryFunction/StoryContext are typed against Renderer while i18n.decorators expects a broader/incompatible DecoratorFunction shape
    decorators: [...i18nDecorators, withI18Next],
};

export default preview;
