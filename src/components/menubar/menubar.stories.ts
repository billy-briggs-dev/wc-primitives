import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './menubar.js';
import './menubar-menu.js';
import './menubar-trigger.js';
import './menubar-content.js';
import './menubar-item.js';
import './menubar-separator.js';

const meta: Meta = {
  title: 'Components/Menubar',
  component: 'wc-menubar',
  tags: ['autodocs'],
  render: () => html`
    <style>
      .story-container {
        padding: 20px;
        font-family: system-ui, -apple-system, sans-serif;
      }

      wc-menubar {
        display: flex;
        gap: 4px;
        padding: 4px;
        background: #fafafa;
        border: 1px solid #e5e5e5;
        border-radius: 6px;
        width: fit-content;
      }

      wc-menubar-menu {
        position: relative;
      }

      wc-menubar-trigger {
        display: flex;
        align-items: center;
        padding: 6px 12px;
        font-size: 14px;
        font-weight: 500;
        color: #1a1a1a;
        background: transparent;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background 0.15s;
      }

      wc-menubar-trigger:hover {
        background: #e5e5e5;
      }

      wc-menubar-trigger[data-state='open'] {
        background: #e5e5e5;
      }

      wc-menubar-trigger:focus {
        outline: 2px solid #2563eb;
        outline-offset: 2px;
      }

      wc-menubar-trigger[data-disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }

      wc-menubar-content {
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        z-index: 50;
        min-width: 180px;
        background: white;
        border: 1px solid #e5e5e5;
        border-radius: 6px;
        padding: 4px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
      }

      wc-menubar-content[data-state='closed'] {
        display: none;
      }

      wc-menubar-item {
        display: flex;
        align-items: center;
        padding: 8px 12px;
        font-size: 14px;
        color: #1a1a1a;
        border-radius: 4px;
        cursor: pointer;
        transition: background 0.15s;
        outline: none;
      }

      wc-menubar-item:hover {
        background: #f5f5f5;
      }

      wc-menubar-item:focus {
        background: #e5e5e5;
      }

      wc-menubar-item[data-disabled] {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
      }

      wc-menubar-separator {
        display: block;
        height: 1px;
        background: #e5e5e5;
        margin: 4px 0;
      }

      .item-with-shortcut {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }

      .shortcut {
        margin-left: 24px;
        font-size: 12px;
        color: #737373;
      }

      .demo-output {
        margin-top: 32px;
        padding: 16px;
        background: #fafafa;
        border: 1px solid #e5e5e5;
        border-radius: 6px;
        font-family: monospace;
        font-size: 13px;
      }
    </style>
    <div class="story-container">
      <wc-menubar>
        <wc-menubar-menu>
          <wc-menubar-trigger>File</wc-menubar-trigger>
          <wc-menubar-content>
            <wc-menubar-item>
              <span class="item-with-shortcut">
                <span>New File</span>
                <span class="shortcut">⌘N</span>
              </span>
            </wc-menubar-item>
            <wc-menubar-item>
              <span class="item-with-shortcut">
                <span>Open</span>
                <span class="shortcut">⌘O</span>
              </span>
            </wc-menubar-item>
            <wc-menubar-item>Save</wc-menubar-item>
            <wc-menubar-item>
              <span class="item-with-shortcut">
                <span>Save As</span>
                <span class="shortcut">⌘⇧S</span>
              </span>
            </wc-menubar-item>
            <wc-menubar-separator></wc-menubar-separator>
            <wc-menubar-item>Close</wc-menubar-item>
          </wc-menubar-content>
        </wc-menubar-menu>

        <wc-menubar-menu>
          <wc-menubar-trigger>Edit</wc-menubar-trigger>
          <wc-menubar-content>
            <wc-menubar-item>
              <span class="item-with-shortcut">
                <span>Undo</span>
                <span class="shortcut">⌘Z</span>
              </span>
            </wc-menubar-item>
            <wc-menubar-item>
              <span class="item-with-shortcut">
                <span>Redo</span>
                <span class="shortcut">⌘⇧Z</span>
              </span>
            </wc-menubar-item>
            <wc-menubar-separator></wc-menubar-separator>
            <wc-menubar-item>
              <span class="item-with-shortcut">
                <span>Cut</span>
                <span class="shortcut">⌘X</span>
              </span>
            </wc-menubar-item>
            <wc-menubar-item>
              <span class="item-with-shortcut">
                <span>Copy</span>
                <span class="shortcut">⌘C</span>
              </span>
            </wc-menubar-item>
            <wc-menubar-item>
              <span class="item-with-shortcut">
                <span>Paste</span>
                <span class="shortcut">⌘V</span>
              </span>
            </wc-menubar-item>
          </wc-menubar-content>
        </wc-menubar-menu>

        <wc-menubar-menu>
          <wc-menubar-trigger>View</wc-menubar-trigger>
          <wc-menubar-content>
            <wc-menubar-item>Zoom In</wc-menubar-item>
            <wc-menubar-item>Zoom Out</wc-menubar-item>
            <wc-menubar-item>Reset Zoom</wc-menubar-item>
            <wc-menubar-separator></wc-menubar-separator>
            <wc-menubar-item>Toggle Sidebar</wc-menubar-item>
            <wc-menubar-item>Toggle Terminal</wc-menubar-item>
          </wc-menubar-content>
        </wc-menubar-menu>

        <wc-menubar-menu>
          <wc-menubar-trigger>Help</wc-menubar-trigger>
          <wc-menubar-content>
            <wc-menubar-item>Documentation</wc-menubar-item>
            <wc-menubar-item>Keyboard Shortcuts</wc-menubar-item>
            <wc-menubar-separator></wc-menubar-separator>
            <wc-menubar-item>About</wc-menubar-item>
          </wc-menubar-content>
        </wc-menubar-menu>
      </wc-menubar>

      <div class="demo-output">
        <p style="margin: 0 0 8px 0; font-weight: 600;">Instructions:</p>
        <ul style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Click on menu labels to open dropdown menus</li>
          <li>Use Arrow Left/Right to navigate between menus</li>
          <li>Use Arrow Up/Down to navigate menu items</li>
          <li>Press Enter or Space to select an item</li>
          <li>Press Escape to close the menu</li>
          <li>Hover over other menus while one is open to switch</li>
        </ul>
      </div>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

/**
 * Basic menubar with multiple menus
 */
export const Default: Story = {};

/**
 * Menubar with disabled menu
 */
export const DisabledMenu: Story = {
  render: () => html`
    <style>
      .story-container {
        padding: 20px;
        font-family: system-ui, -apple-system, sans-serif;
      }

      wc-menubar {
        display: flex;
        gap: 4px;
        padding: 4px;
        background: #fafafa;
        border: 1px solid #e5e5e5;
        border-radius: 6px;
        width: fit-content;
      }

      wc-menubar-menu {
        position: relative;
      }

      wc-menubar-trigger {
        display: flex;
        align-items: center;
        padding: 6px 12px;
        font-size: 14px;
        font-weight: 500;
        color: #1a1a1a;
        background: transparent;
        border-radius: 4px;
        cursor: pointer;
      }

      wc-menubar-trigger:hover {
        background: #e5e5e5;
      }

      wc-menubar-trigger[data-disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }

      wc-menubar-content {
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        z-index: 50;
        min-width: 180px;
        background: white;
        border: 1px solid #e5e5e5;
        border-radius: 6px;
        padding: 4px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      }

      wc-menubar-item {
        display: flex;
        padding: 8px 12px;
        font-size: 14px;
        color: #1a1a1a;
        border-radius: 4px;
        cursor: pointer;
      }

      wc-menubar-item:hover {
        background: #f5f5f5;
      }
    </style>
    <div class="story-container">
      <wc-menubar>
        <wc-menubar-menu>
          <wc-menubar-trigger>Enabled</wc-menubar-trigger>
          <wc-menubar-content>
            <wc-menubar-item>Item 1</wc-menubar-item>
            <wc-menubar-item>Item 2</wc-menubar-item>
          </wc-menubar-content>
        </wc-menubar-menu>

        <wc-menubar-menu disabled>
          <wc-menubar-trigger>Disabled</wc-menubar-trigger>
          <wc-menubar-content>
            <wc-menubar-item>Item 1</wc-menubar-item>
            <wc-menubar-item>Item 2</wc-menubar-item>
          </wc-menubar-content>
        </wc-menubar-menu>
      </wc-menubar>
    </div>
  `,
};

/**
 * Menubar with event handling
 */
export const WithEvents: Story = {
  render: () => html`
    <style>
      .story-container {
        padding: 20px;
        font-family: system-ui, -apple-system, sans-serif;
      }

      wc-menubar {
        display: flex;
        gap: 4px;
        padding: 4px;
        background: #fafafa;
        border: 1px solid #e5e5e5;
        border-radius: 6px;
        width: fit-content;
      }

      wc-menubar-menu {
        position: relative;
      }

      wc-menubar-trigger {
        display: flex;
        padding: 6px 12px;
        font-size: 14px;
        font-weight: 500;
        color: #1a1a1a;
        background: transparent;
        border-radius: 4px;
        cursor: pointer;
      }

      wc-menubar-trigger:hover {
        background: #e5e5e5;
      }

      wc-menubar-content {
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        z-index: 50;
        min-width: 180px;
        background: white;
        border: 1px solid #e5e5e5;
        border-radius: 6px;
        padding: 4px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      }

      wc-menubar-item {
        display: flex;
        padding: 8px 12px;
        font-size: 14px;
        color: #1a1a1a;
        border-radius: 4px;
        cursor: pointer;
      }

      wc-menubar-item:hover {
        background: #f5f5f5;
      }

      wc-menubar-separator {
        display: block;
        height: 1px;
        background: #e5e5e5;
        margin: 4px 0;
      }

      .output {
        margin-top: 20px;
        padding: 12px;
        background: #f0fdf4;
        border: 1px solid #86efac;
        border-radius: 6px;
        font-family: monospace;
        font-size: 13px;
      }
    </style>
    <div class="story-container">
      <wc-menubar>
        <wc-menubar-menu>
          <wc-menubar-trigger>Actions</wc-menubar-trigger>
          <wc-menubar-content>
            <wc-menubar-item id="save-item">Save</wc-menubar-item>
            <wc-menubar-item id="delete-item">Delete</wc-menubar-item>
            <wc-menubar-separator></wc-menubar-separator>
            <wc-menubar-item id="export-item">Export</wc-menubar-item>
          </wc-menubar-content>
        </wc-menubar-menu>
      </wc-menubar>

      <div id="output" class="output">Click a menu item to see the event...</div>
    </div>

    <script type="module">
      const output = document.getElementById('output');
      const items = ['save-item', 'delete-item', 'export-item'];

      items.forEach((id) => {
        const item = document.getElementById(id);
        item?.addEventListener('select', (e) => {
          output.textContent = 'Selected: ' + e.detail.value + ' at ' + new Date().toLocaleTimeString();
        });
      });
    </script>
  `,
};
