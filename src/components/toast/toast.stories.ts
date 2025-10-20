import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './toast-provider.js';
import './toast-viewport.js';
import './toast.js';
import './toast-title.js';
import './toast-description.js';
import './toast-action.js';
import './toast-close.js';

// Shared styles for all toast stories
const toastStyles = html`
  <style>
    wc-toast-viewport {
      position: fixed;
      bottom: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      padding: 1.5rem;
      gap: 0.75rem;
      width: 390px;
      max-width: 100vw;
      margin: 0;
      list-style: none;
      z-index: 2147483647;
    }

    wc-toast {
      display: grid;
      grid-template-areas: 'title action' 'description action';
      grid-template-columns: auto max-content;
      column-gap: 1rem;
      align-items: center;
      padding: 1rem;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s ease-in-out;
    }

    wc-toast[data-state='open'] {
      opacity: 1;
      transform: translateX(0);
    }

    wc-toast[data-state='closed'] {
      opacity: 0;
      transform: translateX(100%);
    }

    wc-toast-title {
      grid-area: title;
      font-weight: 600;
      font-size: 0.9375rem;
      color: #111827;
    }

    wc-toast-description {
      grid-area: description;
      margin-top: 0.25rem;
      font-size: 0.875rem;
      color: #6b7280;
      line-height: 1.4;
    }

    wc-toast-action {
      grid-area: action;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem 0.75rem;
      background: #0066cc;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    }

    wc-toast-action:hover {
      background: #0052a3;
    }

    wc-toast-action:focus {
      outline: 2px solid #0066cc;
      outline-offset: 2px;
    }

    wc-toast-close {
      grid-area: action;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.5rem;
      height: 1.5rem;
      color: #6b7280;
      border: none;
      border-radius: 4px;
      background: transparent;
      cursor: pointer;
      transition: background 0.2s;
    }

    wc-toast-close:hover {
      background: #f3f4f6;
      color: #111827;
    }

    wc-toast-close:focus {
      outline: 2px solid #0066cc;
      outline-offset: 2px;
    }

    /* Variant styles */
    wc-toast[data-type='foreground'] {
      border-color: #0066cc;
    }

    .success-toast {
      border-color: #10b981;
    }

    .success-toast wc-toast-title {
      color: #047857;
    }

    .error-toast {
      border-color: #ef4444;
    }

    .error-toast wc-toast-title {
      color: #b91c1c;
    }

    .warning-toast {
      border-color: #f59e0b;
    }

    .warning-toast wc-toast-title {
      color: #d97706;
    }

    /* Demo styles */
    .demo-container {
      padding: 2rem;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      align-items: center;
    }

    .demo-button {
      padding: 0.5rem 1rem;
      background: #0066cc;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 0.9375rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    }

    .demo-button:hover {
      background: #0052a3;
    }

    .demo-button:focus {
      outline: 2px solid #0066cc;
      outline-offset: 2px;
    }
  </style>
`;

/**
 * A notification that appears temporarily to display a message to the user.
 *
 * The toast component is headless and provides no default styling. All visual appearance
 * must be controlled through CSS.
 */
const meta: Meta = {
  title: 'Components/Toast',
  tags: ['autodocs'],
  render: () => html`
    ${toastStyles}
    <div class="demo-container">
      <button class="demo-button" onclick="showToast()">Show Toast</button>
      
      <wc-toast-provider>
        <wc-toast-viewport>
          <wc-toast id="demo-toast">
            <wc-toast-title>Notification</wc-toast-title>
            <wc-toast-description>Your action was successful.</wc-toast-description>
            <wc-toast-close>✕</wc-toast-close>
          </wc-toast>
        </wc-toast-viewport>
      </wc-toast-provider>
    </div>

    <script>
      function showToast() {
        const toast = document.getElementById('demo-toast');
        if (toast) {
          toast.open = true;
        }
      }
    </script>
  `,
};

export default meta;
type Story = StoryObj;

/**
 * Default toast notification.
 */
export const Default: Story = {};

/**
 * Toast with action button.
 */
export const WithAction: Story = {
  render: () => html`
    ${toastStyles}
    <div class="demo-container">
      <button class="demo-button" onclick="showActionToast()">Show Toast with Action</button>
      
      <wc-toast-provider>
        <wc-toast-viewport>
          <wc-toast id="action-toast">
            <wc-toast-title>Update Available</wc-toast-title>
            <wc-toast-description>A new version is available. Update now?</wc-toast-description>
            <wc-toast-action onclick="handleAction()">Update</wc-toast-action>
          </wc-toast>
        </wc-toast-viewport>
      </wc-toast-provider>
    </div>

    <script>
      function showActionToast() {
        const toast = document.getElementById('action-toast');
        if (toast) {
          toast.open = true;
        }
      }
      
      function handleAction() {
        console.log('Action clicked!');
        const toast = document.getElementById('action-toast');
        if (toast) {
          toast.open = false;
        }
      }
    </script>
  `,
};

/**
 * Toast with different variants.
 */
