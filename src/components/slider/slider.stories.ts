import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './slider.js';
import './slider-track.js';
import './slider-range.js';
import './slider-thumb.js';

// Shared styles for all slider stories
const sliderStyles = html`
  <style>
    wc-slider {
      position: relative;
      display: flex;
      align-items: center;
      user-select: none;
      touch-action: none;
      width: 200px;
      height: 20px;
    }

    wc-slider[data-orientation='vertical'] {
      flex-direction: column;
      width: 20px;
      height: 200px;
    }

    wc-slider-track {
      position: relative;
      flex-grow: 1;
      background: #e5e7eb;
      border-radius: 9999px;
      height: 4px;
    }

    wc-slider[data-orientation='vertical'] wc-slider-track {
      width: 4px;
      height: 100%;
    }

    wc-slider-range {
      position: absolute;
      background: #0066cc;
      border-radius: 9999px;
      height: 100%;
    }

    wc-slider[data-orientation='vertical'] wc-slider-range {
      width: 100%;
      bottom: 0;
    }

    wc-slider-thumb {
      display: block;
      position: absolute;
      width: 20px;
      height: 20px;
      background: white;
      border: 2px solid #0066cc;
      border-radius: 50%;
      transform: translateX(-50%);
      transition: box-shadow 0.2s;
    }

    wc-slider[data-orientation='vertical'] wc-slider-thumb {
      transform: translateY(50%);
    }

    wc-slider:focus wc-slider-thumb {
      box-shadow: 0 0 0 4px rgba(0, 102, 204, 0.2);
    }

    wc-slider[data-disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }

    wc-slider[data-disabled] wc-slider-track {
      background: #f3f4f6;
    }

    wc-slider[data-disabled] wc-slider-range {
      background: #9ca3af;
    }

    wc-slider[data-disabled] wc-slider-thumb {
      border-color: #9ca3af;
      cursor: not-allowed;
    }

    /* Demo container */
    .demo-container {
      padding: 2rem;
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
      align-items: center;
    }

    .slider-label {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .slider-label span {
      font-size: 0.875rem;
      color: #666;
    }
  </style>
`;

/**
 * A control for selecting a value from a range.
 *
 * The slider component is headless and provides no default styling. All visual appearance
 * must be controlled through CSS.
 */
