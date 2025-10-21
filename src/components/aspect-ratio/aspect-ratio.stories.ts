import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './aspect-ratio.js';

// Shared styles for all aspect ratio stories
const aspectRatioStyles = html`
  <style>
    .demo-container {
      padding: 2rem;
      max-width: 600px;
    }

    .demo-section {
      margin-bottom: 2rem;
    }

    .demo-section h3 {
      margin-bottom: 1rem;
      font-size: 1rem;
      font-weight: 600;
      color: #374151;
    }

    wc-aspect-ratio {
      overflow: hidden;
      border-radius: 8px;
      background: #f3f4f6;
    }

    wc-aspect-ratio img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .demo-content {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-size: 1.5rem;
      font-weight: bold;
    }

    .video-container {
      background: #000;
    }

    .video-container iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  </style>
`;

/**
 * Displays content within a desired aspect ratio.
 *
 * The aspect ratio component is headless and provides no default styling. All visual appearance
 * must be controlled through CSS. It ensures content maintains a specific aspect ratio.
 */
const meta: Meta = {
  title: 'Components/AspectRatio',
  tags: ['autodocs'],
  render: (args) => html`
    ${aspectRatioStyles}
    <div class="demo-container">
      <wc-aspect-ratio ratio="${args.ratio}">
        <div class="demo-content">
          ${args.ratio}
        </div>
      </wc-aspect-ratio>
    </div>
  `,
  argTypes: {
    ratio: {
      control: 'text',
      description: 'The desired aspect ratio (e.g., "16/9", "4/3", "1/1")',
      table: {
        defaultValue: { summary: '1/1' },
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default 16:9 aspect ratio, commonly used for video content.
 */
export const Default: Story = {
  args: {
    ratio: '16/9',
  },
};

/**
 * Square 1:1 aspect ratio, perfect for profile images.
 */
export const Square: Story = {
  args: {
    ratio: '1/1',
  },
};

/**
 * Classic 4:3 aspect ratio.
 */
export const FourByThree: Story = {
  args: {
    ratio: '4/3',
  },
};

/**
 * Portrait 9:16 aspect ratio, ideal for mobile content.
 */
export const Portrait: Story = {
  args: {
    ratio: '9/16',
  },
  render: (args) => html`
    ${aspectRatioStyles}
    <style>
      .portrait-container {
        max-width: 300px;
        margin: 0 auto;
      }
    </style>
    <div class="demo-container">
      <div class="portrait-container">
        <wc-aspect-ratio ratio="${args.ratio}">
          <div class="demo-content">
            ${args.ratio}
          </div>
        </wc-aspect-ratio>
      </div>
    </div>
  `,
};

/**
 * Using aspect ratio with an image.
 */
export const WithImage: Story = {
  render: () => html`
    ${aspectRatioStyles}
    <div class="demo-container">
      <wc-aspect-ratio ratio="16/9">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by James Harrison"
        />
      </wc-aspect-ratio>
    </div>
  `,
};

/**
 * Using aspect ratio for video embeds.
 */
export const WithVideo: Story = {
  render: () => html`
    ${aspectRatioStyles}
    <div class="demo-container">
      <wc-aspect-ratio ratio="16/9" class="video-container">
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </wc-aspect-ratio>
    </div>
  `,
};

/**
 * Multiple aspect ratios side by side.
 */
export const MultipleRatios: Story = {
  render: () => html`
    ${aspectRatioStyles}
    <style>
      .ratios-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        padding: 2rem;
      }

      .ratio-item h4 {
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: #6b7280;
      }
    </style>
    <div class="ratios-grid">
      <div class="ratio-item">
        <h4>16:9 (Widescreen)</h4>
        <wc-aspect-ratio ratio="16/9">
          <div class="demo-content">16:9</div>
        </wc-aspect-ratio>
      </div>
      <div class="ratio-item">
        <h4>4:3 (Classic)</h4>
        <wc-aspect-ratio ratio="4/3">
          <div class="demo-content">4:3</div>
        </wc-aspect-ratio>
      </div>
      <div class="ratio-item">
        <h4>1:1 (Square)</h4>
        <wc-aspect-ratio ratio="1/1">
          <div class="demo-content">1:1</div>
        </wc-aspect-ratio>
      </div>
      <div class="ratio-item">
        <h4>21:9 (Ultrawide)</h4>
        <wc-aspect-ratio ratio="21/9">
          <div class="demo-content">21:9</div>
        </wc-aspect-ratio>
      </div>
    </div>
  `,
};
