import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './navigation-menu.js';
import './navigation-menu-list.js';
import './navigation-menu-item.js';
import './navigation-menu-trigger.js';
import './navigation-menu-content.js';
import './navigation-menu-link.js';

// Shared styles for all navigation menu stories
const navigationMenuStyles = html`
  <style>
    wc-navigation-menu {
      display: block;
      position: relative;
      width: 100%;
    }

    wc-navigation-menu-list {
      display: flex;
      gap: 1rem;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    wc-navigation-menu-item {
      position: relative;
    }

    wc-navigation-menu-trigger {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: transparent;
      border: none;
      border-radius: 6px;
      font-size: 0.9375rem;
      font-weight: 500;
      color: #374151;
      cursor: pointer;
      transition: all 0.2s;
      user-select: none;
    }

    wc-navigation-menu-trigger:hover {
      background: #f3f4f6;
      color: #111827;
    }

    wc-navigation-menu-trigger:focus {
      outline: 2px solid #0066cc;
      outline-offset: 2px;
    }

    wc-navigation-menu-trigger[data-state='open'] {
      background: #f3f4f6;
      color: #0066cc;
    }

    wc-navigation-menu-trigger[data-disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }

    wc-navigation-menu-content {
      position: absolute;
      top: 100%;
      left: 0;
      margin-top: 0.5rem;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
      padding: 0.5rem;
      min-width: 250px;
      z-index: 50;
    }

    wc-navigation-menu-content[hidden] {
      display: none;
    }

    wc-navigation-menu-link {
      display: block;
      padding: 0.75rem 1rem;
      color: #374151;
      text-decoration: none;
      border-radius: 6px;
      transition: all 0.2s;
      cursor: pointer;
    }

    wc-navigation-menu-link:hover {
      background: #f3f4f6;
      color: #111827;
    }

    wc-navigation-menu-link:focus {
      outline: 2px solid #0066cc;
      outline-offset: -2px;
    }

    wc-navigation-menu-link[data-disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Demo container */
    .demo-container {
      padding: 2rem;
      min-height: 400px;
    }

    .nav-section {
      margin-bottom: 2rem;
    }

    .section-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #111827;
      margin-bottom: 1rem;
    }

    .link-group {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .link-title {
      font-weight: 600;
      color: #111827;
    }

    .link-description {
      font-size: 0.875rem;
      color: #6b7280;
      margin-top: 0.25rem;
    }
  </style>
`;

/**
 * A collection of links for navigating websites.
 *
 * The navigation menu component is headless and provides no default styling. All visual appearance
 * must be controlled through CSS.
 */
