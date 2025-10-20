import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './tabs.js';
import './tabs-list.js';
import './tabs-trigger.js';
import './tabs-content.js';

// Shared styles for all tabs stories
const tabsStyles = html`
  <style>
    wc-tabs {
      display: block;
      max-width: 600px;
    }

    wc-tabs-list {
      display: flex;
      border-bottom: 1px solid #e5e5e5;
      gap: 0.5rem;
    }

    wc-tabs[data-orientation='vertical'] wc-tabs-list {
      flex-direction: column;
      border-bottom: none;
      border-right: 1px solid #e5e5e5;
      width: 200px;
    }

    wc-tabs-trigger {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.75rem 1rem;
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      font-size: 0.9375rem;
      font-weight: 500;
      color: #666;
      cursor: pointer;
      transition: all 0.2s;
      position: relative;
    }

    wc-tabs[data-orientation='vertical'] wc-tabs-trigger {
      border-bottom: none;
      border-right: 2px solid transparent;
      justify-content: flex-start;
    }

    wc-tabs-trigger:hover {
      color: #333;
      background: #f9f9f9;
    }

    wc-tabs-trigger[data-state='active'] {
      color: #0066cc;
      border-bottom-color: #0066cc;
    }

    wc-tabs[data-orientation='vertical'] wc-tabs-trigger[data-state='active'] {
      border-bottom-color: transparent;
      border-right-color: #0066cc;
    }

    wc-tabs-trigger:focus {
      outline: 2px solid #0066cc;
      outline-offset: -2px;
      z-index: 1;
    }

    wc-tabs-trigger[data-disabled] {
      cursor: not-allowed;
      opacity: 0.5;
    }

    wc-tabs-content {
      padding: 1.5rem 0;
      color: #333;
      line-height: 1.6;
      animation: fadeIn 0.2s ease-out;
    }

    wc-tabs[data-orientation='vertical'] {
      display: flex;
      gap: 1.5rem;
    }

    wc-tabs[data-orientation='vertical'] wc-tabs-content {
      flex: 1;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    /* Demo styles */
    .demo-container {
      padding: 2rem;
    }

    .content-section {
      margin-bottom: 1rem;
    }

    .content-section h3 {
      margin: 0 0 0.5rem 0;
      font-size: 1.125rem;
      color: #1a1a1a;
    }

    .content-section p {
      margin: 0;
      color: #666;
    }
  </style>
`;

/**
 * A set of layered sections of content (tab panels) that are displayed one at a time.
 *
 * The tabs component is headless and provides no default styling. All visual appearance
 * must be controlled through CSS.
 */
