import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './select.js';
import './select-trigger.js';
import './select-value.js';
import './select-icon.js';
import './select-portal.js';
import './select-content.js';
import './select-viewport.js';
import './select-item.js';
import './select-item-text.js';
import './select-item-indicator.js';
import './select-group.js';
import './select-label.js';

const selectStyles = html`
  <style>
    .demo-container {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      min-height: 400px;
    }

    .demo-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .demo-section h3 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: #1f2937;
    }

    /* Select trigger styling */
    wc-select-trigger {
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      min-width: 200px;
      cursor: pointer;
      font-size: 0.875rem;
      transition: all 0.15s;
    }

    wc-select-trigger:hover {
      border-color: #d1d5db;
      background: #f9fafb;
    }

    wc-select-trigger:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
      border-color: #3b82f6;
    }

    wc-select[data-state='open'] wc-select-trigger {
      border-color: #3b82f6;
    }

    wc-select[data-disabled] wc-select-trigger {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Select value styling */
    wc-select-value {
      flex: 1;
      text-align: left;
      color: #1f2937;
    }

    wc-select-value[data-placeholder] {
      color: #9ca3af;
    }

    /* Select icon styling */
    wc-select-icon {
      display: inline-flex;
      color: #6b7280;
      transition: transform 0.15s;
    }

    wc-select[data-state='open'] wc-select-icon {
      transform: rotate(180deg);
    }

    /* Select content styling */
    wc-select-content {
      position: absolute;
      z-index: 50;
      margin-top: 0.25rem;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
      min-width: 200px;
      max-height: 300px;
      overflow: hidden;
    }

    wc-select-content[data-state='closed'] {
      display: none;
    }

    wc-select-content[data-state='open'] {
      display: block;
      animation: fadeIn 0.15s ease-in-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Select viewport styling */
    wc-select-viewport {
      display: block;
      padding: 0.25rem;
      max-height: 300px;
      overflow-y: auto;
    }

    /* Select item styling */
    wc-select-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0.75rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875rem;
      color: #374151;
      transition: background 0.15s;
      outline: none;
    }

    wc-select-item:hover {
      background: #f3f4f6;
    }

    wc-select-item:focus {
      background: #f3f4f6;
    }

    wc-select-item[data-state='checked'] {
      background: #eff6ff;
      color: #3b82f6;
      font-weight: 500;
    }

    wc-select-item[data-disabled] {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Select item text styling */
    wc-select-item-text {
      flex: 1;
    }

    /* Select item indicator styling */
    wc-select-item-indicator {
      display: inline-flex;
      color: #3b82f6;
    }

    /* Select group styling */
    wc-select-group {
      display: block;
    }

    /* Select label styling */
    wc-select-label {
      display: block;
      padding: 0.5rem 0.75rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    wc-select-label:not(:first-child) {
      margin-top: 0.5rem;
    }

    /* Separator between groups */
    wc-select-group + wc-select-group {
      border-top: 1px solid #e5e7eb;
      padding-top: 0.25rem;
      margin-top: 0.25rem;
    }

    /* Chevron icon */
    .chevron-icon {
      width: 1rem;
      height: 1rem;
      fill: currentColor;
    }

    /* Check icon */
    .check-icon {
      width: 1rem;
      height: 1rem;
      fill: currentColor;
    }
  </style>
`;

const chevronIcon = html`
  <svg class="chevron-icon" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
  </svg>
`;

const checkIcon = html`
  <svg class="check-icon" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
  </svg>
`;

