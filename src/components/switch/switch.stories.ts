import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './switch.js';

// Shared styles for all switch stories
const switchStyles = html`
  <style>
    wc-switch {
      position: relative;
      display: inline-block;
      width: 44px;
      height: 24px;
      padding: 0;
      background: #cbd5e1;
      border: none;
      border-radius: 12px;
      transition: background-color 0.2s;
      cursor: pointer;
    }

    wc-switch[data-state='checked'] {
      background: #0066cc;
    }

    wc-switch:focus {
      outline: 2px solid #0066cc;
      outline-offset: 2px;
    }

    wc-switch[data-disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .switch-thumb {
      display: block;
      width: 20px;
      height: 20px;
      background: white;
      border-radius: 50%;
      transition: transform 0.2s;
      transform: translateX(2px);
    }

    wc-switch[data-state='checked'] .switch-thumb {
      transform: translateX(22px);
    }

    /* Demo container */
    .demo-container {
      padding: 2rem;
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      align-items: center;
    }

    .switch-label {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .switch-label span {
      font-size: 0.9375rem;
      color: #333;
    }
  </style>
`;

/**
 * A control that allows the user to toggle between checked and unchecked states.
 *
 * The switch component is headless and provides no default styling. All visual appearance
 * must be controlled through CSS. Use data-state="checked" or data-state="unchecked" 
 * to style the different states.
 */
const meta: Meta = {
  title: 'Components/Switch',
  tags: ['autodocs'],
  render: (args) => html`
    ${switchStyles}
    <div class="demo-container">
      <wc-switch ?checked="${args.checked}" ?disabled="${args.disabled}">
        <span class="switch-thumb"></span>
      </wc-switch>
    </div>
  `,
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'The checked state of the switch',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'When true, prevents the user from interacting with the switch',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: 'When true, the switch is required for form submission',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default switch in the unchecked state.
 */
export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
  },
};

/**
 * Switch that starts in the checked state.
 */
export const Checked: Story = {
  args: {
    checked: true,
  },
};

/**
 * Disabled switch that cannot be interacted with.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/**
 * Disabled switch in the checked state.
 */
export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
  },
};

/**
 * Switches with labels showing common use cases.
 */
export const WithLabels: Story = {
  render: () => html`
    ${switchStyles}
    <div class="demo-container" style="flex-direction: column; align-items: flex-start;">
      <div class="switch-label">
        <wc-switch aria-label="Airplane mode">
          <span class="switch-thumb"></span>
        </wc-switch>
        <span>Airplane mode</span>
      </div>
      <div class="switch-label">
        <wc-switch checked aria-label="WiFi">
          <span class="switch-thumb"></span>
        </wc-switch>
        <span>WiFi</span>
      </div>
      <div class="switch-label">
        <wc-switch aria-label="Bluetooth">
          <span class="switch-thumb"></span>
        </wc-switch>
        <span>Bluetooth</span>
      </div>
      <div class="switch-label">
        <wc-switch checked aria-label="Location">
          <span class="switch-thumb"></span>
        </wc-switch>
        <span>Location</span>
      </div>
    </div>
  `,
};

/**
 * Switch with event listener for tracking state changes.
 */
export const WithEventListener: Story = {
  render: () => {
    setTimeout(() => {
      const switchEl = document.querySelector('wc-switch');
      if (switchEl) {
        switchEl.addEventListener('checked-change', (e: Event) => {
          const customEvent = e as CustomEvent;
          console.log('Switch state changed:', customEvent.detail);
        });
      }
    }, 0);

    return html`
      ${switchStyles}
      <div class="demo-container">
        <p style="width: 100%; margin-bottom: 1rem;">
          <strong>Note:</strong> Open the browser console to see checked-change events.
        </p>
        <wc-switch>
          <span class="switch-thumb"></span>
        </wc-switch>
      </div>
    `;
  },
};

/**
 * Different sized switches.
 */
export const Sizes: Story = {
  render: () => html`
    ${switchStyles}
    <style>
      .small-switch {
        width: 32px;
        height: 18px;
      }

      .small-switch .switch-thumb {
        width: 14px;
        height: 14px;
      }

      .small-switch[data-state='checked'] .switch-thumb {
        transform: translateX(16px);
      }

      .large-switch {
        width: 56px;
        height: 32px;
      }

      .large-switch .switch-thumb {
        width: 28px;
        height: 28px;
      }

      .large-switch[data-state='checked'] .switch-thumb {
        transform: translateX(26px);
      }
    </style>
    <div class="demo-container">
      <wc-switch class="small-switch">
        <span class="switch-thumb"></span>
      </wc-switch>
      <wc-switch>
        <span class="switch-thumb"></span>
      </wc-switch>
      <wc-switch class="large-switch">
        <span class="switch-thumb"></span>
      </wc-switch>
    </div>
  `,
};

/**
 * Different color variants.
 */
export const ColorVariants: Story = {
  render: () => html`
    ${switchStyles}
    <style>
      .success-switch[data-state='checked'] {
        background: #10b981;
      }

      .warning-switch[data-state='checked'] {
        background: #f59e0b;
      }

      .danger-switch[data-state='checked'] {
        background: #ef4444;
      }
    </style>
    <div class="demo-container">
      <div class="switch-label">
        <wc-switch checked aria-label="Default">
          <span class="switch-thumb"></span>
        </wc-switch>
        <span>Default</span>
      </div>
      <div class="switch-label">
        <wc-switch class="success-switch" checked aria-label="Success">
          <span class="switch-thumb"></span>
        </wc-switch>
        <span>Success</span>
      </div>
      <div class="switch-label">
        <wc-switch class="warning-switch" checked aria-label="Warning">
          <span class="switch-thumb"></span>
        </wc-switch>
        <span>Warning</span>
      </div>
      <div class="switch-label">
        <wc-switch class="danger-switch" checked aria-label="Danger">
          <span class="switch-thumb"></span>
        </wc-switch>
        <span>Danger</span>
      </div>
    </div>
  `,
};
