import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './popover.js';
import './popover-trigger.js';
import './popover-anchor.js';
import './popover-portal.js';
import './popover-content.js';
import './popover-close.js';

// Shared styles for all popover stories
const popoverStyles = html`
  <style>
    wc-popover-portal {
      position: fixed;
      inset: 0;
      z-index: 50;
      pointer-events: none;
    }

    wc-popover-content {
      pointer-events: auto;
      position: absolute;
      background: white;
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 10px 38px -10px rgba(0, 0, 0, 0.35),
        0 10px 20px -15px rgba(0, 0, 0, 0.2);
      min-width: 200px;
      max-width: 300px;
      animation: fadeIn 0.2s ease-out;
      border: 1px solid #e5e5e5;
    }

    wc-popover-content[data-state='closed'] {
      animation: fadeOut 0.2s ease-out;
    }

    /* Positioning based on side and align attributes */
    wc-popover-content[data-side='bottom'] {
      top: calc(100% + 8px);
    }

    wc-popover-content[data-side='top'] {
      bottom: calc(100% + 8px);
    }

    wc-popover-content[data-side='right'] {
      left: calc(100% + 8px);
    }

    wc-popover-content[data-side='left'] {
      right: calc(100% + 8px);
    }

    wc-popover-content[data-align='start'] {
      left: 0;
    }

    wc-popover-content[data-align='center'] {
      left: 50%;
      transform: translateX(-50%);
    }

    wc-popover-content[data-align='end'] {
      right: 0;
    }

    wc-popover-content:focus {
      outline: none;
    }

    wc-popover-trigger {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.625rem 1rem;
      font-size: 0.9375rem;
      font-weight: 500;
      line-height: 1;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
      border: 1px solid #0066cc;
      background: white;
      color: #0066cc;
    }

    wc-popover-trigger:hover {
      background: #f0f7ff;
    }

    wc-popover-trigger:focus {
      outline: 2px solid #0066cc;
      outline-offset: 2px;
    }

    wc-popover-trigger[data-disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }

    wc-popover-trigger[data-state='open'] {
      background: #e6f2ff;
    }

    wc-popover-close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
      background: #0066cc;
      color: white;
      margin-top: 0.75rem;
    }

    wc-popover-close:hover {
      background: #0052a3;
    }

    wc-popover-close:focus {
      outline: 2px solid #0066cc;
      outline-offset: 2px;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-4px) translateX(-50%);
      }
      to {
        opacity: 1;
        transform: translateY(0) translateX(-50%);
      }
    }

    @keyframes fadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }

    /* Demo page styles */
    .demo-container {
      padding: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .popover-wrapper {
      position: relative;
      display: inline-block;
    }

    .popover-content-text {
      margin: 0 0 0.5rem 0;
      color: #333;
      font-size: 0.875rem;
      line-height: 1.5;
    }

    .popover-content-text:last-of-type {
      margin-bottom: 0;
    }
  </style>
`;

/**
 * A non-modal dialog that floats near a trigger element.
 * 
 * The popover component is headless and provides no default styling. All visual appearance
 * must be controlled through CSS. Unlike Dialog, popovers are non-modal and allow interaction
 * with the rest of the page.
 */