const meta: Meta = {
  title: 'Components/Navigation Menu',
  tags: ['autodocs'],
  render: () => html``,
  argTypes: {},
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    ${navigationMenuStyles}
    <div class="demo-container">
      <wc-navigation-menu>
        <wc-navigation-menu-list>
          <wc-navigation-menu-item value="getting-started">
            <wc-navigation-menu-trigger>
              Getting Started
            </wc-navigation-menu-trigger>
            <wc-navigation-menu-content>
              <div class="link-group">
                <wc-navigation-menu-link href="/docs/installation">
                  <div class="link-title">Installation</div>
                  <div class="link-description">
                    How to install dependencies and structure your app
                  </div>
                </wc-navigation-menu-link>
                <wc-navigation-menu-link href="/docs/structure">
                  <div class="link-title">Project Structure</div>
                  <div class="link-description">
                    How to organize your project files
                  </div>
                </wc-navigation-menu-link>
              </div>
            </wc-navigation-menu-content>
          </wc-navigation-menu-item>

          <wc-navigation-menu-item value="components">
            <wc-navigation-menu-trigger>Components</wc-navigation-menu-trigger>
            <wc-navigation-menu-content>
              <div class="link-group">
                <wc-navigation-menu-link href="/docs/components/accordion">
                  Accordion
                </wc-navigation-menu-link>
                <wc-navigation-menu-link href="/docs/components/dialog">
                  Dialog
                </wc-navigation-menu-link>
                <wc-navigation-menu-link href="/docs/components/tabs">
                  Tabs
                </wc-navigation-menu-link>
              </div>
            </wc-navigation-menu-content>
          </wc-navigation-menu-item>

          <wc-navigation-menu-item value="examples">
            <wc-navigation-menu-trigger>Examples</wc-navigation-menu-trigger>
            <wc-navigation-menu-content>
              <div class="link-group">
                <wc-navigation-menu-link href="/examples/forms">
                  Forms
                </wc-navigation-menu-link>
                <wc-navigation-menu-link href="/examples/layouts">
                  Layouts
                </wc-navigation-menu-link>
              </div>
            </wc-navigation-menu-content>
          </wc-navigation-menu-item>
        </wc-navigation-menu-list>
      </wc-navigation-menu>
    </div>
  `,
};

export const WithDisabledItems: Story = {
  render: () => html`
    ${navigationMenuStyles}
    <div class="demo-container">
      <wc-navigation-menu>
        <wc-navigation-menu-list>
          <wc-navigation-menu-item value="available">
            <wc-navigation-menu-trigger>Available</wc-navigation-menu-trigger>
            <wc-navigation-menu-content>
              <div class="link-group">
                <wc-navigation-menu-link href="/link1">Link 1</wc-navigation-menu-link>
                <wc-navigation-menu-link href="/link2">Link 2</wc-navigation-menu-link>
              </div>
            </wc-navigation-menu-content>
          </wc-navigation-menu-item>

          <wc-navigation-menu-item value="disabled" disabled>
            <wc-navigation-menu-trigger>
              Disabled Item
            </wc-navigation-menu-trigger>
            <wc-navigation-menu-content>
              <div class="link-group">
                <wc-navigation-menu-link href="/link3">Link 3</wc-navigation-menu-link>
              </div>
            </wc-navigation-menu-content>
          </wc-navigation-menu-item>
        </wc-navigation-menu-list>
      </wc-navigation-menu>
    </div>
  `,
};

export const SimpleLinks: Story = {
  render: () => html`
    ${navigationMenuStyles}
    <style>
      .simple-link {
        display: inline-flex;
        padding: 0.5rem 1rem;
        color: #374151;
        text-decoration: none;
        border-radius: 6px;
        transition: all 0.2s;
      }

      .simple-link:hover {
        background: #f3f4f6;
      }
    </style>
    <div class="demo-container">
      <wc-navigation-menu>
        <wc-navigation-menu-list>
          <wc-navigation-menu-link href="/" class="simple-link">
            Home
          </wc-navigation-menu-link>
          <wc-navigation-menu-link href="/about" class="simple-link">
            About
          </wc-navigation-menu-link>
          <wc-navigation-menu-link href="/contact" class="simple-link">
            Contact
          </wc-navigation-menu-link>
        </wc-navigation-menu-list>
      </wc-navigation-menu>
    </div>
  `,
};

export const ComplexLayout: Story = {
  render: () => html`
    ${navigationMenuStyles}
    <style>
      .grid-content {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        padding: 0.5rem;
      }

      .grid-item {
        padding: 1rem;
        border-radius: 6px;
        border: 1px solid #e5e7eb;
      }

      .grid-item:hover {
        background: #f9fafb;
      }

      .item-icon {
        width: 40px;
        height: 40px;
        background: #eff6ff;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 0.5rem;
        color: #0066cc;
      }
    </style>
    <div class="demo-container">
      <wc-navigation-menu>
        <wc-navigation-menu-list>
          <wc-navigation-menu-item value="features">
            <wc-navigation-menu-trigger>Features</wc-navigation-menu-trigger>
            <wc-navigation-menu-content>
              <div class="grid-content">
                <wc-navigation-menu-link href="/features/analytics" class="grid-item">
                  <div class="item-icon">📊</div>
                  <div class="link-title">Analytics</div>
                  <div class="link-description">
                    Track and analyze your data
                  </div>
                </wc-navigation-menu-link>
                <wc-navigation-menu-link href="/features/reports" class="grid-item">
                  <div class="item-icon">📈</div>
                  <div class="link-title">Reports</div>
                  <div class="link-description">Generate detailed reports</div>
                </wc-navigation-menu-link>
                <wc-navigation-menu-link href="/features/dashboard" class="grid-item">
                  <div class="item-icon">📱</div>
                  <div class="link-title">Dashboard</div>
                  <div class="link-description">View your overview</div>
                </wc-navigation-menu-link>
                <wc-navigation-menu-link href="/features/settings" class="grid-item">
                  <div class="item-icon">⚙️</div>
                  <div class="link-title">Settings</div>
                  <div class="link-description">Configure your preferences</div>
                </wc-navigation-menu-link>
              </div>
            </wc-navigation-menu-content>
          </wc-navigation-menu-item>
        </wc-navigation-menu-list>
      </wc-navigation-menu>
    </div>
  `,
};

export const Interactive: Story = {
  render: () => {
    const handleChange = (e: Event) => {
      const target = e.target as unknown as NavigationMenuElement;
      const display = document.querySelector('#active-item');
      if (display) {
        display.textContent = target.value || 'None';
      }
    };

    setTimeout(() => {
      const nav = document.querySelector('#interactive-nav');
      if (nav) {
        nav.addEventListener('value-change', handleChange);
      }
    }, 0);

    return html`
      ${navigationMenuStyles}
      <style>
        .status-display {
          margin-top: 2rem;
          padding: 1rem;
          background: #f3f4f6;
          border-radius: 6px;
          font-size: 0.875rem;
        }
      </style>
      <div class="demo-container">
        <wc-navigation-menu id="interactive-nav">
          <wc-navigation-menu-list>
            <wc-navigation-menu-item value="item1">
              <wc-navigation-menu-trigger>Menu Item 1</wc-navigation-menu-trigger>
              <wc-navigation-menu-content>
                <div class="link-group">
                  <wc-navigation-menu-link href="/1">Submenu 1</wc-navigation-menu-link>
                  <wc-navigation-menu-link href="/2">Submenu 2</wc-navigation-menu-link>
                </div>
              </wc-navigation-menu-content>
            </wc-navigation-menu-item>

            <wc-navigation-menu-item value="item2">
              <wc-navigation-menu-trigger>Menu Item 2</wc-navigation-menu-trigger>
              <wc-navigation-menu-content>
                <div class="link-group">
                  <wc-navigation-menu-link href="/3">Submenu 3</wc-navigation-menu-link>
                  <wc-navigation-menu-link href="/4">Submenu 4</wc-navigation-menu-link>
                </div>
              </wc-navigation-menu-content>
            </wc-navigation-menu-item>
          </wc-navigation-menu-list>
        </wc-navigation-menu>
        <div class="status-display">
          Active item: <strong id="active-item">None</strong>
        </div>
      </div>
    `;
  },
};
