import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './separator.js';

const separatorStyles = html`
  <style>
    .demo-container {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      max-width: 600px;
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

    .demo-content {
      padding: 1rem;
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
    }

    /* Horizontal separator styling */
    wc-separator[data-orientation='horizontal'] {
      display: block;
      width: 100%;
      height: 1px;
      background: #e5e7eb;
      margin: 1rem 0;
    }

    /* Vertical separator styling */
    wc-separator[data-orientation='vertical'] {
      display: inline-block;
      width: 1px;
      height: 2rem;
      background: #e5e7eb;
      margin: 0 1rem;
    }

    .horizontal-content {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .vertical-content {
      display: flex;
      align-items: center;
    }

    .text-content {
      color: #374151;
      line-height: 1.5;
    }

    .menu-item {
      padding: 0.5rem 0.75rem;
      cursor: pointer;
      border-radius: 4px;
      transition: background 0.15s;
    }

    .menu-item:hover {
      background: #f3f4f6;
    }
  </style>
`;

const meta: Meta = {
  title: 'Components/Separator',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Visually or semantically separates content. Can be horizontal or vertical, and can be decorative or semantic.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Horizontal: Story = {
  render: () => html`
    ${separatorStyles}
    <div class="demo-container">
      <div class="demo-section">
        <h3>Horizontal Separator</h3>
        <div class="demo-content">
          <div class="horizontal-content">
            <div class="text-content">
              This is some content above the separator.
            </div>
            <wc-separator></wc-separator>
            <div class="text-content">
              This is some content below the separator.
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

export const Vertical: Story = {
  render: () => html`
    ${separatorStyles}
    <div class="demo-container">
      <div class="demo-section">
        <h3>Vertical Separator</h3>
        <div class="demo-content">
          <div class="vertical-content">
            <span class="text-content">Left content</span>
            <wc-separator orientation="vertical"></wc-separator>
            <span class="text-content">Right content</span>
          </div>
        </div>
      </div>
    </div>
  `,
};

export const Decorative: Story = {
  render: () => html`
    ${separatorStyles}
    <div class="demo-container">
      <div class="demo-section">
        <h3>Decorative Separator</h3>
        <div class="demo-content">
          <div class="horizontal-content">
            <div class="text-content">
              A decorative separator is purely visual and won't be announced by screen readers.
            </div>
            <wc-separator decorative></wc-separator>
            <div class="text-content">
              Use <code>decorative</code> when the separation is obvious from context.
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

export const InMenu: Story = {
  render: () => html`
    ${separatorStyles}
    <div class="demo-container">
      <div class="demo-section">
        <h3>In a Menu</h3>
        <div class="demo-content">
          <div class="menu-item">New File</div>
          <div class="menu-item">Open File</div>
          <div class="menu-item">Save</div>
          <wc-separator></wc-separator>
          <div class="menu-item">Print</div>
          <wc-separator></wc-separator>
          <div class="menu-item">Exit</div>
        </div>
      </div>
    </div>
  `,
};

export const MultipleOrientations: Story = {
  render: () => html`
    ${separatorStyles}
    <style>
      .multi-demo {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
      }

      .toolbar {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 6px;
        width: fit-content;
      }

      .toolbar-button {
        padding: 0.5rem 0.75rem;
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.875rem;
      }

      .toolbar-button:hover {
        background: #f3f4f6;
      }

      .toolbar wc-separator {
        height: 1.5rem;
      }
    </style>
    <div class="demo-container">
      <div class="demo-section">
        <h3>Multiple Orientations</h3>
        <div class="multi-demo">
          <div class="text-content">Section 1</div>
          <wc-separator></wc-separator>
          <div class="text-content">Section 2</div>
          <wc-separator></wc-separator>
          <div class="toolbar">
            <button class="toolbar-button">Cut</button>
            <button class="toolbar-button">Copy</button>
            <wc-separator orientation="vertical"></wc-separator>
            <button class="toolbar-button">Paste</button>
          </div>
        </div>
      </div>
    </div>
  `,
};
