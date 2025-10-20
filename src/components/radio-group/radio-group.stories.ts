import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './radio-group.js';
import './radio-group-item.js';

// Shared styles for all radio group stories
const radioGroupStyles = html`
  <style>
    wc-radio-group {
      display: flex;
      gap: 0.75rem;
    }

    wc-radio-group[data-orientation='vertical'] {
      flex-direction: column;
    }

    wc-radio-group[data-orientation='horizontal'] {
      flex-direction: row;
    }

    wc-radio-group-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      background: #f9fafb;
      border: 2px solid #e5e7eb;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
      user-select: none;
      position: relative;
    }

    wc-radio-group-item:hover {
      background: #f3f4f6;
      border-color: #d1d5db;
    }

    wc-radio-group-item:focus {
      outline: 2px solid #0066cc;
      outline-offset: 2px;
    }

    wc-radio-group-item[data-state='checked'] {
      background: #eff6ff;
      border-color: #0066cc;
      color: #0066cc;
    }

    wc-radio-group-item[data-disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Radio indicator (visual circle) */
    wc-radio-group-item::before {
      content: '';
      width: 18px;
      height: 18px;
      border: 2px solid #9ca3af;
      border-radius: 50%;
      transition: all 0.2s;
    }

    wc-radio-group-item[data-state='checked']::before {
      border-color: #0066cc;
      border-width: 6px;
    }

    /* Demo container */
    .demo-container {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .radio-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .radio-label {
      font-size: 0.875rem;
      font-weight: 600;
      color: #374151;
    }

    .radio-description {
      font-size: 0.875rem;
      color: #6b7280;
      margin-top: 0.25rem;
    }

    .selected-value {
      margin-top: 1rem;
      padding: 0.75rem;
      background: #f3f4f6;
      border-radius: 6px;
      font-size: 0.875rem;
      color: #374151;
    }

    .selected-value strong {
      color: #111827;
    }
  </style>
`;

/**
 * A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.
 *
 * The radio group component is headless and provides no default styling. All visual appearance
 * must be controlled through CSS.
 */