const meta: Meta = {
  title: 'Components/Select',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A dropdown select component that allows users to pick a value from a list of options.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    ${selectStyles}
    <div class="demo-container">
      <div class="demo-section">
        <h3>Basic Select</h3>
        <wc-select>
          <wc-select-trigger>
            <wc-select-value placeholder="Select a fruit..."></wc-select-value>
            <wc-select-icon>${chevronIcon}</wc-select-icon>
          </wc-select-trigger>
          <wc-select-portal>
            <wc-select-content>
              <wc-select-viewport>
                <wc-select-item value="apple">
                  <wc-select-item-text>Apple</wc-select-item-text>
                  <wc-select-item-indicator>${checkIcon}</wc-select-item-indicator>
                </wc-select-item>
                <wc-select-item value="banana">
                  <wc-select-item-text>Banana</wc-select-item-text>
                  <wc-select-item-indicator>${checkIcon}</wc-select-item-indicator>
                </wc-select-item>
                <wc-select-item value="orange">
                  <wc-select-item-text>Orange</wc-select-item-text>
                  <wc-select-item-indicator>${checkIcon}</wc-select-item-indicator>
                </wc-select-item>
                <wc-select-item value="grape">
                  <wc-select-item-text>Grape</wc-select-item-text>
                  <wc-select-item-indicator>${checkIcon}</wc-select-item-indicator>
                </wc-select-item>
                <wc-select-item value="mango">
                  <wc-select-item-text>Mango</wc-select-item-text>
                  <wc-select-item-indicator>${checkIcon}</wc-select-item-indicator>
                </wc-select-item>
              </wc-select-viewport>
            </wc-select-content>
          </wc-select-portal>
        </wc-select>
      </div>
    </div>
  `,
};

export const WithInitialValue: Story = {
  render: () => html`
    ${selectStyles}
    <div class="demo-container">
      <div class="demo-section">
        <h3>With Initial Value</h3>
        <wc-select value="banana">
          <wc-select-trigger>
            <wc-select-value placeholder="Select a fruit..."></wc-select-value>
            <wc-select-icon>${chevronIcon}</wc-select-icon>
          </wc-select-trigger>
          <wc-select-portal>
            <wc-select-content>
              <wc-select-viewport>
                <wc-select-item value="apple">
                  <wc-select-item-text>Apple</wc-select-item-text>
                  <wc-select-item-indicator>${checkIcon}</wc-select-item-indicator>
                </wc-select-item>
                <wc-select-item value="banana">
                  <wc-select-item-text>Banana</wc-select-item-text>
                  <wc-select-item-indicator>${checkIcon}</wc-select-item-indicator>
                </wc-select-item>
                <wc-select-item value="orange">
                  <wc-select-item-text>Orange</wc-select-item-text>
                  <wc-select-item-indicator>${checkIcon}</wc-select-item-indicator>
                </wc-select-item>
              </wc-select-viewport>
            </wc-select-content>
          </wc-select-portal>
        </wc-select>
      </div>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => html`
    ${selectStyles}
    <div class="demo-container">
      <div class="demo-section">
        <h3>Disabled Select</h3>
        <wc-select disabled value="banana">
          <wc-select-trigger>
            <wc-select-value placeholder="Select a fruit..."></wc-select-value>
            <wc-select-icon>${chevronIcon}</wc-select-icon>
          </wc-select-trigger>
          <wc-select-portal>
            <wc-select-content>
              <wc-select-viewport>
                <wc-select-item value="apple">
                  <wc-select-item-text>Apple</wc-select-item-text>
                  <wc-select-item-indicator>${checkIcon}</wc-select-item-indicator>
                </wc-select-item>
                <wc-select-item value="banana">
                  <wc-select-item-text>Banana</wc-select-item-text>
                  <wc-select-item-indicator>${checkIcon}</wc-select-item-indicator>
                </wc-select-item>
                <wc-select-item value="orange">
                  <wc-select-item-text>Orange</wc-select-item-text>
                  <wc-select-item-indicator>${checkIcon}</wc-select-item-indicator>
                </wc-select-item>
              </wc-select-viewport>
            </wc-select-content>
          </wc-select-portal>
        </wc-select>
      </div>
    </div>
  `,
};

