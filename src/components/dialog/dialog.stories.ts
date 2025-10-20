import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dialog.js';
import './dialog-trigger.js';
import './dialog-portal.js';
import './dialog-overlay.js';
import './dialog-content.js';
import './dialog-title.js';
import './dialog-description.js';
import './dialog-close.js';

// Shared styles for all dialog stories
const dialogStyles = html`
  <style>
    wc-dialog-portal {
      position: fixed;
      inset: 0;
      z-index: 50;
    }

    wc-dialog-overlay {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
      animation: fadeIn 0.2s ease-out;
    }

    wc-dialog-overlay[data-state='closed'] {
      animation: fadeOut 0.2s ease-out;
    }

    wc-dialog-content {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 10px 38px -10px rgba(0, 0, 0, 0.35),
        0 10px 20px -15px rgba(0, 0, 0, 0.2);
      max-width: 450px;
      width: 90vw;
      max-height: 85vh;
      overflow-y: auto;
      animation: contentShow 0.2s ease-out;
    }

    wc-dialog-content[data-state='closed'] {
      animation: contentHide 0.2s ease-out;
    }

    wc-dialog-content:focus {
      outline: none;
    }

    wc-dialog-title {
      display: block;
      margin: 0 0 0.5rem 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: #1a1a1a;
    }

    wc-dialog-description {
      display: block;
      margin: 0 0 1.25rem 0;
      font-size: 0.9375rem;
      line-height: 1.5;
      color: #666;
    }

    wc-dialog-trigger,
    wc-dialog-close {
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
      border: none;
      background: #0066cc;
      color: white;
    }

    wc-dialog-trigger:hover,
    wc-dialog-close:hover {
      background: #0052a3;
    }

    wc-dialog-trigger:focus,
    wc-dialog-close:focus {
      outline: 2px solid #0066cc;
      outline-offset: 2px;
    }

    wc-dialog-trigger[data-disabled],
    wc-dialog-close[data-disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }

    wc-dialog-close {
      margin-top: 1.5rem;
      width: 100%;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
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

    @keyframes contentShow {
      from {
        opacity: 0;
        transform: translate(-50%, -48%) scale(0.96);
      }
      to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
    }

    @keyframes contentHide {
      from {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
      to {
        opacity: 0;
        transform: translate(-50%, -48%) scale(0.96);
      }
    }

    /* Demo page styles */
    .demo-container {
      padding: 2rem;
      min-height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  </style>
`;

/**
 * A modal dialog that overlays content and traps focus within it.
 *
 * The dialog component is headless and provides no default styling. All visual appearance
 * must be controlled through CSS.
 */
