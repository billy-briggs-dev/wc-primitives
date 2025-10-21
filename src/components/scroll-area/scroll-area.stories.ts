import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './scroll-area.js';
import './scroll-area-viewport.js';
import './scroll-area-scrollbar.js';
import './scroll-area-thumb.js';
import './scroll-area-corner.js';

const scrollAreaStyles = html`
  <style>
    .demo-container {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
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

    wc-scroll-area {
      position: relative;
      width: 400px;
      height: 300px;
      overflow: hidden;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      background: white;
    }

    wc-scroll-area-viewport {
      width: 100%;
      height: 100%;
      display: block;
    }

    /* Hide native scrollbar */
    wc-scroll-area-viewport::-webkit-scrollbar {
      display: none;
    }

    wc-scroll-area-viewport {
      scrollbar-width: none;
    }

    /* Custom scrollbar styling */
    wc-scroll-area-scrollbar {
      display: flex;
      user-select: none;
      touch-action: none;
      position: absolute;
      background: #f9fafb;
      transition: background 0.15s;
    }

    wc-scroll-area-scrollbar:hover {
      background: #f3f4f6;
    }

    wc-scroll-area-scrollbar[data-orientation='vertical'] {
      top: 0;
      right: 0;
      width: 10px;
      height: 100%;
    }

    wc-scroll-area-scrollbar[data-orientation='horizontal'] {
      left: 0;
      bottom: 0;
      height: 10px;
      width: 100%;
    }

    wc-scroll-area-scrollbar[data-state='hidden'] {
      opacity: 0;
      pointer-events: none;
    }

    wc-scroll-area-scrollbar[data-state='visible'] {
      opacity: 1;
    }

    wc-scroll-area-thumb {
      position: relative;
      flex: 1;
      background: #d1d5db;
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.15s;
    }

    wc-scroll-area-thumb:hover {
      background: #9ca3af;
    }

    wc-scroll-area-thumb[data-state='dragging'] {
      background: #6b7280;
    }

    /* Add padding to thumb */
    wc-scroll-area-scrollbar[data-orientation='vertical'] wc-scroll-area-thumb {
      margin: 2px;
      width: 6px;
    }

    wc-scroll-area-scrollbar[data-orientation='horizontal'] wc-scroll-area-thumb {
      margin: 2px;
      height: 6px;
    }

    wc-scroll-area-corner {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 10px;
      height: 10px;
      background: #f9fafb;
    }

    /* Demo content */
    .scroll-content {
      padding: 1rem;
    }

    .scroll-content h4 {
      margin: 0 0 0.5rem 0;
      color: #1f2937;
    }

    .scroll-content p {
      margin: 0 0 1rem 0;
      color: #6b7280;
      line-height: 1.5;
    }

    .wide-content {
      width: 800px;
      padding: 1rem;
    }

    .tags {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .tag {
      padding: 0.25rem 0.75rem;
      background: #e5e7eb;
      border-radius: 16px;
      font-size: 0.875rem;
      white-space: nowrap;
    }
  </style>
`;

