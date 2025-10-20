import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './context-menu.js';
import './context-menu-trigger.js';
import './context-menu-content.js';
import './context-menu-item.js';
import './context-menu-separator.js';
import './context-menu-label.js';

const meta: Meta = {
  title: 'Components/Context Menu',
  tags: ['autodocs'],
  render: (args) => html`
    <style>
      .context-menu-demo {
        padding: 4rem;
        min-height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .context-trigger-area {
        padding: 4rem;
        border: 2px dashed #ccc;
        border-radius: 8px;
        background: #f9f9f9;
        text-align: center;
        user-select: none;
      }

      wc-context-menu-content {
        min-width: 200px;
        background: white;
        border: 1px solid #e5e5e5;
        border-radius: 6px;
        padding: 0.5rem 0;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
      }

      wc-context-menu-item {
        display: flex;
        align-items: center;
        padding: 0.5rem 1rem;
        cursor: pointer;
        font-size: 14px;
        transition: background-color 0.15s;
        outline: none;
      }

      wc-context-menu-item:hover,
      wc-context-menu-item:focus {
        background-color: #f5f5f5;
      }

      wc-context-menu-item[data-disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }

      wc-context-menu-separator {
        display: block;
        height: 1px;
        background: #e5e5e5;
        margin: 0.5rem 0;
      }

      wc-context-menu-label {
        display: block;
        padding: 0.5rem 1rem;
        font-size: 12px;
        font-weight: 600;
        color: #666;
        text-transform: uppercase;
      }
    </style>
    <div class="context-menu-demo">
      <wc-context-menu ?disabled=${args.disabled}>
        <wc-context-menu-trigger>
          <div class="context-trigger-area">
            Right-click here to open context menu
          </div>
        </wc-context-menu-trigger>
        <wc-context-menu-content>
          <wc-context-menu-item>Open</wc-context-menu-item>
          <wc-context-menu-item>Save</wc-context-menu-item>
          <wc-context-menu-separator></wc-context-menu-separator>
          <wc-context-menu-item>Copy</wc-context-menu-item>
          <wc-context-menu-item>Paste</wc-context-menu-item>
        </wc-context-menu-content>
      </wc-context-menu>
    </div>
  `,
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'When true, prevents interaction with the menu',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default context menu triggered by right-click
 */
export const Default: Story = {
  args: {
    disabled: false,
  },
};

/**
 * Context menu with labels and separators
 */
export const WithLabels: Story = {
  render: () => html`
    <style>
      .context-menu-demo {
        padding: 4rem;
        min-height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .context-trigger-area {
        padding: 4rem;
        border: 2px dashed #ccc;
        border-radius: 8px;
        background: #f9f9f9;
        text-align: center;
        user-select: none;
      }

      wc-context-menu-content {
        min-width: 220px;
        background: white;
        border: 1px solid #e5e5e5;
        border-radius: 6px;
        padding: 0.5rem 0;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
      }

      wc-context-menu-item {
        display: flex;
        align-items: center;
        padding: 0.5rem 1rem;
        cursor: pointer;
        font-size: 14px;
        outline: none;
      }

      wc-context-menu-item:hover,
      wc-context-menu-item:focus {
        background-color: #f5f5f5;
      }

      wc-context-menu-separator {
        display: block;
        height: 1px;
        background: #e5e5e5;
        margin: 0.5rem 0;
      }

      wc-context-menu-label {
        display: block;
        padding: 0.5rem 1rem;
        font-size: 12px;
        font-weight: 600;
        color: #666;
        text-transform: uppercase;
      }
    </style>
    <div class="context-menu-demo">
      <wc-context-menu>
        <wc-context-menu-trigger>
          <div class="context-trigger-area">
            Right-click for more options
          </div>
        </wc-context-menu-trigger>
        <wc-context-menu-content>
          <wc-context-menu-label>File</wc-context-menu-label>
          <wc-context-menu-item>New File</wc-context-menu-item>
          <wc-context-menu-item>Open File</wc-context-menu-item>
          <wc-context-menu-separator></wc-context-menu-separator>
          <wc-context-menu-label>Edit</wc-context-menu-label>
          <wc-context-menu-item>Cut</wc-context-menu-item>
          <wc-context-menu-item>Copy</wc-context-menu-item>
          <wc-context-menu-item>Paste</wc-context-menu-item>
          <wc-context-menu-separator></wc-context-menu-separator>
          <wc-context-menu-item>Delete</wc-context-menu-item>
        </wc-context-menu-content>
      </wc-context-menu>
    </div>
  `,
};

/**
 * Context menu with disabled items
 */
export const WithDisabledItems: Story = {
  render: () => html`
    <style>
      .context-menu-demo {
        padding: 4rem;
        min-height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .context-trigger-area {
        padding: 4rem;
        border: 2px dashed #ccc;
        border-radius: 8px;
        background: #f9f9f9;
        text-align: center;
        user-select: none;
      }

      wc-context-menu-content {
        min-width: 200px;
        background: white;
        border: 1px solid #e5e5e5;
        border-radius: 6px;
        padding: 0.5rem 0;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
      }

      wc-context-menu-item {
        display: flex;
        align-items: center;
        padding: 0.5rem 1rem;
        cursor: pointer;
        font-size: 14px;
        outline: none;
      }

      wc-context-menu-item:hover,
      wc-context-menu-item:focus {
        background-color: #f5f5f5;
      }

      wc-context-menu-item[data-disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }
    </style>
    <div class="context-menu-demo">
      <wc-context-menu>
        <wc-context-menu-trigger>
          <div class="context-trigger-area">
            Right-click to see menu
          </div>
        </wc-context-menu-trigger>
        <wc-context-menu-content>
          <wc-context-menu-item>Undo</wc-context-menu-item>
          <wc-context-menu-item>Redo</wc-context-menu-item>
          <wc-context-menu-item disabled>Cut (unavailable)</wc-context-menu-item>
          <wc-context-menu-item disabled>Copy (unavailable)</wc-context-menu-item>
          <wc-context-menu-item>Paste</wc-context-menu-item>
        </wc-context-menu-content>
      </wc-context-menu>
    </div>
  `,
};