export const Variants: Story = {
  render: () => html`
    ${toastStyles}
    <div class="demo-container" style="flex-direction: column; align-items: flex-start;">
      <button class="demo-button" onclick="showSuccessToast()">Show Success</button>
      <button class="demo-button" onclick="showErrorToast()">Show Error</button>
      <button class="demo-button" onclick="showWarningToast()">Show Warning</button>
      
      <wc-toast-provider>
        <wc-toast-viewport>
          <wc-toast id="success-toast" class="success-toast">
            <wc-toast-title>Success</wc-toast-title>
            <wc-toast-description>Your changes have been saved successfully.</wc-toast-description>
            <wc-toast-close>✕</wc-toast-close>
          </wc-toast>
          
          <wc-toast id="error-toast" class="error-toast">
            <wc-toast-title>Error</wc-toast-title>
            <wc-toast-description>Something went wrong. Please try again.</wc-toast-description>
            <wc-toast-close>✕</wc-toast-close>
          </wc-toast>
          
          <wc-toast id="warning-toast" class="warning-toast">
            <wc-toast-title>Warning</wc-toast-title>
            <wc-toast-description>Your session is about to expire.</wc-toast-description>
            <wc-toast-close>✕</wc-toast-close>
          </wc-toast>
        </wc-toast-viewport>
      </wc-toast-provider>
    </div>

    <script>
      function showSuccessToast() {
        document.getElementById('success-toast').open = true;
      }
      
      function showErrorToast() {
        document.getElementById('error-toast').open = true;
      }
      
      function showWarningToast() {
        document.getElementById('warning-toast').open = true;
      }
    </script>
  `,
};

/**
 * Toast with custom duration (auto-closes after specified time).
 */
export const WithCustomDuration: Story = {
  render: () => html`
    ${toastStyles}
    <div class="demo-container" style="flex-direction: column; align-items: flex-start;">
      <button class="demo-button" onclick="showShortToast()">Show Short (2s)</button>
      <button class="demo-button" onclick="showLongToast()">Show Long (10s)</button>
      <button class="demo-button" onclick="showPersistentToast()">Show Persistent</button>
      
      <wc-toast-provider>
        <wc-toast-viewport>
          <wc-toast id="short-toast" duration="2000">
            <wc-toast-title>Short Duration</wc-toast-title>
            <wc-toast-description>This toast will close in 2 seconds.</wc-toast-description>
            <wc-toast-close>✕</wc-toast-close>
          </wc-toast>
          
          <wc-toast id="long-toast" duration="10000">
            <wc-toast-title>Long Duration</wc-toast-title>
            <wc-toast-description>This toast will close in 10 seconds.</wc-toast-description>
            <wc-toast-close>✕</wc-toast-close>
          </wc-toast>
          
          <wc-toast id="persistent-toast" duration="0">
            <wc-toast-title>Persistent</wc-toast-title>
            <wc-toast-description>This toast will not auto-close.</wc-toast-description>
            <wc-toast-close>✕</wc-toast-close>
          </wc-toast>
        </wc-toast-viewport>
      </wc-toast-provider>
    </div>

    <script>
      function showShortToast() {
        document.getElementById('short-toast').open = true;
      }
      
      function showLongToast() {
        document.getElementById('long-toast').open = true;
      }
      
      function showPersistentToast() {
        document.getElementById('persistent-toast').open = true;
      }
    </script>
  `,
};

/**
 * Multiple toasts stacked.
 */
export const MultipleToasts: Story = {
  render: () => html`
    ${toastStyles}
    <div class="demo-container">
      <button class="demo-button" onclick="showMultipleToasts()">Show Multiple Toasts</button>
      
      <wc-toast-provider>
        <wc-toast-viewport>
          <wc-toast id="toast-1" duration="0">
            <wc-toast-title>First Toast</wc-toast-title>
            <wc-toast-description>This is the first notification.</wc-toast-description>
            <wc-toast-close>✕</wc-toast-close>
          </wc-toast>
          
          <wc-toast id="toast-2" duration="0">
            <wc-toast-title>Second Toast</wc-toast-title>
            <wc-toast-description>This is the second notification.</wc-toast-description>
            <wc-toast-close>✕</wc-toast-close>
          </wc-toast>
          
          <wc-toast id="toast-3" duration="0">
            <wc-toast-title>Third Toast</wc-toast-title>
            <wc-toast-description>This is the third notification.</wc-toast-description>
            <wc-toast-close>✕</wc-toast-close>
          </wc-toast>
        </wc-toast-viewport>
      </wc-toast-provider>
    </div>

    <script>
      function showMultipleToasts() {
        document.getElementById('toast-1').open = true;
        setTimeout(() => {
          document.getElementById('toast-2').open = true;
        }, 200);
        setTimeout(() => {
          document.getElementById('toast-3').open = true;
        }, 400);
      }
    </script>
  `,
};

/**
 * Toast with event listener for tracking state changes.
 */
export const WithEventListener: Story = {
  render: () => {
    setTimeout(() => {
      const toast = document.getElementById('event-toast');
      if (toast) {
        toast.addEventListener('open-change', (e: Event) => {
          const customEvent = e as CustomEvent;
          console.log('Toast state changed:', customEvent.detail);
        });
      }
    }, 0);

    return html`
      ${toastStyles}
      <div class="demo-container">
        <p style="width: 100%; margin-bottom: 1rem;">
          <strong>Note:</strong> Open the browser console to see open-change events.
        </p>
        <button class="demo-button" onclick="showEventToast()">Show Toast</button>
        
        <wc-toast-provider>
          <wc-toast-viewport>
            <wc-toast id="event-toast">
              <wc-toast-title>Event Toast</wc-toast-title>
              <wc-toast-description>Check the console for events.</wc-toast-description>
              <wc-toast-close>✕</wc-toast-close>
            </wc-toast>
          </wc-toast-viewport>
        </wc-toast-provider>
      </div>

      <script>
        function showEventToast() {
          document.getElementById('event-toast').open = true;
        }
      </script>
    `;
  },
};
