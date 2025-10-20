import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './toolbar.js';
import './toolbar-button.js';
import './toolbar-separator.js';
import './toolbar-toggle-group.js';
import './toolbar-toggle-item.js';

// Shared styles for all toolbar stories
const toolbarStyles = html`
  <style>
    wc-toolbar {
      display: flex;
      gap: 0.25rem;
      padding: 0.5rem;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      width: fit-content;
    }

    wc-toolbar[data-orientation='vertical'] {
      flex-direction: column;
    }

    wc-toolbar-button,
    wc-toolbar-toggle-item {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem 0.75rem;
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
      cursor: pointer;
      transition: all 0.15s;
      user-select: none;
      white-space: nowrap;
    }

    wc-toolbar-button:hover,
    wc-toolbar-toggle-item:hover {
      background: #f3f4f6;
      border-color: #d1d5db;
    }

    wc-toolbar-button:focus,
    wc-toolbar-toggle-item:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }

    wc-toolbar-toggle-item[data-state='on'] {
      background: #3b82f6;
      border-color: #3b82f6;
      color: white;
    }

    wc-toolbar-toggle-item[data-state='on']:hover {
      background: #2563eb;
      border-color: #2563eb;
    }

    wc-toolbar-button[data-disabled],
    wc-toolbar-toggle-item[data-disabled] {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    wc-toolbar-separator {
      width: 1px;
      background: #e5e7eb;
      margin: 0 0.25rem;
    }

    wc-toolbar[data-orientation='vertical'] wc-toolbar-separator {
      width: auto;
      height: 1px;
      margin: 0.25rem 0;
    }

    wc-toolbar-toggle-group {
      display: flex;
      gap: 0.25rem;
    }

    /* Demo container */
    .demo-container {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      align-items: flex-start;
    }

    .demo-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .demo-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #6b7280;
    }
  </style>
`;

/**
 * A container for grouping a set of controls, such as buttons, toggle buttons, or dropdown menus.
 *
 * The toolbar component is headless and provides no default styling. All visual appearance
 * must be controlled through CSS.
 */
const meta: Meta = {
  title: 'Components/Toolbar',
  tags: ['autodocs'],
  render: (args) => html`
    ${toolbarStyles}
    <div class="demo-container">
      <wc-toolbar
        orientation="${args.orientation || 'horizontal'}"
        ?disabled="${args.disabled}"
      >
        <wc-toolbar-button>Cut</wc-toolbar-button>
        <wc-toolbar-button>Copy</wc-toolbar-button>
        <wc-toolbar-button>Paste</wc-toolbar-button>
      </wc-toolbar>
    </div>
  `,
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the toolbar',
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'When true, prevents the user from interacting with the toolbar',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default horizontal toolbar with buttons.
 */
export const Default: Story = {
  args: {
    orientation: 'horizontal',
    disabled: false,
  },
};

/**
 * Vertical toolbar orientation.
 */
export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
};

/**
 * Disabled toolbar.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/**
 * Toolbar with separators between groups of buttons.
 */
export const WithSeparators: Story = {
  render: () => html`
    ${toolbarStyles}
    <div class="demo-container">
      <wc-toolbar>
        <wc-toolbar-button>Cut</wc-toolbar-button>
        <wc-toolbar-button>Copy</wc-toolbar-button>
        <wc-toolbar-button>Paste</wc-toolbar-button>
        <wc-toolbar-separator></wc-toolbar-separator>
        <wc-toolbar-button>Bold</wc-toolbar-button>
        <wc-toolbar-button>Italic</wc-toolbar-button>
        <wc-toolbar-button>Underline</wc-toolbar-button>
        <wc-toolbar-separator></wc-toolbar-separator>
        <wc-toolbar-button>Undo</wc-toolbar-button>
        <wc-toolbar-button>Redo</wc-toolbar-button>
      </wc-toolbar>
    </div>
  `,
};

/**
 * Toolbar with toggle groups for mutually exclusive options.
 */
export const WithToggleGroup: Story = {
  render: () => html`
    ${toolbarStyles}
    <div class="demo-container">
      <div class="demo-section">
        <span class="demo-label">Text alignment (single selection)</span>
        <wc-toolbar>
          <wc-toolbar-toggle-group type="single" value="left">
            <wc-toolbar-toggle-item value="left">Left</wc-toolbar-toggle-item>
            <wc-toolbar-toggle-item value="center">Center</wc-toolbar-toggle-item>
            <wc-toolbar-toggle-item value="right">Right</wc-toolbar-toggle-item>
            <wc-toolbar-toggle-item value="justify">Justify</wc-toolbar-toggle-item>
          </wc-toolbar-toggle-group>
        </wc-toolbar>
      </div>

      <div class="demo-section">
        <span class="demo-label">Text formatting (multiple selection)</span>
        <wc-toolbar>
          <wc-toolbar-toggle-group type="multiple">
            <wc-toolbar-toggle-item value="bold"><strong>B</strong></wc-toolbar-toggle-item>
            <wc-toolbar-toggle-item value="italic"><em>I</em></wc-toolbar-toggle-item>
            <wc-toolbar-toggle-item value="underline"><u>U</u></wc-toolbar-toggle-item>
            <wc-toolbar-toggle-item value="strikethrough"><s>S</s></wc-toolbar-toggle-item>
          </wc-toolbar-toggle-group>
        </wc-toolbar>
      </div>
    </div>
  `,
};

/**
 * Complex toolbar combining buttons, separators, and toggle groups.
 */
