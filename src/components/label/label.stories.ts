import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './label.js';

const meta: Meta = {
  title: 'Components/Label',
  component: 'wc-label',
  tags: ['autodocs'],
  render: (args) => html`
    <style>
      .story-container {
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 20px;
        font-family: system-ui, -apple-system, sans-serif;
      }
      
      .form-field {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      wc-label {
        font-size: 14px;
        font-weight: 500;
        color: #1a1a1a;
        cursor: pointer;
      }

      input[type="text"],
      input[type="email"],
      textarea {
        padding: 8px 12px;
        border: 1px solid #d4d4d4;
        border-radius: 6px;
        font-size: 14px;
        font-family: inherit;
        outline: none;
        transition: border-color 0.2s;
      }

      input[type="text"]:focus,
      input[type="email"]:focus,
      textarea:focus {
        border-color: #2563eb;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
      }

      input[type="checkbox"],
      input[type="radio"] {
        width: 18px;
        height: 18px;
        cursor: pointer;
      }

      .checkbox-field,
      .radio-field {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
      }

      .checkbox-field wc-label,
      .radio-field wc-label {
        cursor: pointer;
      }

      .required::after {
        content: " *";
        color: #dc2626;
      }

      .help-text {
        font-size: 12px;
        color: #737373;
        margin-top: 4px;
      }
    </style>
    <div class="story-container">
      ${
        args.variant === 'text-input'
          ? html`
              <div class="form-field">
                <wc-label for="username">Username</wc-label>
                <input id="username" type="text" placeholder="Enter your username" />
              </div>
            `
          : args.variant === 'email-input'
            ? html`
                <div class="form-field">
                  <wc-label for="email" class="required">Email</wc-label>
                  <input id="email" type="email" placeholder="you@example.com" required />
                  <span class="help-text">We'll never share your email.</span>
                </div>
              `
            : args.variant === 'textarea'
              ? html`
                  <div class="form-field">
                    <wc-label for="message">Message</wc-label>
                    <textarea id="message" rows="4" placeholder="Enter your message"></textarea>
                  </div>
                `
              : args.variant === 'checkbox'
                ? html`
                    <div class="checkbox-field">
                      <input id="terms" type="checkbox" />
                      <wc-label for="terms">I agree to the terms and conditions</wc-label>
                    </div>
                  `
                : args.variant === 'radio'
                  ? html`
                      <div class="form-field">
                        <wc-label>Choose your plan</wc-label>
                        <div class="radio-field">
                          <input id="free" type="radio" name="plan" value="free" />
                          <wc-label for="free">Free</wc-label>
                        </div>
                        <div class="radio-field">
                          <input id="pro" type="radio" name="plan" value="pro" />
                          <wc-label for="pro">Pro</wc-label>
                        </div>
                        <div class="radio-field">
                          <input id="enterprise" type="radio" name="plan" value="enterprise" />
                          <wc-label for="enterprise">Enterprise</wc-label>
                        </div>
                      </div>
                    `
                  : html`
                      <div class="form-field">
                        <wc-label for="name">Name</wc-label>
                        <input id="name" type="text" placeholder="John Doe" />
                      </div>
                    `
      }
    </div>
  `,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['text-input', 'email-input', 'textarea', 'checkbox', 'radio'],
      description: 'The type of form control to demonstrate',
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Basic text input with label
 */
export const TextInput: Story = {
  args: {
    variant: 'text-input',
  },
};

/**
 * Email input with required indicator and help text
 */
export const EmailWithHelp: Story = {
  args: {
    variant: 'email-input',
  },
};

/**
 * Textarea with label
 */
export const Textarea: Story = {
  args: {
    variant: 'textarea',
  },
};

/**
 * Checkbox with label - clicking label toggles checkbox
 */
export const Checkbox: Story = {
  args: {
    variant: 'checkbox',
  },
};

/**
 * Radio buttons with labels
 */
export const RadioButtons: Story = {
  args: {
    variant: 'radio',
  },
};

/**
 * Complete form example with multiple labeled inputs
 */
export const CompleteForm: Story = {
  render: () => html`
    <style>
      .form-container {
        max-width: 400px;
        padding: 24px;
        background: #fafafa;
        border-radius: 8px;
        font-family: system-ui, -apple-system, sans-serif;
      }

      .form-title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 20px;
        color: #1a1a1a;
      }

      .form-field {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 16px;
      }

      wc-label {
        font-size: 14px;
        font-weight: 500;
        color: #1a1a1a;
        cursor: pointer;
      }

      input[type="text"],
      input[type="email"],
      textarea {
        padding: 10px 12px;
        border: 1px solid #d4d4d4;
        border-radius: 6px;
        font-size: 14px;
        font-family: inherit;
        outline: none;
        transition: border-color 0.2s;
      }

      input:focus,
      textarea:focus {
        border-color: #2563eb;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
      }

      .checkbox-field {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 16px;
      }

      input[type="checkbox"] {
        width: 18px;
        height: 18px;
        cursor: pointer;
      }

      .submit-button {
        width: 100%;
        padding: 10px 16px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: background 0.2s;
      }

      .submit-button:hover {
        background: #1d4ed8;
      }

      .required::after {
        content: " *";
        color: #dc2626;
      }
    </style>
    <form class="form-container" onsubmit="event.preventDefault(); alert('Form submitted!');">
      <h2 class="form-title">Contact Form</h2>

      <div class="form-field">
        <wc-label for="form-name" class="required">Name</wc-label>
        <input id="form-name" type="text" placeholder="John Doe" required />
      </div>

      <div class="form-field">
        <wc-label for="form-email" class="required">Email</wc-label>
        <input id="form-email" type="email" placeholder="you@example.com" required />
      </div>

      <div class="form-field">
        <wc-label for="form-message">Message</wc-label>
        <textarea id="form-message" rows="4" placeholder="Your message here..."></textarea>
      </div>

      <div class="checkbox-field">
        <input id="form-newsletter" type="checkbox" />
        <wc-label for="form-newsletter">Subscribe to newsletter</wc-label>
      </div>

      <button type="submit" class="submit-button">Submit</button>
    </form>
  `,
};
