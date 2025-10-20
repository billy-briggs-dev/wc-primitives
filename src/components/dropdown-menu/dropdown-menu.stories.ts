import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dropdown-menu.js';
import './dropdown-menu-trigger.js';
import './dropdown-menu-content.js';
import './dropdown-menu-item.js';
import './dropdown-menu-separator.js';
import './dropdown-menu-label.js';

const meta: Meta = {
  title: 'Components/Dropdown Menu',
  tags: ['autodocs'],
  render: (args) => html`
    <style>
      .dropdown-demo {
        padding: 4rem;
        min-height: 300px;
      }

      wc-dropdown-menu {
        position: relative;
        display: inline-block;
      }

      wc-dropdown-menu-trigger {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: #0066cc;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: background-color 0.2s;
      }

      wc-dropdown-menu-trigger:hover {
        background: #0052a3;
      }

      wc-dropdown-menu-trigger[data-disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }

      wc-dropdown-menu-trigger[data-state='open']::after {
        content: '▲';
        font-size: 10px;
      }

      wc-dropdown-menu-trigger[data-state='closed']::after {
        content: '▼';
        font-size: 10px;
      }

      wc-dropdown-menu-content {
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        min-width: 200px;
        background: white;
        border: 1px solid #e5e5e5;
        border-radius: 6px;
        padding: 0.5rem 0;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideDown 0.15s ease-out;
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

      wc-dropdown-menu-item {
        display: flex;
        align-items: center;
        padding: 0.5rem 1rem;
        cursor: pointer;
        font-size: 14px;
        transition: background-color 0.15s;
        outline: none;
      }

      wc-dropdown-menu-item:hover,
      wc-dropdown-menu-item:focus {
        background-color: #f5f5f5;
      }

      wc-dropdown-menu-item[data-disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }

      wc-dropdown-menu-separator {
        display: block;
        height: 1px;
        background: #e5e5e5;
        margin: 0.5rem 0;
      }

      wc-dropdown-menu-label {
        display: block;
        padding: 0.5rem 1rem;
        font-size: 12px;
        font-weight: 600;
        color: #666;
        text-transform: uppercase;
      }
    </style>
    <div class="dropdown-demo">
      <wc-dropdown-menu ?open=${args.open} ?disabled=${args.disabled}>
        <wc-dropdown-menu-trigger>
          Options
        </wc-dropdown-menu-trigger>
        <wc-dropdown-menu-content>
          <wc-dropdown-menu-item>New File</wc-dropdown-menu-item>
          <wc-dropdown-menu-item>New Window</wc-dropdown-menu-item>
          <wc-dropdown-menu-separator></wc-dropdown-menu-separator>
          <wc-dropdown-menu-item>Open</wc-dropdown-menu-item>
          <wc-dropdown-menu-item>Save</wc-dropdown-menu-item>
        </wc-dropdown-menu-content>
      </wc-dropdown-menu>
    </div>
  `,
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls whether the menu is open',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
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
 * Default dropdown menu
 */
export const Default: Story = {
  args: {
    open: false,
    disabled: false,
  },
};

/**
 * Dropdown menu with labels and separators
 */
export const WithLabels: Story = {
  render: () => html`
    <style>
      .dropdown-demo {
        padding: 4rem;
        min-height: 300px;
      }

      wc-dropdown-menu {
        position: relative;
        display: inline-block;
      }

      wc-dropdown-menu-trigger {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: #0066cc;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
      }

      wc-dropdown-menu-trigger:hover {
        background: #0052a3;
      }

      wc-dropdown-menu-content {
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        min-width: 200px;
        background: white;
        border: 1px solid #e5e5e5;
        border-radius: 6px;
        padding: 0.5rem 0;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        z-index: 1000;
      }

      wc-dropdown-menu-item {
        display: flex;
        align-items: center;
        padding: 0.5rem 1rem;
        cursor: pointer;
        font-size: 14px;
        outline: none;
      }

      wc-dropdown-menu-item:hover,
      wc-dropdown-menu-item:focus {
        background-color: #f5f5f5;
      }

      wc-dropdown-menu-separator {
        display: block;
        height: 1px;
        background: #e5e5e5;
        margin: 0.5rem 0;
      }

      wc-dropdown-menu-label {
        display: block;
        padding: 0.5rem 1rem;
        font-size: 12px;
        font-weight: 600;
        color: #666;
        text-transform: uppercase;
      }
    </style>
    <div class="dropdown-demo">
      <wc-dropdown-menu>
        <wc-dropdown-menu-trigger>
          Actions
        </wc-dropdown-menu-trigger>
        <wc-dropdown-menu-content>
          <wc-dropdown-menu-label>File</wc-dropdown-menu-label>
          <wc-dropdown-menu-item>New File</wc-dropdown-menu-item>
          <wc-dropdown-menu-item>Open File</wc-dropdown-menu-item>
          <wc-dropdown-menu-separator></wc-dropdown-menu-separator>
          <wc-dropdown-menu-label>Edit</wc-dropdown-menu-label>
          <wc-dropdown-menu-item>Cut</wc-dropdown-menu-item>
          <wc-dropdown-menu-item>Copy</wc-dropdown-menu-item>
          <wc-dropdown-menu-item>Paste</wc-dropdown-menu-item>
          <wc-dropdown-menu-separator></wc-dropdown-menu-separator>
          <wc-dropdown-menu-item>Delete</wc-dropdown-menu-item>
        </wc-dropdown-menu-content>
      </wc-dropdown-menu>
    </div>
  `,
};

/**
 * Dropdown menu with disabled items
 */
export const WithDisabledItems: Story = {
  render: () => html`
    <style>
      .dropdown-demo {
        padding: 4rem;
        min-height: 300px;
      }

      wc-dropdown-menu {
        position: relative;
        display: inline-block;
      }

      wc-dropdown-menu-trigger {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: #0066cc;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
      }

      wc-dropdown-menu-content {
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        min-width: 200px;
        background: white;
        border: 1px solid #e5e5e5;
        border-radius: 6px;
        padding: 0.5rem 0;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        z-index: 1000;
      }

      wc-dropdown-menu-item {
        display: flex;
        align-items: center;
        padding: 0.5rem 1rem;
        cursor: pointer;
        font-size: 14px;
        outline: none;
      }

      wc-dropdown-menu-item:hover,
      wc-dropdown-menu-item:focus {
        background-color: #f5f5f5;
      }

      wc-dropdown-menu-item[data-disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }
    </style>
    <div class="dropdown-demo">
      <wc-dropdown-menu>
        <wc-dropdown-menu-trigger>
          Edit
        </wc-dropdown-menu-trigger>
        <wc-dropdown-menu-content>
          <wc-dropdown-menu-item>Undo</wc-dropdown-menu-item>
          <wc-dropdown-menu-item>Redo</wc-dropdown-menu-item>
          <wc-dropdown-menu-item disabled>Cut (unavailable)</wc-dropdown-menu-item>
          <wc-dropdown-menu-item disabled>Copy (unavailable)</wc-dropdown-menu-item>
          <wc-dropdown-menu-item>Paste</wc-dropdown-menu-item>
        </wc-dropdown-menu-content>
      </wc-dropdown-menu>
    </div>
  `,
};