const meta: Meta = {
  title: 'Components/Dialog',
  tags: ['autodocs'],
  render: (args) => html`
    ${dialogStyles}
    <div class="demo-container">
      <wc-dialog ?open="${args.open}" ?modal="${args.modal}" ?disabled="${args.disabled}">
        <wc-dialog-trigger>Open Dialog</wc-dialog-trigger>
        <wc-dialog-portal>
          <wc-dialog-overlay></wc-dialog-overlay>
          <wc-dialog-content>
            <wc-dialog-title>Dialog Title</wc-dialog-title>
            <wc-dialog-description>
              This is a dialog description. It provides additional information about the
              dialog content and purpose.
            </wc-dialog-description>
            <p style="margin: 0 0 1rem 0; color: #333;">
              Dialog content goes here. You can put any content you want inside the dialog.
            </p>
            <wc-dialog-close>Close Dialog</wc-dialog-close>
          </wc-dialog-content>
        </wc-dialog-portal>
      </wc-dialog>
    </div>
  `,
  argTypes: {
    open: {
      control: 'boolean',
      description: 'The controlled open state of the dialog',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    modal: {
      control: 'boolean',
      description:
        'When true (default), clicking outside or pressing escape will close the dialog',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'When true, prevents the user from interacting with the dialog',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default dialog with modal behavior (clicking overlay or pressing escape closes it).
 */
export const Default: Story = {
  args: {
    open: false,
    modal: true,
    disabled: false,
  },
};

/**
 * Dialog that starts in the open state.
 */
export const Open: Story = {
  args: {
    open: true,
    modal: true,
  },
};

/**
 * Non-modal dialog that cannot be closed by clicking outside or pressing escape.
 */
export const NonModal: Story = {
  args: {
    open: false,
    modal: false,
  },
};

/**
 * Disabled dialog that cannot be opened.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/**
 * Dialog with a form inside.
 */
export const WithForm: Story = {
  render: () => html`
    ${dialogStyles}
    <style>
      .form-field {
        margin-bottom: 1rem;
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
      }

      .form-field input:focus {
        outline: none;
        border-color: #0066cc;
        box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
      }

      .button-group {
        display: flex;
        gap: 0.5rem;
        margin-top: 1.5rem;
      }

      .button-group wc-dialog-close {
        margin-top: 0;
        flex: 1;
      }

      .button-secondary {
        background: #f3f4f6;
        color: #333;
      }

      .button-secondary:hover {
        background: #e5e7eb;
      }
    </style>
    <div class="demo-container">
      <wc-dialog>
        <wc-dialog-trigger>Edit Profile</wc-dialog-trigger>
        <wc-dialog-portal>
          <wc-dialog-overlay></wc-dialog-overlay>
          <wc-dialog-content>
            <wc-dialog-title>Edit Profile</wc-dialog-title>
            <wc-dialog-description>
              Make changes to your profile here. Click save when you're done.
            </wc-dialog-description>
            <form>
              <div class="form-field">
                <label for="name">Name</label>
                <input id="name" type="text" value="John Doe" />
              </div>
              <div class="form-field">
                <label for="email">Email</label>
                <input id="email" type="email" value="john@example.com" />
              </div>
              <div class="button-group">
                <wc-dialog-close class="button-secondary">Cancel</wc-dialog-close>
                <wc-dialog-close>Save Changes</wc-dialog-close>
              </div>
            </form>
          </wc-dialog-content>
        </wc-dialog-portal>
      </wc-dialog>
    </div>
  `,
};

/**
 * Dialog with event listener for tracking open state changes.
 */
export const WithEventListener: Story = {
  render: () => {
    setTimeout(() => {
      const dialog = document.querySelector('wc-dialog');
      if (dialog) {
        dialog.addEventListener('open-change', (e: Event) => {
          const customEvent = e as CustomEvent;
          console.log('Dialog state changed:', customEvent.detail);
        });
      }
    }, 0);

    return html`
      ${dialogStyles}
      <div class="demo-container">
        <p style="margin-bottom: 1rem;">
          <strong>Note:</strong> Open the browser console to see open-change events.
        </p>
        <wc-dialog>
          <wc-dialog-trigger>Open Dialog</wc-dialog-trigger>
          <wc-dialog-portal>
            <wc-dialog-overlay></wc-dialog-overlay>
            <wc-dialog-content>
              <wc-dialog-title>Dialog with Events</wc-dialog-title>
              <wc-dialog-description>
                Check the console to see events when the dialog opens and closes.
              </wc-dialog-description>
              <wc-dialog-close>Close</wc-dialog-close>
            </wc-dialog-content>
          </wc-dialog-portal>
        </wc-dialog>
      </div>
    `;
  },
};

/**
 * Dialog with custom close button positions.
 */
export const CustomCloseButton: Story = {
  render: () => html`
    ${dialogStyles}
    <style>
      .dialog-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1rem;
      }

      .close-icon {
        background: transparent;
        color: #666;
        padding: 0.25rem;
        width: auto;
        margin: 0;
        font-size: 1.25rem;
        line-height: 1;
      }

      .close-icon:hover {
        background: #f3f4f6;
        color: #333;
      }

      .dialog-header wc-dialog-title {
        margin: 0;
      }
    </style>
    <div class="demo-container">
      <wc-dialog>
        <wc-dialog-trigger>Open Dialog</wc-dialog-trigger>
        <wc-dialog-portal>
          <wc-dialog-overlay></wc-dialog-overlay>
          <wc-dialog-content>
            <div class="dialog-header">
              <wc-dialog-title>Custom Close Button</wc-dialog-title>
              <wc-dialog-close class="close-icon">✕</wc-dialog-close>
            </div>
            <wc-dialog-description>
              This dialog has a close button in the header instead of at the bottom.
            </wc-dialog-description>
            <p style="margin: 0; color: #333;">Dialog content here.</p>
          </wc-dialog-content>
        </wc-dialog-portal>
      </wc-dialog>
    </div>
  `,
};
