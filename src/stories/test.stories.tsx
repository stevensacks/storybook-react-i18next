import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import Test from './Test';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta = {
    title: 'Test',
    component: Test,
};

export default meta;

export const Default: StoryObj = {
    render: () => <Test />,
};

export const English: StoryObj = {
    parameters: {
        locale: 'en',
    },
    render: () => <Test />,
};

export const French: StoryObj = {
    parameters: {
        locale: 'fr',
    },
    render: () => <Test />,
};

export const Japanese: StoryObj = {
    parameters: {
        locale: 'ja',
    },
    render: () => <Test />,
};
