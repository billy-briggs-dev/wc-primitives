import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './hover-card.js';
import './hover-card-trigger.js';
import './hover-card-content.js';

const meta: Meta = {
  title: 'Components/HoverCard',
  component: 'wc-hover-card',
  tags: ['autodocs'],
  render: (args) => html`
    <style>
      .story-container {
        display: flex;
        flex-direction: column;
        gap: 40px;
        padding: 100px 40px;
        font-family: system-ui, -apple-system, sans-serif;
      }

      .demo-section {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      wc-hover-card-trigger {
        display: inline-block;
        padding: 8px 16px;
        background: #2563eb;
        color: white;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: background 0.2s;
      }

      wc-hover-card-trigger:hover {
        background: #1d4ed8;
      }

      wc-hover-card-trigger:focus {
        outline: 2px solid #2563eb;
        outline-offset: 2px;
      }

      wc-hover-card-content {
        position: absolute;
        z-index: 50;
        background: white;
        border: 1px solid #e5e5e5;
        border-radius: 8px;
        padding: 16px;
        margin-top: 8px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
        min-width: 280px;
        max-width: 320px;
      }

      wc-hover-card-content[data-state='closed'] {
        display: none;
      }

      .card-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;
      }

      .avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 600;
        font-size: 18px;
      }

      .card-info h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: #1a1a1a;
      }

      .card-info p {
        margin: 0;
        font-size: 13px;
        color: #737373;
      }

      .card-body {
        font-size: 14px;
        line-height: 1.5;
        color: #525252;
        margin-bottom: 12px;
      }

      .card-stats {
        display: flex;
        gap: 16px;
        padding-top: 12px;
        border-top: 1px solid #f0f0f0;
      }

      .stat {
        text-align: center;
      }

      .stat-value {
        display: block;
        font-size: 16px;
        font-weight: 600;
        color: #1a1a1a;
      }

      .stat-label {
        display: block;
        font-size: 12px;
        color: #737373;
        margin-top: 2px;
      }

      .inline-trigger {
        color: #2563eb;
        text-decoration: underline;
        cursor: pointer;
        font-weight: 500;
      }

      .inline-trigger:hover {
        color: #1d4ed8;
      }
    </style>
    <div class="story-container">
      ${
        args.variant === 'user-profile'
          ? html`
              <div class="demo-section">
                <span>Hover over</span>
                <wc-hover-card open-delay="700" close-delay="300">
                  <wc-hover-card-trigger>@john_doe</wc-hover-card-trigger>
                  <wc-hover-card-content>
                    <div class="card-header">
                      <div class="avatar">JD</div>
                      <div class="card-info">
                        <h3>John Doe</h3>
                        <p>@john_doe</p>
                      </div>
                    </div>
                    <div class="card-body">
                      Full-stack developer passionate about building accessible web experiences. Open source
                      enthusiast.
                    </div>
                    <div class="card-stats">
                      <div class="stat">
                        <span class="stat-value">1.2K</span>
                        <span class="stat-label">Followers</span>
                      </div>
                      <div class="stat">
                        <span class="stat-value">847</span>
                        <span class="stat-label">Following</span>
                      </div>
                      <div class="stat">
                        <span class="stat-value">42</span>
                        <span class="stat-label">Repos</span>
                      </div>
                    </div>
                  </wc-hover-card-content>
                </wc-hover-card>
                <span>for more info</span>
              </div>
            `
          : args.variant === 'quick-info'
            ? html`
                <div class="demo-section">
                  <p>
                    Learn more about
                    <wc-hover-card open-delay="500" close-delay="200">
                      <wc-hover-card-trigger class="inline-trigger">
                        Web Components
                      </wc-hover-card-trigger>
                      <wc-hover-card-content>
                        <h3 style="margin: 0 0 8px 0; font-size: 16px;">Web Components</h3>
                        <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #525252;">
                          A suite of technologies that allow you to create reusable custom elements with
                          encapsulated functionality that can be used in your web applications.
                        </p>
                        <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #f0f0f0;">
                          <a
                            href="https://developer.mozilla.org/en-US/docs/Web/Web_Components"
                            style="font-size: 13px; color: #2563eb; text-decoration: none;"
                            target="_blank"
                          >
                            Learn more →
                          </a>
                        </div>
                      </wc-hover-card-content>
                    </wc-hover-card>
                    and their benefits.
                  </p>
                </div>
              `
            : html`
                <div class="demo-section">
                  <wc-hover-card>
                    <wc-hover-card-trigger>Hover for info</wc-hover-card-trigger>
                    <wc-hover-card-content>
                      <p style="margin: 0;">This is a hover card with rich content!</p>
                    </wc-hover-card-content>
                  </wc-hover-card>
                </div>
              `
      }
    </div>
  `,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['basic', 'user-profile', 'quick-info'],
      description: 'The variant of hover card to demonstrate',
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Basic hover card with simple content
 */
export const Basic: Story = {
  args: {
    variant: 'basic',
  },
};

/**
 * Hover card showing a user profile with avatar, bio, and stats
 */
export const UserProfile: Story = {
  args: {
    variant: 'user-profile',
  },
};

/**
 * Inline hover card providing quick contextual information
 */
export const QuickInfo: Story = {
  args: {
    variant: 'quick-info',
  },
};

/**
 * Hover card with custom delays
 */
export const CustomDelays: Story = {
  render: () => html`
    <style>
      .delays-container {
        display: flex;
        flex-direction: column;
        gap: 40px;
        padding: 100px 40px;
        font-family: system-ui, -apple-system, sans-serif;
      }

      wc-hover-card-trigger {
        display: inline-block;
        padding: 8px 16px;
        background: #2563eb;
        color: white;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
      }

      wc-hover-card-content {
        position: absolute;
        background: white;
        border: 1px solid #e5e5e5;
        border-radius: 8px;
        padding: 16px;
        margin-top: 8px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        min-width: 200px;
      }
    </style>
    <div class="delays-container">
      <div>
        <p><strong>Fast open (200ms), Fast close (100ms)</strong></p>
        <wc-hover-card open-delay="200" close-delay="100">
          <wc-hover-card-trigger>Fast response</wc-hover-card-trigger>
          <wc-hover-card-content>Opens and closes quickly!</wc-hover-card-content>
        </wc-hover-card>
      </div>

      <div>
        <p><strong>Slow open (1000ms), Standard close (300ms)</strong></p>
        <wc-hover-card open-delay="1000" close-delay="300">
          <wc-hover-card-trigger>Slow to open</wc-hover-card-trigger>
          <wc-hover-card-content>Takes a moment to appear...</wc-hover-card-content>
        </wc-hover-card>
      </div>

      <div>
        <p><strong>Instant open (0ms), Delayed close (1000ms)</strong></p>
        <wc-hover-card open-delay="0" close-delay="1000">
          <wc-hover-card-trigger>Instant open, slow close</wc-hover-card-trigger>
          <wc-hover-card-content>Opens immediately, stays visible longer!</wc-hover-card-content>
        </wc-hover-card>
      </div>
    </div>
  `,
};

/**
 * Disabled hover card
 */
export const Disabled: Story = {
  render: () => html`
    <style>
      .disabled-container {
        display: flex;
        gap: 20px;
        padding: 100px 40px;
        font-family: system-ui, -apple-system, sans-serif;
      }

      wc-hover-card-trigger {
        display: inline-block;
        padding: 8px 16px;
        background: #2563eb;
        color: white;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
      }

      wc-hover-card[disabled] wc-hover-card-trigger {
        background: #d4d4d4;
        color: #a3a3a3;
        cursor: not-allowed;
      }

      wc-hover-card-content {
        position: absolute;
        background: white;
        border: 1px solid #e5e5e5;
        border-radius: 8px;
        padding: 16px;
        margin-top: 8px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        min-width: 200px;
      }
    </style>
    <div class="disabled-container">
      <wc-hover-card>
        <wc-hover-card-trigger>Enabled</wc-hover-card-trigger>
        <wc-hover-card-content>This works!</wc-hover-card-content>
      </wc-hover-card>

      <wc-hover-card disabled>
        <wc-hover-card-trigger>Disabled</wc-hover-card-trigger>
        <wc-hover-card-content>This won't show</wc-hover-card-content>
      </wc-hover-card>
    </div>
  `,
};
