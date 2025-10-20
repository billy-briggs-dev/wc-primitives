import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './collapsible.js';
import './collapsible-trigger.js';
import './collapsible-content.js';

const meta: Meta = {
  title: 'Components/Collapsible',
  tags: ['autodocs'],
  render: (args) => html`
    <style>
      .collapsible-demo {
        max-width: 400px;
        margin: 2rem auto;
      }

      wc-collapsible {
        display: block;
        border: 1px solid #e5e5e5;
        border-radius: 8px;
        background: white;
      }

      wc-collapsible-trigger {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
        cursor: pointer;
        font-weight: 500;
        background: none;
        border: none;
        width: 100%;
        text-align: left;
        transition: background-color 0.2s;
      }

      wc-collapsible-trigger:hover {
        background-color: #f5f5f5;
      }

      wc-collapsible-trigger[data-disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }

      wc-collapsible-trigger::after {
        content: '▼';
        transition: transform 0.2s;
        display: inline-block;
      }

      wc-collapsible-trigger[data-state='open']::after {
        transform: rotate(-180deg);
      }

      wc-collapsible-content {
        display: block;
        padding: 0 1rem 1rem;
        animation: slideDown 0.2s ease-out;
      }

      wc-collapsible-content[data-state='closed'] {
        animation: slideUp 0.2s ease-out;
      }

      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes slideUp {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(-10px);
        }
      }
    </style>
    <div class="collapsible-demo">
      <wc-collapsible ?open=${args.open} ?disabled=${args.disabled}>
        <wc-collapsible-trigger>
          ${args.triggerText || 'Toggle Content'}
        </wc-collapsible-trigger>
        <wc-collapsible-content>
          <p>${args.contentText || 'This content can be collapsed and expanded. Click the trigger above to toggle it.'}</p>
        </wc-collapsible-content>
      </wc-collapsible>
    </div>
  `,
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls whether the collapsible is open',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'When true, prevents interaction with the collapsible',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    triggerText: {
      control: 'text',
      description: 'Text content for the trigger button',
    },
    contentText: {
      control: 'text',
      description: 'Text content for the collapsible content',
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default collapsible in closed state
 */
export const Default: Story = {
  args: {
    open: false,
    disabled: false,
    triggerText: 'What is a collapsible?',
    contentText: 'A collapsible is an interactive component which expands/collapses a content section.',
  },
};

/**
 * Collapsible initially open
 */
export const Open: Story = {
  args: {
    open: true,
    disabled: false,
    triggerText: 'Open by default',
    contentText: 'This collapsible starts in an open state.',
  },
};

/**
 * Disabled collapsible that cannot be toggled
 */
export const Disabled: Story = {
  args: {
    open: false,
    disabled: true,
    triggerText: 'Disabled collapsible',
    contentText: 'This content cannot be revealed.',
  },
};

/**
 * Multiple collapsibles can be used independently
 */
export const Multiple: Story = {
  render: () => html`
    <style>
      .multiple-demo {
        max-width: 400px;
        margin: 2rem auto;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .multiple-demo wc-collapsible {
        display: block;
        border: 1px solid #e5e5e5;
        border-radius: 8px;
        background: white;
      }

      .multiple-demo wc-collapsible-trigger {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
        cursor: pointer;
        font-weight: 500;
        background: none;
        border: none;
        width: 100%;
        text-align: left;
        transition: background-color 0.2s;
      }

      .multiple-demo wc-collapsible-trigger:hover {
        background-color: #f5f5f5;
      }

      .multiple-demo wc-collapsible-trigger::after {
        content: '▼';
        transition: transform 0.2s;
        display: inline-block;
      }

      .multiple-demo wc-collapsible-trigger[data-state='open']::after {
        transform: rotate(-180deg);
      }

      .multiple-demo wc-collapsible-content {
        display: block;
        padding: 0 1rem 1rem;
      }
    </style>
    <div class="multiple-demo">
      <wc-collapsible>
        <wc-collapsible-trigger>Section 1</wc-collapsible-trigger>
        <wc-collapsible-content>
          <p>Content for section 1</p>
        </wc-collapsible-content>
      </wc-collapsible>

      <wc-collapsible>
        <wc-collapsible-trigger>Section 2</wc-collapsible-trigger>
        <wc-collapsible-content>
          <p>Content for section 2</p>
        </wc-collapsible-content>
      </wc-collapsible>

      <wc-collapsible>
        <wc-collapsible-trigger>Section 3</wc-collapsible-trigger>
        <wc-collapsible-content>
          <p>Content for section 3</p>
        </wc-collapsible-content>
      </wc-collapsible>
    </div>
  `,
};