const meta: Meta = {
  title: 'Components/Popover',
  tags: ['autodocs'],
  render: (args) => html`
    ${popoverStyles}
    <div class="demo-container">
      <wc-popover ?open="${args.open}" ?modal="${args.modal}" ?disabled="${args.disabled}">
        <div class="popover-wrapper">
          <wc-popover-trigger>Open Popover</wc-popover-trigger>
          <wc-popover-portal>
            <wc-popover-content>
              <p class="popover-content-text">
                This is a popover. It's a non-modal dialog that floats near a trigger element.
              </p>
              <wc-popover-close>Close</wc-popover-close>
            </wc-popover-content>
          </wc-popover-portal>
        </div>
      </wc-popover>
    </div>
  `,
  argTypes: {
    open: {
      control: 'boolean',
      description: 'The controlled open state of the popover',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    modal: {
      control: 'boolean',
      description: 'When true, clicking outside will close the popover',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'When true, prevents the user from interacting with the popover',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default popover that stays open when clicking outside (non-modal).
 */
export const Default: Story = {
  args: {
    open: false,
    modal: false,
    disabled: false,
  },
};

/**
 * Popover that starts in the open state.
 */
export const Open: Story = {
  args: {
    open: true,
    modal: false,
  },
};

/**
 * Modal popover that closes when clicking outside.
 */
export const Modal: Story = {
  args: {
    open: false,
    modal: true,
  },
};

/**
 * Disabled popover that cannot be opened.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/**
 * Popover with different content alignment.
 */
export const WithAlignment: Story = {
  render: () => html`
    ${popoverStyles}
    <div class="demo-container">
      <div style="display: flex; gap: 2rem;">
        <wc-popover>
          <div class="popover-wrapper">
            <wc-popover-trigger>Start Aligned</wc-popover-trigger>
            <wc-popover-portal>
              <wc-popover-content side="bottom" align="start">
                <p class="popover-content-text">This popover is aligned to the start.</p>
                <wc-popover-close>Close</wc-popover-close>
              </wc-popover-content>
            </wc-popover-portal>
          </div>
        </wc-popover>

        <wc-popover>
          <div class="popover-wrapper">
            <wc-popover-trigger>Center Aligned</wc-popover-trigger>
            <wc-popover-portal>
              <wc-popover-content side="bottom" align="center">
                <p class="popover-content-text">This popover is centered.</p>
                <wc-popover-close>Close</wc-popover-close>
              </wc-popover-content>
            </wc-popover-portal>
          </div>
        </wc-popover>

        <wc-popover>
          <div class="popover-wrapper">
            <wc-popover-trigger>End Aligned</wc-popover-trigger>
            <wc-popover-portal>
              <wc-popover-content side="bottom" align="end">
                <p class="popover-content-text">This popover is aligned to the end.</p>
                <wc-popover-close>Close</wc-popover-close>
              </wc-popover-content>
            </wc-popover-portal>
          </div>
        </wc-popover>
      </div>
    </div>
  `,
};

/**
 * Popover with different side positions.
 */
export const WithSides: Story = {
  render: () => html`
    ${popoverStyles}
    <div class="demo-container">
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 3rem;">
        <wc-popover>
          <div class="popover-wrapper">
            <wc-popover-trigger>Top</wc-popover-trigger>
            <wc-popover-portal>
              <wc-popover-content side="top" align="center">
                <p class="popover-content-text">Positioned on top</p>
                <wc-popover-close>Close</wc-popover-close>
              </wc-popover-content>
            </wc-popover-portal>
          </div>
        </wc-popover>

        <wc-popover>
          <div class="popover-wrapper">
            <wc-popover-trigger>Bottom</wc-popover-trigger>
            <wc-popover-portal>
              <wc-popover-content side="bottom" align="center">
                <p class="popover-content-text">Positioned on bottom</p>
                <wc-popover-close>Close</wc-popover-close>
              </wc-popover-content>
            </wc-popover-portal>
          </div>
        </wc-popover>

        <wc-popover>
          <div class="popover-wrapper">
            <wc-popover-trigger>Left</wc-popover-trigger>
            <wc-popover-portal>
              <wc-popover-content side="left" align="center">
                <p class="popover-content-text">Positioned on left</p>
                <wc-popover-close>Close</wc-popover-close>
              </wc-popover-content>
            </wc-popover-portal>
          </div>
        </wc-popover>

        <wc-popover>
          <div class="popover-wrapper">
            <wc-popover-trigger>Right</wc-popover-trigger>
            <wc-popover-portal>
              <wc-popover-content side="right" align="center">
                <p class="popover-content-text">Positioned on right</p>
                <wc-popover-close>Close</wc-popover-close>
              </wc-popover-content>
            </wc-popover-portal>
          </div>
        </wc-popover>
      </div>
    </div>
  `,
};

/**
 * Popover with form content.
 */
export const WithForm: Story = {
  render: () => html`
    ${popoverStyles}
    <style>
      .form-field {
        margin-bottom: 0.75rem;
      }

      .form-field label {
        display: block;
        margin-bottom: 0.25rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: #333;
      }

      .form-field input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 0.875rem;
        box-sizing: border-box;
      }

      .form-field input:focus {
        outline: none;
        border-color: #0066cc;
        box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
      }
    </style>
    <div class="demo-container">
      <wc-popover>
        <div class="popover-wrapper">
          <wc-popover-trigger>Edit Details</wc-popover-trigger>
          <wc-popover-portal>
            <wc-popover-content>
              <form>
                <div class="form-field">
                  <label for="name">Name</label>
                  <input id="name" type="text" placeholder="Enter name" />
                </div>
                <div class="form-field">
                  <label for="email">Email</label>
                  <input id="email" type="email" placeholder="Enter email" />
                </div>
                <wc-popover-close>Save</wc-popover-close>
              </form>
            </wc-popover-content>
          </wc-popover-portal>
        </div>
      </wc-popover>
    </div>
  `,
};

/**
 * Popover with event listener for tracking open state changes.
 */
export const WithEventListener: Story = {
  render: () => {
    setTimeout(() => {
      const popover = document.querySelector('wc-popover');
      if (popover) {
        popover.addEventListener('open-change', (e: Event) => {
          const customEvent = e as CustomEvent;
          console.log('Popover state changed:', customEvent.detail);
        });
      }
    }, 0);

    return html`
      ${popoverStyles}
      <div class="demo-container">
        <p style="margin-bottom: 1rem;">
          <strong>Note:</strong> Open the browser console to see open-change events.
        </p>
        <wc-popover>
          <div class="popover-wrapper">
            <wc-popover-trigger>Open Popover</wc-popover-trigger>
            <wc-popover-portal>
              <wc-popover-content>
                <p class="popover-content-text">
                  Check the console to see events when the popover opens and closes.
                </p>
                <wc-popover-close>Close</wc-popover-close>
              </wc-popover-content>
            </wc-popover-portal>
          </div>
        </wc-popover>
      </div>
    `;
  },
};

/**
 * Popover with custom anchor element.
 */
export const WithAnchor: Story = {
  render: () => html`
    ${popoverStyles}
    <style>
      .custom-anchor {
        display: inline-block;
        padding: 1rem;
        background: #f0f7ff;
        border: 2px dashed #0066cc;
        border-radius: 8px;
        margin-bottom: 1rem;
      }
    </style>
    <div class="demo-container">
      <wc-popover>
        <div class="popover-wrapper">
          <wc-popover-anchor>
            <div class="custom-anchor">Custom Anchor Element</div>
          </wc-popover-anchor>
          <wc-popover-trigger>Open Popover</wc-popover-trigger>
          <wc-popover-portal>
            <wc-popover-content>
              <p class="popover-content-text">
                This popover can be positioned relative to a custom anchor element.
              </p>
              <wc-popover-close>Close</wc-popover-close>
            </wc-popover-content>
          </wc-popover-portal>
        </div>
      </wc-popover>
    </div>
  `,
};