const meta: Meta = {
  title: 'Components/Slider',
  tags: ['autodocs'],
  render: (args) => html`
    ${sliderStyles}
    <div class="demo-container">
      <wc-slider
        value="${args.value}"
        min="${args.min}"
        max="${args.max}"
        step="${args.step}"
        ?disabled="${args.disabled}"
      >
        <wc-slider-track>
          <wc-slider-range></wc-slider-range>
        </wc-slider-track>
        <wc-slider-thumb></wc-slider-thumb>
      </wc-slider>
    </div>
  `,
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 100, step: 1 },
      description: 'The controlled value of the slider',
      table: {
        defaultValue: { summary: '50' },
      },
    },
    min: {
      control: 'number',
      description: 'The minimum value of the slider',
      table: {
        defaultValue: { summary: '0' },
      },
    },
    max: {
      control: 'number',
      description: 'The maximum value of the slider',
      table: {
        defaultValue: { summary: '100' },
      },
    },
    step: {
      control: 'number',
      description: 'The step increment for the slider',
      table: {
        defaultValue: { summary: '1' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'When true, prevents the user from interacting with the slider',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default horizontal slider.
 */
export const Default: Story = {
  args: {
    value: 50,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
  },
};

/**
 * Disabled slider that cannot be interacted with.
 */
export const Disabled: Story = {
  args: {
    value: 50,
    disabled: true,
  },
};

/**
 * Slider with different step values.
 */
export const WithSteps: Story = {
  render: () => html`
    ${sliderStyles}
    <div class="demo-container" style="flex-direction: column; align-items: flex-start;">
      <div class="slider-label">
        <span>Step: 1 (default)</span>
        <wc-slider value="50" step="1">
          <wc-slider-track>
            <wc-slider-range></wc-slider-range>
          </wc-slider-track>
          <wc-slider-thumb></wc-slider-thumb>
        </wc-slider>
      </div>
      <div class="slider-label">
        <span>Step: 5</span>
        <wc-slider value="50" step="5">
          <wc-slider-track>
            <wc-slider-range></wc-slider-range>
          </wc-slider-track>
          <wc-slider-thumb></wc-slider-thumb>
        </wc-slider>
      </div>
      <div class="slider-label">
        <span>Step: 10</span>
        <wc-slider value="50" step="10">
          <wc-slider-track>
            <wc-slider-range></wc-slider-range>
          </wc-slider-track>
          <wc-slider-thumb></wc-slider-thumb>
        </wc-slider>
      </div>
    </div>
  `,
};

/**
 * Slider with different ranges.
 */
export const WithRanges: Story = {
  render: () => html`
    ${sliderStyles}
    <div class="demo-container" style="flex-direction: column; align-items: flex-start;">
      <div class="slider-label">
        <span>Range: 0-100 (default)</span>
        <wc-slider value="50" min="0" max="100">
          <wc-slider-track>
            <wc-slider-range></wc-slider-range>
          </wc-slider-track>
          <wc-slider-thumb></wc-slider-thumb>
        </wc-slider>
      </div>
      <div class="slider-label">
        <span>Range: 0-10</span>
        <wc-slider value="5" min="0" max="10">
          <wc-slider-track>
            <wc-slider-range></wc-slider-range>
          </wc-slider-track>
          <wc-slider-thumb></wc-slider-thumb>
        </wc-slider>
      </div>
      <div class="slider-label">
        <span>Range: -50 to 50</span>
        <wc-slider value="0" min="-50" max="50">
          <wc-slider-track>
            <wc-slider-range></wc-slider-range>
          </wc-slider-track>
          <wc-slider-thumb></wc-slider-thumb>
        </wc-slider>
      </div>
    </div>
  `,
};

/**
 * Vertical slider orientation.
 */
export const Vertical: Story = {
  render: () => html`
    ${sliderStyles}
    <div class="demo-container">
      <wc-slider value="50" orientation="vertical">
        <wc-slider-track>
          <wc-slider-range></wc-slider-range>
        </wc-slider-track>
        <wc-slider-thumb></wc-slider-thumb>
      </wc-slider>
    </div>
  `,
};

/**
 * Slider with event listener for tracking value changes.
 */
export const WithEventListener: Story = {
  render: () => {
    setTimeout(() => {
      const slider = document.querySelector('wc-slider');
      const valueDisplay = document.querySelector('#value-display');
      if (slider && valueDisplay) {
        slider.addEventListener('value-change', (e: Event) => {
          const customEvent = e as CustomEvent;
          valueDisplay.textContent = `Value: ${customEvent.detail.value}`;
          console.log('Slider value changed:', customEvent.detail);
        });
      }
    }, 0);

    return html`
      ${sliderStyles}
      <div class="demo-container" style="flex-direction: column; align-items: flex-start;">
        <p style="margin-bottom: 1rem;">
          <strong>Note:</strong> Open the browser console to see value-change events.
        </p>
        <p id="value-display" style="margin-bottom: 1rem; font-weight: 500;">Value: 50</p>
        <wc-slider value="50">
          <wc-slider-track>
            <wc-slider-range></wc-slider-range>
          </wc-slider-track>
          <wc-slider-thumb></wc-slider-thumb>
        </wc-slider>
      </div>
    `;
  },
};

/**
 * Different color variants.
 */
export const ColorVariants: Story = {
  render: () => html`
    ${sliderStyles}
    <style>
      .success-slider wc-slider-range {
        background: #10b981;
      }
      .success-slider wc-slider-thumb {
        border-color: #10b981;
      }
      .success-slider:focus wc-slider-thumb {
        box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.2);
      }

      .warning-slider wc-slider-range {
        background: #f59e0b;
      }
      .warning-slider wc-slider-thumb {
        border-color: #f59e0b;
      }
      .warning-slider:focus wc-slider-thumb {
        box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.2);
      }

      .danger-slider wc-slider-range {
        background: #ef4444;
      }
      .danger-slider wc-slider-thumb {
        border-color: #ef4444;
      }
      .danger-slider:focus wc-slider-thumb {
        box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.2);
      }
    </style>
    <div class="demo-container" style="flex-direction: column; align-items: flex-start; gap: 1.5rem;">
      <div class="slider-label">
        <span>Default</span>
        <wc-slider value="75">
          <wc-slider-track>
            <wc-slider-range></wc-slider-range>
          </wc-slider-track>
          <wc-slider-thumb></wc-slider-thumb>
        </wc-slider>
      </div>
      <div class="slider-label">
        <span>Success</span>
        <wc-slider class="success-slider" value="75">
          <wc-slider-track>
            <wc-slider-range></wc-slider-range>
          </wc-slider-track>
          <wc-slider-thumb></wc-slider-thumb>
        </wc-slider>
      </div>
      <div class="slider-label">
        <span>Warning</span>
        <wc-slider class="warning-slider" value="75">
          <wc-slider-track>
            <wc-slider-range></wc-slider-range>
          </wc-slider-track>
          <wc-slider-thumb></wc-slider-thumb>
        </wc-slider>
      </div>
      <div class="slider-label">
        <span>Danger</span>
        <wc-slider class="danger-slider" value="75">
          <wc-slider-track>
            <wc-slider-range></wc-slider-range>
          </wc-slider-track>
          <wc-slider-thumb></wc-slider-thumb>
        </wc-slider>
      </div>
    </div>
  `,
};

/**
 * Different sized sliders.
 */
export const Sizes: Story = {
  render: () => html`
    ${sliderStyles}
    <style>
      .small-slider {
        width: 150px;
        height: 16px;
      }
      .small-slider wc-slider-track {
        height: 3px;
      }
      .small-slider wc-slider-thumb {
        width: 16px;
        height: 16px;
      }

      .large-slider {
        width: 300px;
        height: 24px;
      }
      .large-slider wc-slider-track {
        height: 6px;
      }
      .large-slider wc-slider-thumb {
        width: 24px;
        height: 24px;
      }
    </style>
    <div class="demo-container" style="flex-direction: column; align-items: flex-start; gap: 1.5rem;">
      <div class="slider-label">
        <span>Small</span>
        <wc-slider class="small-slider" value="50">
          <wc-slider-track>
            <wc-slider-range></wc-slider-range>
          </wc-slider-track>
          <wc-slider-thumb></wc-slider-thumb>
        </wc-slider>
      </div>
      <div class="slider-label">
        <span>Default</span>
        <wc-slider value="50">
          <wc-slider-track>
            <wc-slider-range></wc-slider-range>
          </wc-slider-track>
          <wc-slider-thumb></wc-slider-thumb>
        </wc-slider>
      </div>
      <div class="slider-label">
        <span>Large</span>
        <wc-slider class="large-slider" value="50">
          <wc-slider-track>
            <wc-slider-range></wc-slider-range>
          </wc-slider-track>
          <wc-slider-thumb></wc-slider-thumb>
        </wc-slider>
      </div>
    </div>
  `,
};
