import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './alert-dialog.js';
import './alert-dialog-trigger.js';
import './alert-dialog-portal.js';
import './alert-dialog-overlay.js';
import './alert-dialog-content.js';
import './alert-dialog-title.js';
import './alert-dialog-description.js';
import './alert-dialog-action.js';
import './alert-dialog-cancel.js';

// Shared styles for all alert dialog stories
const alertDialogStyles = html`
  <style>
    wc-alert-dialog-portal {
      position: fixed;
      inset: 0;
      z-index: 50;
    }

    wc-alert-dialog-overlay {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
      animation: fadeIn 0.2s ease-out;
    }

    wc-alert-dialog-overlay[data-state='closed'] {
      animation: fadeOut 0.2s ease-out;
    }

    wc-alert-dialog-content {
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

    wc-alert-dialog-content[data-state='closed'] {
      animation: contentHide 0.2s ease-out;
    }

    wc-alert-dialog-content:focus {
      outline: none;
    }

    wc-alert-dialog-title {
      display: block;
      margin: 0 0 0.5rem 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: #1a1a1a;
    }

    wc-alert-dialog-description {
      display: block;
      margin: 0 0 1.25rem 0;
      font-size: 0.9375rem;
      line-height: 1.5;
      color: #666;
    }

    wc-alert-dialog-trigger,
    wc-alert-dialog-action,
    wc-alert-dialog-cancel {
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
    }

    wc-alert-dialog-trigger {
      background: #dc2626;
      color: white;
    }

    wc-alert-dialog-trigger:hover {
      background: #b91c1c;
    }

    wc-alert-dialog-trigger:focus {
      outline: 2px solid #dc2626;
      outline-offset: 2px;
    }

    wc-alert-dialog-action {
      background: #dc2626;
      color: white;
    }

    wc-alert-dialog-action:hover {
      background: #b91c1c;
    }

    wc-alert-dialog-action:focus {
      outline: 2px solid #dc2626;
      outline-offset: 2px;
    }

    wc-alert-dialog-cancel {
      background: #f3f4f6;
      color: #333;
    }

    wc-alert-dialog-cancel:hover {
      background: #e5e7eb;
    }

    wc-alert-dialog-cancel:focus {
      outline: 2px solid #666;
      outline-offset: 2px;
    }

    wc-alert-dialog-trigger[data-disabled],
    wc-alert-dialog-action[data-disabled],
    wc-alert-dialog-cancel[data-disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .button-group {
      display: flex;
      gap: 0.5rem;
      margin-top: 1.5rem;
      justify-content: flex-end;
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
 * An alert dialog that interrupts the user with important content and expects a response.
 *
 * The alert dialog component is headless and provides no default styling. All visual appearance
 * must be controlled through CSS. Unlike regular dialogs, alert dialogs cannot be dismissed
 * by clicking outside or pressing Escape, ensuring the user must take explicit action.
 */
const meta: Meta = {
  title: 'Components/AlertDialog',
  tags: ['autodocs'],
  render: (args) => html`
    ${alertDialogStyles}
    <div class="demo-container">
      <wc-alert-dialog ?open="${args.open}" ?disabled="${args.disabled}">
        <wc-alert-dialog-trigger>Delete Account</wc-alert-dialog-trigger>
        <wc-alert-dialog-portal>
          <wc-alert-dialog-overlay></wc-alert-dialog-overlay>
          <wc-alert-dialog-content>
            <wc-alert-dialog-title>Are you absolutely sure?</wc-alert-dialog-title>
            <wc-alert-dialog-description>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </wc-alert-dialog-description>
            <div class="button-group">
              <wc-alert-dialog-cancel>Cancel</wc-alert-dialog-cancel>
              <wc-alert-dialog-action>Yes, delete account</wc-alert-dialog-action>
            </div>
          </wc-alert-dialog-content>
        </wc-alert-dialog-portal>
      </wc-alert-dialog>
    </div>
  `,
  argTypes: {
    open: {
      control: 'boolean',
      description: 'The controlled open state of the alert dialog',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'When true, prevents the user from interacting with the alert dialog',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default alert dialog with destructive action confirmation.
 */
export const Default: Story = {
  args: {
    open: false,
    disabled: false,
  },
};

/**
 * Alert dialog that starts in the open state.
 */
export const Open: Story = {
  args: {
    open: true,
  },
};

/**
 * Disabled alert dialog that cannot be opened.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/**
 * Alert dialog for file deletion confirmation.
 */
export const DeleteFile: Story = {
  render: () => html`
    ${alertDialogStyles}
    <div class="demo-container">
      <wc-alert-dialog>
        <wc-alert-dialog-trigger>Delete File</wc-alert-dialog-trigger>
        <wc-alert-dialog-portal>
          <wc-alert-dialog-overlay></wc-alert-dialog-overlay>
          <wc-alert-dialog-content>
            <wc-alert-dialog-title>Delete "document.pdf"?</wc-alert-dialog-title>
            <wc-alert-dialog-description>
              This file will be permanently deleted. You won't be able to recover it.
            </wc-alert-dialog-description>
            <div class="button-group">
              <wc-alert-dialog-cancel>Cancel</wc-alert-dialog-cancel>
              <wc-alert-dialog-action>Delete File</wc-alert-dialog-action>
            </div>
          </wc-alert-dialog-content>
        </wc-alert-dialog-portal>
      </wc-alert-dialog>
    </div>
  `,
};

/**
 * Alert dialog with event listener for tracking actions.
 */
export const WithEventListener: Story = {
  render: () => {
    setTimeout(() => {
      const alertDialog = document.querySelector('wc-alert-dialog');
      if (alertDialog) {
        alertDialog.addEventListener('open-change', (e: Event) => {
          const customEvent = e as CustomEvent;
          console.log('Alert dialog state changed:', customEvent.detail);
        });
      }

      const action = document.querySelector('wc-alert-dialog-action');
      if (action) {
        action.addEventListener('click', () => {
          console.log('Delete action confirmed!');
        });
      }

      const cancel = document.querySelector('wc-alert-dialog-cancel');
      if (cancel) {
        cancel.addEventListener('click', () => {
          console.log('Action cancelled.');
        });
      }
    }, 0);

    return html`
      ${alertDialogStyles}
      <div class="demo-container">
        <p style="margin-bottom: 1rem;">
          <strong>Note:</strong> Open the browser console to see events.
        </p>
        <wc-alert-dialog>
          <wc-alert-dialog-trigger>Delete Account</wc-alert-dialog-trigger>
          <wc-alert-dialog-portal>
            <wc-alert-dialog-overlay></wc-alert-dialog-overlay>
            <wc-alert-dialog-content>
              <wc-alert-dialog-title>Are you absolutely sure?</wc-alert-dialog-title>
              <wc-alert-dialog-description>
                This action cannot be undone. Check the console to see events when
                you cancel or confirm.
              </wc-alert-dialog-description>
              <div class="button-group">
                <wc-alert-dialog-cancel>Cancel</wc-alert-dialog-cancel>
                <wc-alert-dialog-action>Delete</wc-alert-dialog-action>
              </div>
            </wc-alert-dialog-content>
          </wc-alert-dialog-portal>
        </wc-alert-dialog>
      </div>
    `;
  },
};

/**
 * Alert dialog with custom styling for a warning.
 */
export const Warning: Story = {
  render: () => html`
    ${alertDialogStyles}
    <style>
      .warning-trigger {
        background: #f59e0b !important;
      }

      .warning-trigger:hover {
        background: #d97706 !important;
      }

      .warning-content {
        border-top: 4px solid #f59e0b;
      }

      .warning-icon {
        font-size: 2.5rem;
        text-align: center;
        margin-bottom: 1rem;
      }
    </style>
    <div class="demo-container">
      <wc-alert-dialog>
        <wc-alert-dialog-trigger class="warning-trigger">Reset Settings</wc-alert-dialog-trigger>
        <wc-alert-dialog-portal>
          <wc-alert-dialog-overlay></wc-alert-dialog-overlay>
          <wc-alert-dialog-content class="warning-content">
            <div class="warning-icon">⚠️</div>
            <wc-alert-dialog-title>Reset all settings?</wc-alert-dialog-title>
            <wc-alert-dialog-description>
              This will reset all your preferences to their default values.
              You can't undo this action.
            </wc-alert-dialog-description>
            <div class="button-group">
              <wc-alert-dialog-cancel>Keep Settings</wc-alert-dialog-cancel>
              <wc-alert-dialog-action>Reset Settings</wc-alert-dialog-action>
            </div>
          </wc-alert-dialog-content>
        </wc-alert-dialog-portal>
      </wc-alert-dialog>
    </div>
  `,
};

/**
 * Alert dialog with a single action (no cancel).
 */
export const SingleAction: Story = {
  render: () => html`
    ${alertDialogStyles}
    <style>
      .single-action-trigger {
        background: #0066cc !important;
      }

      .single-action-trigger:hover {
        background: #0052a3 !important;
      }

      .single-action-button {
        background: #0066cc !important;
        width: 100%;
      }

      .single-action-button:hover {
        background: #0052a3 !important;
      }
    </style>
    <div class="demo-container">
      <wc-alert-dialog>
        <wc-alert-dialog-trigger class="single-action-trigger">Show Info</wc-alert-dialog-trigger>
        <wc-alert-dialog-portal>
          <wc-alert-dialog-overlay></wc-alert-dialog-overlay>
          <wc-alert-dialog-content>
            <wc-alert-dialog-title>Important Information</wc-alert-dialog-title>
            <wc-alert-dialog-description>
              Your session will expire in 5 minutes. Please save your work to avoid
              losing any changes.
            </wc-alert-dialog-description>
            <div class="button-group">
              <wc-alert-dialog-action class="single-action-button">I Understand</wc-alert-dialog-action>
            </div>
          </wc-alert-dialog-content>
        </wc-alert-dialog-portal>
      </wc-alert-dialog>
    </div>
  `,
};