export const WithGroups: Story = {
  render: () => html`
    ${selectStyles}
    <div class="demo-container">
      <div class="demo-section">
        <h3>With Groups</h3>
        <wc-select>
          <wc-select-trigger>
            <wc-select-value placeholder="Select a food..."></wc-select-value>
            <wc-select-icon>${chevronIcon}</wc-select-icon>
          </wc-select-trigger>
          <wc-select-portal>
            <wc-select-content>
              <wc-select-viewport>
                <wc-select-group>
                  <wc-select-label>Fruits</wc-select-label>
                  <wc-select-item value="apple">
                    <wc-select-item-text>Apple</wc-select-item-text>
                    <wc-select-item-indicator>${checkIcon}</wc-select-item-indicator>
                  </wc-select-item>
                  <wc-select-item value="banana">
                    <wc-select-item-text>Banana</wc-select-item-text>
                    <wc-select-item-indicator>${checkIcon}</wc-select-item-indicator>
                  </wc-select-item>
                  <wc-select-item value="orange">
                    <wc-select-item-text>Orange</wc-select-item-text>
                    <wc-select-item-indicator>${checkIcon}</wc-select-item-indicator>
                  </wc-select-item>
                </wc-select-group>
                <wc-select-group>
                  <wc-select-label>Vegetables</wc-select-label>
                  <wc-select-item value="carrot">
                    <wc-select-item-text>Carrot</wc-select-item-text>
                    <wc-select-item-indicator>${checkIcon}</wc-select-item-indicator>
                  </wc-select-item>
                  <wc-select-item value="broccoli">
                    <wc-select-item-text>Broccoli</wc-select-item-text>
                    <wc-select-item-indicator>${checkIcon}</wc-select-item-indicator>
                  </wc-select-item>
                  <wc-select-item value="spinach">
                    <wc-select-item-text>Spinach</wc-select-item-text>
                    <wc-select-item-indicator>${checkIcon}</wc-select-item-indicator>
                  </wc-select-item>
                </wc-select-group>
              </wc-select-viewport>
            </wc-select-content>
          </wc-select-portal>
        </wc-select>
      </div>
    </div>
  `,
};

export const DisabledItems: Story = {
  render: () => html`
    ${selectStyles}
    <div class="demo-container">
      <div class="demo-section">
        <h3>With Disabled Items</h3>
        <wc-select>
          <wc-select-trigger>
            <wc-select-value placeholder="Select a fruit..."></wc-select-value>
            <wc-select-icon>${chevronIcon}</wc-select-icon>
          </wc-select-trigger>
          <wc-select-portal>
            <wc-select-content>
              <wc-select-viewport>
                <wc-select-item value="apple">
                  <wc-select-item-text>Apple</wc-select-item-text>
                  <wc-select-item-indicator>${checkIcon}</wc-select-item-indicator>
                </wc-select-item>
                <wc-select-item value="banana" disabled>
                  <wc-select-item-text>Banana (Out of stock)</wc-select-item-text>
                  <wc-select-item-indicator>${checkIcon}</wc-select-item-indicator>
                </wc-select-item>
                <wc-select-item value="orange">
                  <wc-select-item-text>Orange</wc-select-item-text>
                  <wc-select-item-indicator>${checkIcon}</wc-select-item-indicator>
                </wc-select-item>
                <wc-select-item value="grape" disabled>
                  <wc-select-item-text>Grape (Out of stock)</wc-select-item-text>
                  <wc-select-item-indicator>${checkIcon}</wc-select-item-indicator>
                </wc-select-item>
                <wc-select-item value="mango">
                  <wc-select-item-text>Mango</wc-select-item-text>
                  <wc-select-item-indicator>${checkIcon}</wc-select-item-indicator>
                </wc-select-item>
              </wc-select-viewport>
            </wc-select-content>
          </wc-select-portal>
        </wc-select>
      </div>
    </div>
  `,
};