const meta: Meta = {
  title: 'Components/Tabs',
  tags: ['autodocs'],
  render: (args) => html`
    ${tabsStyles}
    <div class="demo-container">
      <wc-tabs
        value="${args.value || 'tab1'}"
        ?disabled="${args.disabled}"
        orientation="${args.orientation || 'horizontal'}"
      >
        <wc-tabs-list>
          <wc-tabs-trigger value="tab1">Account</wc-tabs-trigger>
          <wc-tabs-trigger value="tab2">Password</wc-tabs-trigger>
          <wc-tabs-trigger value="tab3">Notifications</wc-tabs-trigger>
        </wc-tabs-list>
        <wc-tabs-content value="tab1">
          <div class="content-section">
            <h3>Account Settings</h3>
            <p>
              Make changes to your account here. Click save when you're done. This is the
              content for the Account tab.
            </p>
          </div>
        </wc-tabs-content>
        <wc-tabs-content value="tab2">
          <div class="content-section">
            <h3>Password Settings</h3>
            <p>
              Change your password here. Make sure to use a strong password with a mix of
              letters, numbers, and symbols.
            </p>
          </div>
        </wc-tabs-content>
        <wc-tabs-content value="tab3">
          <div class="content-section">
            <h3>Notification Preferences</h3>
            <p>
              Manage your notification settings. Choose what updates you want to receive
              and how often.
            </p>
          </div>
        </wc-tabs-content>
      </wc-tabs>
    </div>
  `,
  argTypes: {
    value: {
      control: 'text',
      description: 'The controlled active tab value',
      table: {
        defaultValue: { summary: '' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'When true, prevents the user from interacting with the tabs',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the tabs',
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default horizontal tabs.
 */
export const Default: Story = {
  args: {
    value: 'tab1',
    disabled: false,
    orientation: 'horizontal',
  },
};

/**
 * Tabs with a different default active tab.
 */
export const DifferentDefaultTab: Story = {
  args: {
    value: 'tab2',
  },
};

/**
 * Vertical orientation tabs.
 */
export const Vertical: Story = {
  args: {
    value: 'tab1',
    orientation: 'vertical',
  },
};

/**
 * Disabled tabs that cannot be interacted with.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/**
 * Tabs with rich content including forms.
 */
export const WithForms: Story = {
  render: () => html`
    ${tabsStyles}
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
        max-width: 300px;
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

      .save-button {
        display: inline-flex;
        align-items: center;
        padding: 0.5rem 1rem;
        background: #0066cc;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
      }

      .save-button:hover {
        background: #0052a3;
      }
    </style>
    <div class="demo-container">
      <wc-tabs value="account">
        <wc-tabs-list>
          <wc-tabs-trigger value="account">Account</wc-tabs-trigger>
          <wc-tabs-trigger value="password">Password</wc-tabs-trigger>
        </wc-tabs-list>
        <wc-tabs-content value="account">
          <form>
            <div class="form-field">
              <label for="name">Name</label>
              <input id="name" type="text" value="John Doe" />
            </div>
            <div class="form-field">
              <label for="email">Email</label>
              <input id="email" type="email" value="john@example.com" />
            </div>
            <button type="button" class="save-button">Save Changes</button>
          </form>
        </wc-tabs-content>
        <wc-tabs-content value="password">
          <form>
            <div class="form-field">
              <label for="current">Current Password</label>
              <input id="current" type="password" />
            </div>
            <div class="form-field">
              <label for="new">New Password</label>
              <input id="new" type="password" />
            </div>
            <div class="form-field">
              <label for="confirm">Confirm Password</label>
              <input id="confirm" type="password" />
            </div>
            <button type="button" class="save-button">Update Password</button>
          </form>
        </wc-tabs-content>
      </wc-tabs>
    </div>
  `,
};

/**
 * Tabs with event listener for tracking value changes.
 */
export const WithEventListener: Story = {
  render: () => {
    setTimeout(() => {
      const tabs = document.querySelector('wc-tabs');
      if (tabs) {
        tabs.addEventListener('value-change', (e: Event) => {
          const customEvent = e as CustomEvent;
          console.log('Tab changed:', customEvent.detail);
        });
      }
    }, 0);

    return html`
      ${tabsStyles}
      <div class="demo-container">
        <p style="margin-bottom: 1rem;">
          <strong>Note:</strong> Open the browser console to see value-change events.
        </p>
        <wc-tabs value="tab1">
          <wc-tabs-list>
            <wc-tabs-trigger value="tab1">Tab 1</wc-tabs-trigger>
            <wc-tabs-trigger value="tab2">Tab 2</wc-tabs-trigger>
            <wc-tabs-trigger value="tab3">Tab 3</wc-tabs-trigger>
          </wc-tabs-list>
          <wc-tabs-content value="tab1">Content for Tab 1</wc-tabs-content>
          <wc-tabs-content value="tab2">Content for Tab 2</wc-tabs-content>
          <wc-tabs-content value="tab3">Content for Tab 3</wc-tabs-content>
        </wc-tabs>
      </div>
    `;
  },
};

/**
 * Many tabs with overflow scrolling.
 */
export const ManyTabs: Story = {
  render: () => html`
    ${tabsStyles}
    <style>
      .scrollable-tabs wc-tabs-list {
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
      }
    </style>
    <div class="demo-container">
      <wc-tabs value="tab1" class="scrollable-tabs">
        <wc-tabs-list>
          <wc-tabs-trigger value="tab1">Dashboard</wc-tabs-trigger>
          <wc-tabs-trigger value="tab2">Analytics</wc-tabs-trigger>
          <wc-tabs-trigger value="tab3">Reports</wc-tabs-trigger>
          <wc-tabs-trigger value="tab4">Users</wc-tabs-trigger>
          <wc-tabs-trigger value="tab5">Settings</wc-tabs-trigger>
          <wc-tabs-trigger value="tab6">Billing</wc-tabs-trigger>
          <wc-tabs-trigger value="tab7">Integrations</wc-tabs-trigger>
          <wc-tabs-trigger value="tab8">API</wc-tabs-trigger>
        </wc-tabs-list>
        <wc-tabs-content value="tab1">Dashboard content</wc-tabs-content>
        <wc-tabs-content value="tab2">Analytics content</wc-tabs-content>
        <wc-tabs-content value="tab3">Reports content</wc-tabs-content>
        <wc-tabs-content value="tab4">Users content</wc-tabs-content>
        <wc-tabs-content value="tab5">Settings content</wc-tabs-content>
        <wc-tabs-content value="tab6">Billing content</wc-tabs-content>
        <wc-tabs-content value="tab7">Integrations content</wc-tabs-content>
        <wc-tabs-content value="tab8">API content</wc-tabs-content>
      </wc-tabs>
    </div>
  `,
};