export const ComplexToolbar: Story = {
  render: () => html`
    ${toolbarStyles}
    <div class="demo-container">
      <wc-toolbar>
        <wc-toolbar-button>📄 New</wc-toolbar-button>
        <wc-toolbar-button>💾 Save</wc-toolbar-button>
        <wc-toolbar-separator></wc-toolbar-separator>
        <wc-toolbar-button>✂️ Cut</wc-toolbar-button>
        <wc-toolbar-button>📋 Copy</wc-toolbar-button>
        <wc-toolbar-button>📌 Paste</wc-toolbar-button>
        <wc-toolbar-separator></wc-toolbar-separator>
        <wc-toolbar-toggle-group type="multiple" value="bold">
          <wc-toolbar-toggle-item value="bold"><strong>B</strong></wc-toolbar-toggle-item>
          <wc-toolbar-toggle-item value="italic"><em>I</em></wc-toolbar-toggle-item>
          <wc-toolbar-toggle-item value="underline"><u>U</u></wc-toolbar-toggle-item>
        </wc-toolbar-toggle-group>
        <wc-toolbar-separator></wc-toolbar-separator>
        <wc-toolbar-toggle-group type="single" value="left">
          <wc-toolbar-toggle-item value="left">◀</wc-toolbar-toggle-item>
          <wc-toolbar-toggle-item value="center">▪</wc-toolbar-toggle-item>
          <wc-toolbar-toggle-item value="right">▶</wc-toolbar-toggle-item>
        </wc-toolbar-toggle-group>
        <wc-toolbar-separator></wc-toolbar-separator>
        <wc-toolbar-button>↶ Undo</wc-toolbar-button>
        <wc-toolbar-button>↷ Redo</wc-toolbar-button>
      </wc-toolbar>
    </div>
  `,
};

/**
 * Toolbar with keyboard navigation example.
 */
export const KeyboardNavigation: Story = {
  render: () => html`
    ${toolbarStyles}
    <div class="demo-container">
      <p style="margin-bottom: 1rem; color: #6b7280; max-width: 600px;">
        <strong>Keyboard navigation:</strong><br />
        • Use <kbd>Tab</kbd> to focus the toolbar<br />
        • Use <kbd>Arrow keys</kbd> to navigate between items<br />
        • Use <kbd>Enter</kbd> or <kbd>Space</kbd> to activate items<br />
        • Use <kbd>Home</kbd> to go to first item<br />
        • Use <kbd>End</kbd> to go to last item
      </p>
      <wc-toolbar>
        <wc-toolbar-button>Button 1</wc-toolbar-button>
        <wc-toolbar-button>Button 2</wc-toolbar-button>
        <wc-toolbar-button>Button 3</wc-toolbar-button>
        <wc-toolbar-separator></wc-toolbar-separator>
        <wc-toolbar-toggle-group type="single">
          <wc-toolbar-toggle-item value="a">A</wc-toolbar-toggle-item>
          <wc-toolbar-toggle-item value="b">B</wc-toolbar-toggle-item>
          <wc-toolbar-toggle-item value="c">C</wc-toolbar-toggle-item>
        </wc-toolbar-toggle-group>
      </wc-toolbar>
    </div>
  `,
};

/**
 * Toolbar with event listeners for tracking interactions.
 */
export const WithEventListeners: Story = {
  render: () => {
    setTimeout(() => {
      const toggleGroup = document.querySelector('wc-toolbar-toggle-group');
      const buttons = document.querySelectorAll('wc-toolbar-button');
      
      if (toggleGroup) {
        toggleGroup.addEventListener('value-change', (e: Event) => {
          const customEvent = e as CustomEvent;
          console.log('Toggle group value changed:', customEvent.detail);
        });
      }

      buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
          console.log(`Button ${index + 1} clicked`);
        });
      });
    }, 0);

    return html`
      ${toolbarStyles}
      <div class="demo-container">
        <p style="margin-bottom: 1rem; color: #6b7280;">
          <strong>Note:</strong> Open the browser console to see events.
        </p>
        <wc-toolbar>
          <wc-toolbar-button>Action 1</wc-toolbar-button>
          <wc-toolbar-button>Action 2</wc-toolbar-button>
          <wc-toolbar-separator></wc-toolbar-separator>
          <wc-toolbar-toggle-group type="single">
            <wc-toolbar-toggle-item value="option1">Option 1</wc-toolbar-toggle-item>
            <wc-toolbar-toggle-item value="option2">Option 2</wc-toolbar-toggle-item>
            <wc-toolbar-toggle-item value="option3">Option 3</wc-toolbar-toggle-item>
          </wc-toolbar-toggle-group>
        </wc-toolbar>
      </div>
    `;
  },
};

/**
 * Toolbar with disabled items.
 */
export const WithDisabledItems: Story = {
  render: () => html`
    ${toolbarStyles}
    <div class="demo-container">
      <wc-toolbar>
        <wc-toolbar-button>Enabled</wc-toolbar-button>
        <wc-toolbar-button disabled>Disabled</wc-toolbar-button>
        <wc-toolbar-button>Enabled</wc-toolbar-button>
        <wc-toolbar-separator></wc-toolbar-separator>
        <wc-toolbar-toggle-group type="single">
          <wc-toolbar-toggle-item value="a">A</wc-toolbar-toggle-item>
          <wc-toolbar-toggle-item value="b" disabled>B (Disabled)</wc-toolbar-toggle-item>
          <wc-toolbar-toggle-item value="c">C</wc-toolbar-toggle-item>
        </wc-toolbar-toggle-group>
      </wc-toolbar>
    </div>
  `,
};
