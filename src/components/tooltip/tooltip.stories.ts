import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './tooltip.js';
import './tooltip-trigger.js';
import './tooltip-content.js';

// Shared styles for all tooltip stories
const tooltipStyles = html`
  <style>
    wc-tooltip-trigger {
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

    wc-tooltip-trigger:hover {
      background: #e5e7eb;
    }

    wc-tooltip-trigger:focus {
      outline: 2px solid #0066cc;
      outline-offset: 2px;
    }

    wc-tooltip-trigger[data-state='open'] {
      background: #e5e7eb;
    }

    wc-tooltip-trigger[data-disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }

    wc-tooltip-content {
      position: absolute;
      z-index: 50;
      padding: 0.5rem 0.75rem;
      background: #1f2937;
      color: white;
      border-radius: 6px;
      font-size: 0.875rem;
      line-height: 1.25rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      max-width: 300px;
      word-wrap: break-word;
      animation: fadeIn 0.15s ease-in;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    wc-tooltip-content[data-state='closed'] {
      display: none;
    }

    /* Demo container */
    .demo-container {
      padding: 4rem 2rem;
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
      align-items: center;
      justify-content: center;
      min-height: 300px;
    }

    .demo-section {
      padding: 4rem 2rem;
    }

    .tooltip-group {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    /* Positioning styles */
    .tooltip-container {
      position: relative;
      display: inline-block;
    }

    .tooltip-top wc-tooltip-content {
      bottom: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
    }

    .tooltip-bottom wc-tooltip-content {
      top: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
    }

    .tooltip-left wc-tooltip-content {
      right: calc(100% + 8px);
      top: 50%;
      transform: translateY(-50%);
    }

    .tooltip-right wc-tooltip-content {
      left: calc(100% + 8px);
      top: 50%;
      transform: translateY(-50%);
    }

    /* Arrow styles (optional decoration) */
    wc-tooltip-content::before {
      content: '';
      position: absolute;
      width: 8px;
      height: 8px;
      background: #1f2937;
      transform: rotate(45deg);
    }

    .tooltip-top wc-tooltip-content::before {
      bottom: -4px;
      left: 50%;
      margin-left: -4px;
    }

    .tooltip-bottom wc-tooltip-content::before {
      top: -4px;
      left: 50%;
      margin-left: -4px;
    }

    .tooltip-left wc-tooltip-content::before {
      right: -4px;
      top: 50%;
      margin-top: -4px;
    }

    .tooltip-right wc-tooltip-content::before {
      left: -4px;
      top: 50%;
      margin-top: -4px;
    }
  </style>
`;

/**
 * A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.
 *
 * The tooltip component is headless and provides no default styling. All visual appearance
 * must be controlled through CSS.
 */
