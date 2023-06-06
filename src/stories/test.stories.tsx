import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {userEvent, within} from '@storybook/testing-library';
import Test from './Test';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta = {
    title: 'Test',
    component: Test,
};

export default meta;

export const Default: StoryObj = {
    render: Test,
};

export const English: StoryObj = {
    parameters: {
        locale: 'en',
    },
    render: Test,
};

export const French: StoryObj = {
    parameters: {
        locale: 'fr',
    },
    render: Test,
};

export const Japanese: StoryObj = {
    parameters: {
        locale: 'ja',
    },
    render: Test,
};

export const PlayDefault: StoryObj = {
    render: Test,
};
PlayDefault.play = async ({canvasElement}) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);
    await userEvent.click(button);
    await userEvent.click(button);
};

export const PlayEnglish: StoryObj = {
    parameters: {
        locale: 'en',
    },
    render: Test,
};
PlayEnglish.play = async ({canvasElement}) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);
    await userEvent.click(button);
    await userEvent.click(button);
};

export const PlayFrench: StoryObj = {
    parameters: {
        locale: 'fr',
    },
    render: Test,
};
PlayFrench.play = async ({canvasElement}) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);
    await userEvent.click(button);
    await userEvent.click(button);
};

export const PlayJapanese: StoryObj = {
    parameters: {
        locale: 'ja',
    },
    render: Test,
};
PlayJapanese.play = async ({canvasElement}) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);
    await userEvent.click(button);
    await userEvent.click(button);
};
