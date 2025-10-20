import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './checkbox.js';
import type { CheckboxElement } from './checkbox.js';

// Shared styles for all checkbox stories
const checkboxStyles = html`
  <style>
    .demo-container {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .demo-section {
      padding: 2rem;
    }

    .demo-section h3 {
      margin-bottom: 1rem;
      font-size: 1rem;
      font-weight: 600;
      color: #374151;
    }

    /* Basic checkbox styling */
    wc-checkbox {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border: 2px solid #d1d5db;
      border-radius: 4px;
      background: white;
      cursor: pointer;
      transition: all 0.2s;
    }

    wc-checkbox:hover {
      border-color: #0066cc;
      background: #f3f4f6;
    }

    wc-checkbox:focus {
      outline: 2px solid #0066cc;
      outline-offset: 2px;
    }

    wc-checkbox[data-state='checked'],
    wc-checkbox[data-state='indeterminate'] {
      background: #0066cc;
      border-color: #0066cc;
      color: white;
    }

    wc-checkbox[data-disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Checkbox indicator (icon) */
    .checkbox-indicator {
      display: none;
      width: 16px;
      height: 16px;
    }

    wc-checkbox[data-state='checked'] .checkbox-indicator,
    wc-checkbox[data-state='indeterminate'] .checkbox-indicator {
      display: block;
    }

    /* Label styles */
    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }

    .checkbox-label span {
      font-size: 0.9375rem;
      color: #374151;
      user-select: none;
    }

    .checkbox-label wc-checkbox[data-disabled] + span {
      color: #9ca3af;
      cursor: not-allowed;
    }

    /* Size variants */
    .checkbox-small {
      width: 18px;
      height: 18px;
    }

    .checkbox-small .checkbox-indicator {
      width: 12px;
      height: 12px;
    }

    .checkbox-large {
      width: 32px;
      height: 32px;
    }

    .checkbox-large .checkbox-indicator {
      width: 20px;
      height: 20px;
    }

    /* Group styles */
    .checkbox-group {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      padding: 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
    }

    .checkbox-group-title {
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #374151;
    }

    .checkbox-child {
      margin-left: 1.5rem;
    }
  </style>
`;

/**
 * A control that allows the user to toggle between checked and not checked.
 *
 * The checkbox component is headless and provides no default styling. All visual appearance
 * must be controlled through CSS.
 */