const meta: Meta = {
  title: 'Components/Tooltip',
  tags: ['autodocs'],
  render: (args) => html`
    ${tooltipStyles}
    <div class="demo-container">
      <wc-tooltip 
        ?open="${args.open}" 
        ?disabled="${args.disabled}"
        delay-duration="${args.delayDuration}">
        <div class="tooltip-container tooltip-top">
          <wc-tooltip-trigger>Hover me</wc-tooltip-trigger>
          <wc-tooltip-content>This is a tooltip</wc-tooltip-content>
        </div>
      </wc-tooltip>
    </div>
  `,
  argTypes: {
    open: {
      control: 'boolean',
      description: 'The controlled open state of the tooltip',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'When true, prevents the user from interacting with the tooltip',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    delayDuration: {
      control: 'number',
      description: 'The delay in milliseconds before showing the tooltip',
      table: {
        defaultValue: { summary: '700' },
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default tooltip that shows on hover or focus.
 */
export const Default: Story = {
  args: {
    open: false,
    disabled: false,
    delayDuration: 700,
  },
};

/**
 * Tooltip with no delay - opens immediately on hover.
 */
export const NoDelay: Story = {
  render: () => html`
    ${tooltipStyles}
    <div class="demo-container">
      <wc-tooltip delay-duration="0">
        <div class="tooltip-container tooltip-top">
          <wc-tooltip-trigger>Hover me (instant)</wc-tooltip-trigger>
          <wc-tooltip-content>Opens immediately!</wc-tooltip-content>
        </div>
      </wc-tooltip>
    </div>
  `,
};

/**
 * Disabled tooltip that cannot be opened.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/**
 * Tooltips positioned in different directions.
 */
export const Positions: Story = {
  render: () => html`
    ${tooltipStyles}
    <div class="demo-section">
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6rem; place-items: center;">
        <wc-tooltip delay-duration="0">
          <div class="tooltip-container tooltip-top">
            <wc-tooltip-trigger>Top</wc-tooltip-trigger>
            <wc-tooltip-content>Tooltip on top</wc-tooltip-content>
          </div>
        </wc-tooltip>

        <wc-tooltip delay-duration="0">
          <div class="tooltip-container tooltip-bottom">
            <wc-tooltip-trigger>Bottom</wc-tooltip-trigger>
            <wc-tooltip-content>Tooltip on bottom</wc-tooltip-content>
          </div>
        </wc-tooltip>

        <wc-tooltip delay-duration="0">
          <div class="tooltip-container tooltip-left">
            <wc-tooltip-trigger>Left</wc-tooltip-trigger>
            <wc-tooltip-content>Tooltip on left</wc-tooltip-content>
          </div>
        </wc-tooltip>

        <wc-tooltip delay-duration="0">
          <div class="tooltip-container tooltip-right">
            <wc-tooltip-trigger>Right</wc-tooltip-trigger>
            <wc-tooltip-content>Tooltip on right</wc-tooltip-content>
          </div>
        </wc-tooltip>
      </div>
    </div>
  `,
};

/**
 * Tooltips with various content types.
 */
export const WithContent: Story = {
  render: () => html`
    ${tooltipStyles}
    <div class="demo-container">
      <wc-tooltip delay-duration="300">
        <div class="tooltip-container tooltip-top">
          <wc-tooltip-trigger>Simple text</wc-tooltip-trigger>
          <wc-tooltip-content>This is a simple tooltip</wc-tooltip-content>
        </div>
      </wc-tooltip>

      <wc-tooltip delay-duration="300">
        <div class="tooltip-container tooltip-top">
          <wc-tooltip-trigger>Long content</wc-tooltip-trigger>
          <wc-tooltip-content>
            This is a longer tooltip with more information. It can contain multiple lines of text and will wrap as needed.
          </wc-tooltip-content>
        </div>
      </wc-tooltip>

      <wc-tooltip delay-duration="300">
        <div class="tooltip-container tooltip-top">
          <wc-tooltip-trigger>With emoji 🎉</wc-tooltip-trigger>
          <wc-tooltip-content>✨ Tooltips can contain emojis! 🚀</wc-tooltip-content>
        </div>
      </wc-tooltip>
    </div>
  `,
};

/**
 * Tooltips on various interactive elements.
 */
export const OnDifferentElements: Story = {
  render: () => html`
    ${tooltipStyles}
    <style>
      .icon-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        background: #f3f4f6;
        border: 1px solid #d1d5db;
        cursor: pointer;
        transition: all 0.2s;
      }

      .icon-button:hover {
        background: #e5e7eb;
      }

      .link {
        color: #0066cc;
        text-decoration: underline;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        padding: 0.25rem 0.5rem;
        background: #0066cc;
        color: white;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 500;
      }
    </style>
    <div class="demo-container">
      <wc-tooltip delay-duration="300">
        <div class="tooltip-container tooltip-top">
          <wc-tooltip-trigger class="icon-button">
            ⚙️
          </wc-tooltip-trigger>
          <wc-tooltip-content>Settings</wc-tooltip-content>
        </div>
      </wc-tooltip>

      <wc-tooltip delay-duration="300">
        <div class="tooltip-container tooltip-top">
          <wc-tooltip-trigger class="icon-button">
            ℹ️
          </wc-tooltip-trigger>
          <wc-tooltip-content>More information</wc-tooltip-content>
        </div>
      </wc-tooltip>

      <wc-tooltip delay-duration="300">
        <div class="tooltip-container tooltip-top">
          <wc-tooltip-trigger class="badge">
            New
          </wc-tooltip-trigger>
          <wc-tooltip-content>This feature is new!</wc-tooltip-content>
        </div>
      </wc-tooltip>
    </div>
  `,
};

/**
 * Tooltip with event listener for tracking state changes.
 */
export const WithEventListener: Story = {
  render: () => {
    setTimeout(() => {
      const tooltip = document.querySelector('wc-tooltip');
      if (tooltip) {
        tooltip.addEventListener('open-change', (e: Event) => {
          const customEvent = e as CustomEvent;
          console.log('Tooltip state changed:', customEvent.detail);
        });
      }
    }, 0);

    return html`
      ${tooltipStyles}
      <div class="demo-container">
        <p style="width: 100%; text-align: center; margin-bottom: 2rem;">
          <strong>Note:</strong> Open the browser console to see open-change events.
        </p>
        <wc-tooltip delay-duration="300">
          <div class="tooltip-container tooltip-top">
            <wc-tooltip-trigger>Hover with Events</wc-tooltip-trigger>
            <wc-tooltip-content>Check the console!</wc-tooltip-content>
          </div>
        </wc-tooltip>
      </div>
    `;
  },
};

/**
 * Keyboard navigation example - tooltip appears on focus.
 */
export const KeyboardNavigation: Story = {
  render: () => html`
    ${tooltipStyles}
    <div class="demo-container">
      <p style="width: 100%; text-align: center; margin-bottom: 2rem;">
        <strong>Try it:</strong> Use Tab key to navigate between buttons. Tooltips appear on focus.
      </p>
      <div class="tooltip-group">
        <wc-tooltip>
          <div class="tooltip-container tooltip-top">
            <wc-tooltip-trigger>First</wc-tooltip-trigger>
            <wc-tooltip-content>First focusable element</wc-tooltip-content>
          </div>
        </wc-tooltip>

        <wc-tooltip>
          <div class="tooltip-container tooltip-top">
            <wc-tooltip-trigger>Second</wc-tooltip-trigger>
            <wc-tooltip-content>Second focusable element</wc-tooltip-content>
          </div>
        </wc-tooltip>

        <wc-tooltip>
          <div class="tooltip-container tooltip-top">
            <wc-tooltip-trigger>Third</wc-tooltip-trigger>
            <wc-tooltip-content>Third focusable element</wc-tooltip-content>
          </div>
        </wc-tooltip>
      </div>
    </div>
  `,
};
