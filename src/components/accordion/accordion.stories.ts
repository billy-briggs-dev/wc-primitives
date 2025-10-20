import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './accordion.js';
import './accordion-item.js';
import './accordion-trigger.js';
import './accordion-content.js';

// Shared styles for all accordion stories
const accordionStyles = html`
  <style>
    wc-accordion {
      display: block;
      border: 1px solid #e5e5e5;
      border-radius: 6px;
      overflow: hidden;
      max-width: 600px;
    }

    wc-accordion-item {
      display: block;
      border-bottom: 1px solid #e5e5e5;
    }

    wc-accordion-item:last-child {
      border-bottom: none;
    }

    wc-accordion-trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 1rem 1.25rem;
      background: white;
      border: none;
      text-align: left;
      font-size: 1rem;
      font-weight: 500;
      color: #333;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    wc-accordion-trigger:hover {
      background-color: #f9f9f9;
    }

    wc-accordion-trigger[data-state='open'] {
      background-color: #f9f9f9;
    }

    wc-accordion-trigger:focus {
      outline: 2px solid #0066cc;
      outline-offset: -2px;
    }

    wc-accordion-trigger[data-disabled] {
      cursor: not-allowed;
      opacity: 0.5;
    }

    wc-accordion-trigger::after {
      content: '▼';
      font-size: 0.75rem;
      transition: transform 0.2s;
    }

    wc-accordion-trigger[data-state='open']::after {
      transform: rotate(180deg);
    }

    wc-accordion-content {
      display: block;
      padding: 0 1.25rem 1rem 1.25rem;
      color: #666;
      line-height: 1.6;
    }

    wc-accordion-content[data-state='closed'] {
      display: none;
    }

    wc-accordion-content[data-state='open'] {
      animation: slideDown 0.2s ease-out;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  </style>
`;

/**
 * A vertically stacked set of interactive headings that each reveal an associated section of content.
 * 
 * The accordion component is headless and provides no default styling. All visual appearance
 * must be controlled through CSS.
 */
const meta: Meta = {
  title: 'Components/Accordion',
  tags: ['autodocs'],
  render: (args) => html`
    ${accordionStyles}
    <wc-accordion 
      type="${args.type || 'single'}"
      ?collapsible="${args.collapsible}"
      ?disabled="${args.disabled}"
      value="${args.value || ''}"
    >
      <wc-accordion-item value="item-1">
        <wc-accordion-trigger>What is WC Primitives?</wc-accordion-trigger>
        <wc-accordion-content>
          WC Primitives is a library of headless web components built with Lit 3. 
          These components are framework-agnostic and provide accessible, composable UI primitives.
        </wc-accordion-content>
      </wc-accordion-item>
      
      <wc-accordion-item value="item-2">
        <wc-accordion-trigger>Why headless components?</wc-accordion-trigger>
        <wc-accordion-content>
          Headless components provide behavior and accessibility without imposing styles. 
          This gives you complete control over the appearance while ensuring proper functionality 
          and accessibility out of the box.
        </wc-accordion-content>
      </wc-accordion-item>
      
      <wc-accordion-item value="item-3">
        <wc-accordion-trigger>How do I use them?</wc-accordion-trigger>
        <wc-accordion-content>
          Simply import the components in your HTML or JavaScript, then style them with CSS. 
          They work in any framework (React, Vue, Angular, etc.) or vanilla JavaScript.
        </wc-accordion-content>
      </wc-accordion-item>
    </wc-accordion>
  `,
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Whether one or multiple items can be open at the same time',
      table: {
        defaultValue: { summary: 'single' },
      },
    },
    collapsible: {
      control: 'boolean',
      description: 'When type is "single", allows closing content when clicking trigger for an open item',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'When true, prevents the user from interacting with the accordion',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    value: {
      control: 'text',
      description: 'The controlled open item(s). For single type use a string, for multiple use comma-separated values',
      table: {
        defaultValue: { summary: '' },
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Single mode allows only one item to be open at a time. With collapsible enabled,
 * clicking an open item will close it.
 */
export const SingleCollapsible: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
};

/**
 * Single mode without collapsible requires at least one item to remain open.
 */
export const SingleNonCollapsible: Story = {
  args: {
    type: 'single',
    collapsible: false,
  },
};

/**
 * Multiple mode allows several items to be open at the same time.
 */
export const Multiple: Story = {
  args: {
    type: 'multiple',
  },
};

/**
 * When disabled, the entire accordion is non-interactive.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/**
 * You can control which items are open by setting the value property.
 */
export const ControlledSingle: Story = {
  args: {
    type: 'single',
    value: 'item-2',
  },
};

/**
 * For multiple mode, you can control multiple open items using comma-separated values.
 */
export const ControlledMultiple: Story = {
  args: {
    type: 'multiple',
    value: 'item-1,item-3',
  },
};

/**
 * Example showing how to listen to value changes.
 */
export const WithEventListener: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
  render: (args) => {
    setTimeout(() => {
      const accordion = document.querySelector('wc-accordion');
      if (accordion) {
        accordion.addEventListener('value-change', (e: Event) => {
          const customEvent = e as CustomEvent;
          console.log('Accordion value changed:', customEvent.detail);
        });
      }
    }, 0);
    
    return html`
      ${accordionStyles}
      <p><strong>Note:</strong> Open the browser console to see value-change events.</p>
      <wc-accordion 
        type="${args.type}"
        ?collapsible="${args.collapsible}"
      >
        <wc-accordion-item value="item-1">
          <wc-accordion-trigger>What is WC Primitives?</wc-accordion-trigger>
          <wc-accordion-content>
            WC Primitives is a library of headless web components built with Lit 3. 
            These components are framework-agnostic and provide accessible, composable UI primitives.
          </wc-accordion-content>
        </wc-accordion-item>
        
        <wc-accordion-item value="item-2">
          <wc-accordion-trigger>Why headless components?</wc-accordion-trigger>
          <wc-accordion-content>
            Headless components provide behavior and accessibility without imposing styles. 
            This gives you complete control over the appearance while ensuring proper functionality 
            and accessibility out of the box.
          </wc-accordion-content>
        </wc-accordion-item>
        
        <wc-accordion-item value="item-3">
          <wc-accordion-trigger>How do I use them?</wc-accordion-trigger>
          <wc-accordion-content>
            Simply import the components in your HTML or JavaScript, then style them with CSS. 
            They work in any framework (React, Vue, Angular, etc.) or vanilla JavaScript.
          </wc-accordion-content>
        </wc-accordion-item>
      </wc-accordion>
    `;
  },
};
