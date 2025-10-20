import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './avatar.js';
import './avatar-image.js';
import './avatar-fallback.js';

// Shared styles for all avatar stories
const avatarStyles = html`
  <style>
    .demo-container {
      padding: 2rem;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      align-items: center;
    }

    .demo-section {
      padding: 2rem;
    }

    .demo-section h3 {
      margin-bottom: 1rem;
      font-size: 1rem;
      font-weight: 600;
      color: #374151;
    }

    wc-avatar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      overflow: hidden;
      user-select: none;
      width: 48px;
      height: 48px;
      border-radius: 100%;
      background-color: #e5e7eb;
    }

    wc-avatar-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }

    wc-avatar-fallback {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #6366f1;
      color: white;
      font-size: 0.9375rem;
      font-weight: 500;
      line-height: 1;
    }

    /* Size variants */
    .avatar-small {
      width: 32px;
      height: 32px;
    }

    .avatar-small wc-avatar-fallback {
      font-size: 0.75rem;
    }

    .avatar-large {
      width: 64px;
      height: 64px;
    }

    .avatar-large wc-avatar-fallback {
      font-size: 1.25rem;
    }

    .avatar-xlarge {
      width: 96px;
      height: 96px;
    }

    .avatar-xlarge wc-avatar-fallback {
      font-size: 1.875rem;
    }

    /* Shape variants */
    .avatar-square {
      border-radius: 8px;
    }

    /* Status indicator */
    .avatar-with-status {
      position: relative;
    }

    .avatar-status {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 12px;
      height: 12px;
      border-radius: 100%;
      border: 2px solid white;
    }

    .avatar-status-online {
      background-color: #10b981;
    }

    .avatar-status-offline {
      background-color: #6b7280;
    }

    .avatar-status-busy {
      background-color: #ef4444;
    }

    /* Avatar group */
    .avatar-group {
      display: flex;
      align-items: center;
    }

    .avatar-group wc-avatar {
      margin-left: -12px;
      border: 2px solid white;
    }

    .avatar-group wc-avatar:first-child {
      margin-left: 0;
    }
  </style>
`;

/**
 * An image element with a fallback for representing the user.
 *
 * The avatar component is headless and provides no default styling. All visual appearance
 * must be controlled through CSS.
 */