const meta: Meta = {
  title: 'Components/Checkbox',
  tags: ['autodocs'],
  render: (args) => html`
    ${checkboxStyles}
    <div class="demo-container">
      <label class="checkbox-label">
        <wc-checkbox
          ?checked="${args.checked}"
          ?indeterminate="${args.indeterminate}"
          ?disabled="${args.disabled}"
          ?required="${args.required}"
        >
          <svg class="checkbox-indicator" viewBox="0 0 16 16" fill="currentColor">
            ${args.indeterminate
              ? html`<path d="M3 8h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`
              : html`<path d="M13.5 3.5L6 11L2.5 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`
            }
          </svg>
        </wc-checkbox>
        <span>Checkbox label</span>
      </label>
    </div>
  `,
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'The checked state of the checkbox',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    indeterminate: {
      control: 'boolean',
      description: 'The indeterminate state of the checkbox',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'When true, prevents the user from interacting with the checkbox',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: 'When true, the checkbox must be checked',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default unchecked checkbox.
 */
export const Default: Story = {
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    required: false,
  },
};

/**
 * Checked checkbox.
 */
export const Checked: Story = {
  args: {
    checked: true,
  },
};

/**
 * Indeterminate checkbox (useful for parent checkboxes).
 */
export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
};

/**
 * Disabled checkbox that cannot be interacted with.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/**
 * Disabled checked checkbox.
 */
export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
  },
};

/**
 * Different checkbox sizes.
 */
export const Sizes: Story = {
  render: () => html`
    ${checkboxStyles}
    <div class="demo-container">
      <label class="checkbox-label">
        <wc-checkbox class="checkbox-small" checked>
          <svg class="checkbox-indicator" viewBox="0 0 16 16" fill="none">
            <path d="M13.5 3.5L6 11L2.5 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </wc-checkbox>
        <span>Small</span>
      </label>

      <label class="checkbox-label">
        <wc-checkbox checked>
          <svg class="checkbox-indicator" viewBox="0 0 16 16" fill="none">
            <path d="M13.5 3.5L6 11L2.5 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </wc-checkbox>
        <span>Default</span>
      </label>

      <label class="checkbox-label">
        <wc-checkbox class="checkbox-large" checked>
          <svg class="checkbox-indicator" viewBox="0 0 16 16" fill="none">
            <path d="M13.5 3.5L6 11L2.5 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </wc-checkbox>
        <span>Large</span>
      </label>
    </div>
  `,
};

/**
 * Checkbox with label.
 */
export const WithLabel: Story = {
  render: () => html`
    ${checkboxStyles}
    <div class="demo-container">
      <label class="checkbox-label">
        <wc-checkbox>
          <svg class="checkbox-indicator" viewBox="0 0 16 16" fill="none">
            <path d="M13.5 3.5L6 11L2.5 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </wc-checkbox>
        <span>Accept terms and conditions</span>
      </label>

      <label class="checkbox-label">
        <wc-checkbox checked>
          <svg class="checkbox-indicator" viewBox="0 0 16 16" fill="none">
            <path d="M13.5 3.5L6 11L2.5 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </wc-checkbox>
        <span>Subscribe to newsletter</span>
      </label>

      <label class="checkbox-label">
        <wc-checkbox disabled>
          <svg class="checkbox-indicator" viewBox="0 0 16 16" fill="none">
            <path d="M13.5 3.5L6 11L2.5 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </wc-checkbox>
        <span>Not available (disabled)</span>
      </label>
    </div>
  `,
};

/**
 * Checkbox group with parent/child checkboxes.
 */
export const CheckboxGroup: Story = {
  render: () => {
    // Simple handler to demonstrate parent/child relationship
    setTimeout(() => {
      const parent = document.querySelector('#parent-checkbox') as CheckboxElement;
      const children = document.querySelectorAll('.child-checkbox') as NodeListOf<CheckboxElement>;
      
      if (parent && children.length > 0) {
        parent.addEventListener('checked-change', () => {
          children.forEach((child: CheckboxElement) => {
            child.checked = parent.checked;
          });
        });

        children.forEach((child: CheckboxElement) => {
          child.addEventListener('checked-change', () => {
            const allChecked = Array.from(children).every((c: CheckboxElement) => c.checked);
            const someChecked = Array.from(children).some((c: CheckboxElement) => c.checked);
            
            if (allChecked) {
              parent.checked = true;
              parent.indeterminate = false;
            } else if (someChecked) {
              parent.checked = false;
              parent.indeterminate = true;
            } else {
              parent.checked = false;
              parent.indeterminate = false;
            }
          });
        });
      }
    }, 100);

    return html`
      ${checkboxStyles}
      <div class="demo-section">
        <div class="checkbox-group">
          <label class="checkbox-label">
            <wc-checkbox id="parent-checkbox" indeterminate>
              <svg class="checkbox-indicator" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </wc-checkbox>
            <span class="checkbox-group-title">Select all features</span>
          </label>

          <label class="checkbox-label checkbox-child">
            <wc-checkbox class="child-checkbox">
              <svg class="checkbox-indicator" viewBox="0 0 16 16" fill="none">
                <path d="M13.5 3.5L6 11L2.5 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </wc-checkbox>
            <span>Dark mode</span>
          </label>

          <label class="checkbox-label checkbox-child">
            <wc-checkbox class="child-checkbox" checked>
              <svg class="checkbox-indicator" viewBox="0 0 16 16" fill="none">
                <path d="M13.5 3.5L6 11L2.5 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </wc-checkbox>
            <span>Notifications</span>
          </label>

          <label class="checkbox-label checkbox-child">
            <wc-checkbox class="child-checkbox">
              <svg class="checkbox-indicator" viewBox="0 0 16 16" fill="none">
                <path d="M13.5 3.5L6 11L2.5 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </wc-checkbox>
            <span>Auto-save</span>
          </label>
        </div>
      </div>
    `;
  },
};

/**
 * Checkbox with event listener for tracking state changes.
 */
export const WithEventListener: Story = {
  render: () => {
    setTimeout(() => {
      const checkbox = document.querySelector('#event-checkbox');
      if (checkbox) {
        checkbox.addEventListener('checked-change', (e: Event) => {
          const customEvent = e as CustomEvent;
          console.log('Checkbox state changed:', customEvent.detail);
        });
      }
    }, 0);

    return html`
      ${checkboxStyles}
      <div class="demo-container">
        <p style="margin-bottom: 1rem;">
          <strong>Note:</strong> Open the browser console to see checked-change events.
        </p>
        <label class="checkbox-label">
          <wc-checkbox id="event-checkbox">
            <svg class="checkbox-indicator" viewBox="0 0 16 16" fill="none">
              <path d="M13.5 3.5L6 11L2.5 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </wc-checkbox>
          <span>Toggle me and check console</span>
        </label>
      </div>
    `;
  },
};

/**
 * Form integration example.
 */
export const FormIntegration: Story = {
  render: () => html`
    ${checkboxStyles}
    <style>
      .form-example {
        padding: 2rem;
        max-width: 400px;
      }

      .form-group {
        margin-bottom: 1.5rem;
      }

      .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: #374151;
      }

      .form-actions {
        display: flex;
        gap: 0.75rem;
        margin-top: 1.5rem;
      }

      button {
        padding: 0.5rem 1rem;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        background: white;
        cursor: pointer;
        font-size: 0.9375rem;
      }

      button[type="submit"] {
        background: #0066cc;
        color: white;
        border-color: #0066cc;
      }
    </style>
    <div class="form-example">
      <form>
        <div class="form-group">
          <label class="checkbox-label">
            <wc-checkbox name="terms" value="accepted" required>
              <svg class="checkbox-indicator" viewBox="0 0 16 16" fill="none">
                <path d="M13.5 3.5L6 11L2.5 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </wc-checkbox>
            <span>I agree to the terms and conditions *</span>
          </label>
        </div>

        <div class="form-group">
          <label class="checkbox-label">
            <wc-checkbox name="newsletter" value="yes">
              <svg class="checkbox-indicator" viewBox="0 0 16 16" fill="none">
                <path d="M13.5 3.5L6 11L2.5 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </wc-checkbox>
            <span>Subscribe to newsletter</span>
          </label>
        </div>

        <div class="form-actions">
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </div>
      </form>
    </div>
  `,
};