const meta: Meta = {
  title: 'Components/Radio Group',
  tags: ['autodocs'],
  render: () => html``,
  argTypes: {},
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    ${radioGroupStyles}
    <div class="demo-container">
      <div class="radio-section">
        <label class="radio-label">Choose your favorite option</label>
        <wc-radio-group value="option1">
          <wc-radio-group-item value="option1">Option 1</wc-radio-group-item>
          <wc-radio-group-item value="option2">Option 2</wc-radio-group-item>
          <wc-radio-group-item value="option3">Option 3</wc-radio-group-item>
        </wc-radio-group>
      </div>
    </div>
  `,
};

export const Horizontal: Story = {
  render: () => html`
    ${radioGroupStyles}
    <div class="demo-container">
      <div class="radio-section">
        <label class="radio-label">Horizontal orientation</label>
        <wc-radio-group value="small" orientation="horizontal">
          <wc-radio-group-item value="small">Small</wc-radio-group-item>
          <wc-radio-group-item value="medium">Medium</wc-radio-group-item>
          <wc-radio-group-item value="large">Large</wc-radio-group-item>
        </wc-radio-group>
      </div>
    </div>
  `,
};

export const WithDisabledItems: Story = {
  render: () => html`
    ${radioGroupStyles}
    <div class="demo-container">
      <div class="radio-section">
        <label class="radio-label">With disabled items</label>
        <wc-radio-group value="option1">
          <wc-radio-group-item value="option1">Option 1</wc-radio-group-item>
          <wc-radio-group-item value="option2" disabled>
            Option 2 (Disabled)
          </wc-radio-group-item>
          <wc-radio-group-item value="option3">Option 3</wc-radio-group-item>
        </wc-radio-group>
      </div>
    </div>
  `,
};

export const DisabledGroup: Story = {
  render: () => html`
    ${radioGroupStyles}
    <div class="demo-container">
      <div class="radio-section">
        <label class="radio-label">Disabled group</label>
        <wc-radio-group value="option2" disabled>
          <wc-radio-group-item value="option1">Option 1</wc-radio-group-item>
          <wc-radio-group-item value="option2">Option 2</wc-radio-group-item>
          <wc-radio-group-item value="option3">Option 3</wc-radio-group-item>
        </wc-radio-group>
      </div>
    </div>
  `,
};

export const Interactive: Story = {
  render: () => {
    const handleChange = (e: Event) => {
      const target = e.target as unknown as RadioGroupElement;
      const valueDisplay = document.querySelector('#selected-value');
      if (valueDisplay) {
        valueDisplay.textContent = target.value || 'None';
      }
    };

    setTimeout(() => {
      const radioGroup = document.querySelector('#interactive-radio-group');
      if (radioGroup) {
        radioGroup.addEventListener('value-change', handleChange);
      }
    }, 0);

    return html`
      ${radioGroupStyles}
      <div class="demo-container">
        <div class="radio-section">
          <label class="radio-label">Interactive example</label>
          <p class="radio-description">
            Select an option to see the value change
          </p>
          <wc-radio-group id="interactive-radio-group" value="default">
            <wc-radio-group-item value="default">Default</wc-radio-group-item>
            <wc-radio-group-item value="comfortable">
              Comfortable
            </wc-radio-group-item>
            <wc-radio-group-item value="compact">Compact</wc-radio-group-item>
          </wc-radio-group>
          <div class="selected-value">
            Selected value: <strong id="selected-value">default</strong>
          </div>
        </div>
      </div>
    `;
  },
};

export const WithDescriptions: Story = {
  render: () => html`
    ${radioGroupStyles}
    <style>
      .radio-option {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }

      .radio-option-title {
        font-weight: 500;
        color: #111827;
      }

      .radio-option-desc {
        font-size: 0.8125rem;
        color: #6b7280;
      }
    </style>
    <div class="demo-container">
      <div class="radio-section">
        <label class="radio-label">Choose a plan</label>
        <wc-radio-group value="pro">
          <wc-radio-group-item value="free">
            <div class="radio-option">
              <span class="radio-option-title">Free</span>
              <span class="radio-option-desc">Basic features for individuals</span>
            </div>
          </wc-radio-group-item>
          <wc-radio-group-item value="pro">
            <div class="radio-option">
              <span class="radio-option-title">Pro</span>
              <span class="radio-option-desc">Advanced features for professionals</span>
            </div>
          </wc-radio-group-item>
          <wc-radio-group-item value="enterprise">
            <div class="radio-option">
              <span class="radio-option-title">Enterprise</span>
              <span class="radio-option-desc">Custom solutions for organizations</span>
            </div>
          </wc-radio-group-item>
        </wc-radio-group>
      </div>
    </div>
  `,
};

export const Styled: Story = {
  render: () => html`
    ${radioGroupStyles}
    <style>
      /* Card-style radio */
      .card-radio wc-radio-group-item {
        padding: 1.25rem;
        background: white;
        border: 2px solid #e5e7eb;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      }

      .card-radio wc-radio-group-item[data-state='checked'] {
        border-color: #0066cc;
        box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
      }

      /* Pill-style radio */
      .pill-radio wc-radio-group-item {
        border-radius: 9999px;
        padding: 0.5rem 1.25rem;
      }

      .pill-radio wc-radio-group-item::before {
        display: none;
      }

      /* Minimal radio */
      .minimal-radio wc-radio-group-item {
        background: transparent;
        border: none;
        padding: 0.5rem 0.75rem;
      }

      .minimal-radio wc-radio-group-item:hover {
        background: #f3f4f6;
      }

      .minimal-radio wc-radio-group-item[data-state='checked'] {
        background: #eff6ff;
      }
    </style>
    <div class="demo-container">
      <div class="radio-section card-radio">
        <label class="radio-label">Card style</label>
        <wc-radio-group value="card2">
          <wc-radio-group-item value="card1">Card Option 1</wc-radio-group-item>
          <wc-radio-group-item value="card2">Card Option 2</wc-radio-group-item>
          <wc-radio-group-item value="card3">Card Option 3</wc-radio-group-item>
        </wc-radio-group>
      </div>

      <div class="radio-section pill-radio">
        <label class="radio-label">Pill style</label>
        <wc-radio-group value="pill2" orientation="horizontal">
          <wc-radio-group-item value="pill1">Small</wc-radio-group-item>
          <wc-radio-group-item value="pill2">Medium</wc-radio-group-item>
          <wc-radio-group-item value="pill3">Large</wc-radio-group-item>
        </wc-radio-group>
      </div>

      <div class="radio-section minimal-radio">
        <label class="radio-label">Minimal style</label>
        <wc-radio-group value="min1">
          <wc-radio-group-item value="min1">Minimal 1</wc-radio-group-item>
          <wc-radio-group-item value="min2">Minimal 2</wc-radio-group-item>
          <wc-radio-group-item value="min3">Minimal 3</wc-radio-group-item>
        </wc-radio-group>
      </div>
    </div>
  `,
};