const meta: Meta = {
  title: 'Components/Avatar',
  tags: ['autodocs'],
  render: (args) => html`
    ${avatarStyles}
    <div class="demo-container">
      <wc-avatar>
        <wc-avatar-image
          src="${args.src || ''}"
          alt="${args.alt || 'Avatar'}"
        ></wc-avatar-image>
        <wc-avatar-fallback>${args.fallback || 'AB'}</wc-avatar-fallback>
      </wc-avatar>
    </div>
  `,
  argTypes: {
    src: {
      control: 'text',
      description: 'The source URL of the avatar image',
    },
    alt: {
      control: 'text',
      description: 'Alt text for the avatar image',
    },
    fallback: {
      control: 'text',
      description: 'Fallback content (typically initials)',
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default avatar with a loaded image.
 */
export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=128&h=128&dpr=2&q=80',
    alt: 'Colm Tuite',
    fallback: 'CT',
  },
};

/**
 * Avatar with fallback initials when no image is provided.
 */
export const Fallback: Story = {
  args: {
    src: '',
    alt: 'Anonymous',
    fallback: 'AB',
  },
};

/**
 * Avatar with broken image showing fallback.
 */
export const BrokenImage: Story = {
  args: {
    src: 'https://broken-url-that-does-not-exist.com/image.jpg',
    alt: 'Broken image',
    fallback: 'BI',
  },
};

/**
 * Different avatar sizes.
 */
export const Sizes: Story = {
  render: () => html`
    ${avatarStyles}
    <div class="demo-container">
      <wc-avatar class="avatar-small">
        <wc-avatar-image
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=128&h=128&dpr=2&q=80"
          alt="Small avatar"
        ></wc-avatar-image>
        <wc-avatar-fallback>SM</wc-avatar-fallback>
      </wc-avatar>

      <wc-avatar>
        <wc-avatar-image
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=128&h=128&dpr=2&q=80"
          alt="Default avatar"
        ></wc-avatar-image>
        <wc-avatar-fallback>MD</wc-avatar-fallback>
      </wc-avatar>

      <wc-avatar class="avatar-large">
        <wc-avatar-image
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=128&h=128&dpr=2&q=80"
          alt="Large avatar"
        ></wc-avatar-image>
        <wc-avatar-fallback>LG</wc-avatar-fallback>
      </wc-avatar>

      <wc-avatar class="avatar-xlarge">
        <wc-avatar-image
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=128&h=128&dpr=2&q=80"
          alt="Extra large avatar"
        ></wc-avatar-image>
        <wc-avatar-fallback>XL</wc-avatar-fallback>
      </wc-avatar>
    </div>
  `,
};

/**
 * Different avatar shapes.
 */
export const Shapes: Story = {
  render: () => html`
    ${avatarStyles}
    <div class="demo-container">
      <wc-avatar>
        <wc-avatar-image
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=128&h=128&dpr=2&q=80"
          alt="Circular avatar"
        ></wc-avatar-image>
        <wc-avatar-fallback>CR</wc-avatar-fallback>
      </wc-avatar>

      <wc-avatar class="avatar-square">
        <wc-avatar-image
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=128&h=128&dpr=2&q=80"
          alt="Square avatar"
        ></wc-avatar-image>
        <wc-avatar-fallback>SQ</wc-avatar-fallback>
      </wc-avatar>
    </div>
  `,
};

/**
 * Avatars with status indicators.
 */
export const WithStatus: Story = {
  render: () => html`
    ${avatarStyles}
    <div class="demo-container">
      <div class="avatar-with-status">
        <wc-avatar>
          <wc-avatar-image
            src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=128&h=128&dpr=2&q=80"
            alt="Online user"
          ></wc-avatar-image>
          <wc-avatar-fallback>ON</wc-avatar-fallback>
        </wc-avatar>
        <span class="avatar-status avatar-status-online"></span>
      </div>

      <div class="avatar-with-status">
        <wc-avatar>
          <wc-avatar-image
            src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?w=128&h=128&dpr=2&q=80"
            alt="Busy user"
          ></wc-avatar-image>
          <wc-avatar-fallback>BS</wc-avatar-fallback>
        </wc-avatar>
        <span class="avatar-status avatar-status-busy"></span>
      </div>

      <div class="avatar-with-status">
        <wc-avatar>
          <wc-avatar-image
            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=128&h=128&dpr=2&q=80"
            alt="Offline user"
          ></wc-avatar-image>
          <wc-avatar-fallback>OF</wc-avatar-fallback>
        </wc-avatar>
        <span class="avatar-status avatar-status-offline"></span>
      </div>
    </div>
  `,
};

/**
 * Group of overlapping avatars.
 */
export const AvatarGroup: Story = {
  render: () => html`
    ${avatarStyles}
    <div class="demo-section">
      <div class="avatar-group">
        <wc-avatar>
          <wc-avatar-image
            src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=128&h=128&dpr=2&q=80"
            alt="User 1"
          ></wc-avatar-image>
          <wc-avatar-fallback>U1</wc-avatar-fallback>
        </wc-avatar>
        <wc-avatar>
          <wc-avatar-image
            src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?w=128&h=128&dpr=2&q=80"
            alt="User 2"
          ></wc-avatar-image>
          <wc-avatar-fallback>U2</wc-avatar-fallback>
        </wc-avatar>
        <wc-avatar>
          <wc-avatar-image
            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=128&h=128&dpr=2&q=80"
            alt="User 3"
          ></wc-avatar-image>
          <wc-avatar-fallback>U3</wc-avatar-fallback>
        </wc-avatar>
        <wc-avatar>
          <wc-avatar-fallback>+5</wc-avatar-fallback>
        </wc-avatar>
      </div>
    </div>
  `,
};

/**
 * Avatars with different fallback content.
 */
export const FallbackVariants: Story = {
  render: () => html`
    ${avatarStyles}
    <style>
      .fallback-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 1rem;
        padding: 2rem;
      }

      .fallback-item {
        text-align: center;
      }

      .fallback-item p {
        margin-top: 0.5rem;
        font-size: 0.875rem;
        color: #6b7280;
      }

      .emoji-fallback {
        font-size: 1.5rem;
      }

      .icon-fallback svg {
        width: 24px;
        height: 24px;
      }
    </style>
    <div class="fallback-grid">
      <div class="fallback-item">
        <wc-avatar>
          <wc-avatar-fallback>AB</wc-avatar-fallback>
        </wc-avatar>
        <p>Initials</p>
      </div>

      <div class="fallback-item">
        <wc-avatar>
          <wc-avatar-fallback class="emoji-fallback">👤</wc-avatar-fallback>
        </wc-avatar>
        <p>Emoji</p>
      </div>

      <div class="fallback-item">
        <wc-avatar>
          <wc-avatar-fallback class="icon-fallback">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </wc-avatar-fallback>
        </wc-avatar>
        <p>Icon</p>
      </div>
    </div>
  `,
};

/**
 * Avatar with delayed fallback rendering.
 */
export const DelayedFallback: Story = {
  render: () => html`
    ${avatarStyles}
    <div class="demo-section">
      <p style="margin-bottom: 1rem; color: #666;">
        Fallback will appear after 600ms (useful for slow connections)
      </p>
      <wc-avatar>
        <wc-avatar-image
          src="https://slow-image-url-that-takes-time-to-load.com/image.jpg"
          alt="Delayed avatar"
        ></wc-avatar-image>
        <wc-avatar-fallback delayMs="600">DL</wc-avatar-fallback>
      </wc-avatar>
    </div>
  `,
};
