import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './toggle.js';

// Shared styles for all toggle stories
const toggleStyles = html`
  <style>
    wc-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem 1rem;
      background: #f3f4f6;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 0.9375rem;
      font-weight: 500;
      color: #374151;
      cursor: pointer;
      transition: all 0.2s;
      user-select: none;
    }

    wc-toggle:hover {
      background: #e5e7eb;
    }

    wc-toggle[data-state='on'] {
      background: #0066cc;
      border-color: #0066cc;
      color: white;
    }

    wc-toggle[data-state='on']:hover {
      background: #0052a3;
      border-color: #0052a3;
    }

    wc-toggle:focus {
      outline: 2px solid #0066cc;
      outline-offset: 2px;
    }

    wc-toggle[data-disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Demo container */
    .demo-container {
      padding: 2rem;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      align-items: center;
    }

    .demo-section {
      padding: 2rem;
    }

    .toggle-group {
      display: flex;
      gap: 0.5rem;
    }

    .toggle-with-icon {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }
  </style>
`;

/**
 * A two-state button that can be toggled on or off.
 *
 * The toggle component is headless and provides no default styling. All visual appearance
 * must be controlled through CSS.
 */
const meta: Meta = {
  title: 'Components/Toggle',
  tags: ['autodocs'],
  render: (args) => html`
    ${toggleStyles}
    <div class="demo-container">
      <wc-toggle ?pressed="${args.pressed}" ?disabled="${args.disabled}">
        Toggle
      </wc-toggle>
    </div>
  `,
  argTypes: {
    pressed: {
      control: 'boolean',
      description: 'The pressed state of the toggle',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'When true, prevents the user from interacting with the toggle',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default toggle in the off state.
 */
export const Default: Story = {
  args: {
    pressed: false,
    disabled: false,
  },
};

/**
 * Toggle that starts in the pressed (on) state.
 */
export const Pressed: Story = {
  args: {
    pressed: true,
  },
};

/**
 * Disabled toggle that cannot be interacted with.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/**
 * Disabled toggle in the pressed state.
 */
export const DisabledPressed: Story = {
  args: {
    pressed: true,
    disabled: true,
  },
};

/**
 * Toggles with icon content.
 */
export const WithIcons: Story = {
  render: () => html`
    ${toggleStyles}
    <div class="demo-container">
      <wc-toggle>
        <span class="toggle-with-icon">
          <span>👍</span>
          <span>Like</span>
        </span>
      </wc-toggle>
      <wc-toggle>
        <span class="toggle-with-icon">
          <span>⭐</span>
          <span>Star</span>
        </span>
      </wc-toggle>
      <wc-toggle>
        <span class="toggle-with-icon">
          <span>🔖</span>
          <span>Bookmark</span>
        </span>
      </wc-toggle>
    </div>
  `,
};

/**
 * Multiple toggles in a group.
 */
export const ToggleGroup: Story = {
  render: () => html`
    ${toggleStyles}
    <style>
      .formatting-toolbar {
        display: flex;
        gap: 0.25rem;
        padding: 0.5rem;
        background: white;
        border: 1px solid #e5e5e5;
        border-radius: 6px;
        width: fit-content;
      }

      .formatting-toolbar wc-toggle {
        padding: 0.5rem;
        min-width: 2.5rem;
        border-radius: 4px;
      }

      .divider {
        width: 1px;
        background: #e5e5e5;
        margin: 0 0.25rem;
      }
    </style>
    <div class="demo-section">
      <p style="margin-bottom: 1rem; color: #666;">Text formatting toolbar example:</p>
      <div class="formatting-toolbar">
        <wc-toggle><strong>B</strong></wc-toggle>
        <wc-toggle><em>I</em></wc-toggle>
        <wc-toggle><u>U</u></wc-toggle>
        <div class="divider"></div>
        <wc-toggle>≡</wc-toggle>
        <wc-toggle>≣</wc-toggle>
        <wc-toggle>≢</wc-toggle>
      </div>
    </div>
  `,
};

/**
 * Toggle with event listener for tracking state changes.
 */
export const WithEventListener: Story = {
  render: () => {
    setTimeout(() => {
      const toggle = document.querySelector('wc-toggle');
      if (toggle) {
        toggle.addEventListener('pressed-change', (e: Event) => {
          const customEvent = e as CustomEvent;
          console.log('Toggle state changed:', customEvent.detail);
        });
      }
    }, 0);

    return html`
      ${toggleStyles}
      <div class="demo-container">
        <p style="width: 100%; margin-bottom: 1rem;">
          <strong>Note:</strong> Open the browser console to see pressed-change events.
        </p>
        <wc-toggle>Toggle with Events</wc-toggle>
      </div>
    `;
  },
};

/**
 * Different sized toggles.
 */
export const Sizes: Story = {
  render: () => html`
    ${toggleStyles}
    <style>
      .small-toggle {
        padding: 0.25rem 0.5rem;
        font-size: 0.8125rem;
      }

      .large-toggle {
        padding: 0.75rem 1.5rem;
        font-size: 1.125rem;
      }
    </style>
    <div class="demo-container">
      <wc-toggle class="small-toggle">Small</wc-toggle>
      <wc-toggle>Default</wc-toggle>
      <wc-toggle class="large-toggle">Large</wc-toggle>
    </div>
  `,
};

/**
 * Toggle as a switch (alternative styling).
 */
export const AsSwitch: Story = {
  render: () => html`
    <style>
      .switch-container {
        padding: 2rem;
      }

      .switch-toggle {
        position: relative;
        display: inline-block;
        width: 44px;
        height: 24px;
        padding: 0;
        background: #cbd5e1;
        border: none;
        border-radius: 12px;
        transition: background-color 0.2s;
      }

      .switch-toggle::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: 20px;
        height: 20px;
        background: white;
        border-radius: 50%;
        transition: transform 0.2s;
      }

      .switch-toggle[data-state='on'] {
        background: #0066cc;
      }

      .switch-toggle[data-state='on']::after {
        transform: translateX(20px);
      }

      .switch-toggle:focus {
        outline: 2px solid #0066cc;
        outline-offset: 2px;
      }

      .switch-label {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1rem;
      }

      .switch-label span {
        font-size: 0.9375rem;
        color: #333;
      }
    </style>
    <div class="switch-container">
      <div class="switch-label">
        <wc-toggle class="switch-toggle" aria-label="Airplane mode"></wc-toggle>
        <span>Airplane mode</span>
      </div>
      <div class="switch-label">
        <wc-toggle class="switch-toggle" pressed aria-label="WiFi"></wc-toggle>
        <span>WiFi</span>
      </div>
      <div class="switch-label">
        <wc-toggle class="switch-toggle" aria-label="Bluetooth"></wc-toggle>
        <span>Bluetooth</span>
      </div>
    </div>
  `,
};