const meta: Meta = {
  title: 'Components/ScrollArea',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A scrollable area with custom styled scrollbars. Supports vertical and horizontal scrolling with draggable thumbs.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Vertical: Story = {
  render: () => html`
    ${scrollAreaStyles}
    <div class="demo-container">
      <div class="demo-section">
        <h3>Vertical Scrolling</h3>
        <wc-scroll-area>
          <wc-scroll-area-viewport>
            <div class="scroll-content">
              <h4>Introduction</h4>
              <p>
                Web Components are a suite of different technologies allowing you to create
                reusable custom elements — with their functionality encapsulated away from the
                rest of your code — and utilize them in your web apps.
              </p>
              <h4>Concepts and usage</h4>
              <p>
                As developers, we all know that reusing code as much as possible is a good idea.
                This has traditionally not been so easy for custom markup structures — think of
                the complex HTML (and associated style and script) you've sometimes had to write
                to render custom UI controls, and how using them multiple times can turn your
                page into a mess if you are not careful.
              </p>
              <h4>Components</h4>
              <p>
                Web Components aims to solve such problems — it consists of three main
                technologies, which can be used together to create versatile custom elements with
                encapsulated functionality that can be reused wherever you like without fear of
                code collisions.
              </p>
              <h4>Custom elements</h4>
              <p>
                A set of JavaScript APIs that allow you to define custom elements and their
                behavior, which can then be used as desired in your user interface.
              </p>
              <h4>Shadow DOM</h4>
              <p>
                A set of JavaScript APIs for attaching an encapsulated "shadow" DOM tree to an
                element — which is rendered separately from the main document DOM — and
                controlling associated functionality.
              </p>
            </div>
          </wc-scroll-area-viewport>
          <wc-scroll-area-scrollbar orientation="vertical">
            <wc-scroll-area-thumb></wc-scroll-area-thumb>
          </wc-scroll-area-scrollbar>
        </wc-scroll-area>
      </div>
    </div>
  `,
};

export const Horizontal: Story = {
  render: () => html`
    ${scrollAreaStyles}
    <div class="demo-container">
      <div class="demo-section">
        <h3>Horizontal Scrolling</h3>
        <wc-scroll-area>
          <wc-scroll-area-viewport>
            <div class="wide-content">
              <h4>Tags</h4>
              <div class="tags">
                <span class="tag">Web Components</span>
                <span class="tag">Custom Elements</span>
                <span class="tag">Shadow DOM</span>
                <span class="tag">HTML Templates</span>
                <span class="tag">Lit</span>
                <span class="tag">TypeScript</span>
                <span class="tag">JavaScript</span>
                <span class="tag">Accessibility</span>
                <span class="tag">Headless UI</span>
                <span class="tag">Radix</span>
              </div>
            </div>
          </wc-scroll-area-viewport>
          <wc-scroll-area-scrollbar orientation="horizontal">
            <wc-scroll-area-thumb></wc-scroll-area-thumb>
          </wc-scroll-area-scrollbar>
        </wc-scroll-area>
      </div>
    </div>
  `,
};

export const Both: Story = {
  render: () => html`
    ${scrollAreaStyles}
    <div class="demo-container">
      <div class="demo-section">
        <h3>Both Directions</h3>
        <wc-scroll-area>
          <wc-scroll-area-viewport>
            <div class="wide-content">
              <h4>Introduction to Web Components</h4>
              <p>
                Web Components are a suite of different technologies allowing you to create
                reusable custom elements.
              </p>
              <h4>Custom Elements</h4>
              <p>
                A set of JavaScript APIs that allow you to define custom elements and their
                behavior.
              </p>
              <h4>Shadow DOM</h4>
              <p>
                A set of JavaScript APIs for attaching an encapsulated shadow DOM tree to an
                element.
              </p>
              <h4>HTML Templates</h4>
              <p>
                The template and slot elements enable you to write markup templates that are not
                displayed in the rendered page.
              </p>
              <h4>More Content</h4>
              <p>
                Additional content to demonstrate both vertical and horizontal scrolling working
                together.
              </p>
            </div>
          </wc-scroll-area-viewport>
          <wc-scroll-area-scrollbar orientation="vertical">
            <wc-scroll-area-thumb></wc-scroll-area-thumb>
          </wc-scroll-area-scrollbar>
          <wc-scroll-area-scrollbar orientation="horizontal">
            <wc-scroll-area-thumb></wc-scroll-area-thumb>
          </wc-scroll-area-scrollbar>
          <wc-scroll-area-corner></wc-scroll-area-corner>
        </wc-scroll-area>
      </div>
    </div>
  `,
};

export const AlwaysVisible: Story = {
  render: () => html`
    ${scrollAreaStyles}
    <div class="demo-container">
      <div class="demo-section">
        <h3>Always Visible Scrollbars</h3>
        <wc-scroll-area type="always">
          <wc-scroll-area-viewport>
            <div class="scroll-content">
              <h4>Always Visible</h4>
              <p>
                With <code>type="always"</code>, the scrollbars are always visible regardless of
                hover or scroll state.
              </p>
              <p>
                This is useful when you want to make it very clear that content is scrollable.
              </p>
              <p>
                The scrollbars remain visible even when the content isn't being scrolled or
                hovered.
              </p>
            </div>
          </wc-scroll-area-viewport>
          <wc-scroll-area-scrollbar orientation="vertical">
            <wc-scroll-area-thumb></wc-scroll-area-thumb>
          </wc-scroll-area-scrollbar>
        </wc-scroll-area>
      </div>
    </div>
  `,
};

export const HoverType: Story = {
  render: () => html`
    ${scrollAreaStyles}
    <div class="demo-container">
      <div class="demo-section">
        <h3>Show on Hover (Default)</h3>
        <p style="color: #6b7280; margin: 0 0 1rem 0;">
          Hover over the scroll area to see the scrollbar appear.
        </p>
        <wc-scroll-area type="hover">
          <wc-scroll-area-viewport>
            <div class="scroll-content">
              <h4>Hover to Show</h4>
              <p>
                With <code>type="hover"</code> (the default), scrollbars only appear when you
                hover over the scroll area or are actively scrolling.
              </p>
              <p>This provides a clean interface that doesn't clutter the UI.</p>
              <p>Try hovering over this area to see the scrollbar appear.</p>
            </div>
          </wc-scroll-area-viewport>
          <wc-scroll-area-scrollbar orientation="vertical">
            <wc-scroll-area-thumb></wc-scroll-area-thumb>
          </wc-scroll-area-scrollbar>
        </wc-scroll-area>
      </div>
    </div>
  `,
};
