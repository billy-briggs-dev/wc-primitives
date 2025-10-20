import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './progress.js';
import './progress-indicator.js';

// Shared styles for all progress stories
const progressStyles = html`
  <style>
    wc-progress {
      position: relative;
      display: block;
      width: 100%;
      height: 16px;
      background-color: #e5e7eb;
      border-radius: 9999px;
      overflow: hidden;
    }

    wc-progress-indicator {
      display: block;
      width: 100%;
      height: 100%;
      background-color: #0066cc;
      transition: transform 0.3s cubic-bezier(0.65, 0, 0.35, 1);
    }

    /* Indeterminate animation */
    wc-progress-indicator[data-state='indeterminate'] {
      animation: indeterminate 1.5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
    }

    @keyframes indeterminate {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    /* Demo container */
    .demo-container {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      max-width: 600px;
    }

    .progress-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .progress-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
    }

    .progress-value {
      font-size: 0.75rem;
      color: #6b7280;
    }
  </style>
`;

/**
 * A progress indicator that displays the completion progress of a task.
 *
 * The progress component is headless and provides no default styling. All visual appearance
 * must be controlled through CSS.
 */
const meta: Meta = {
  title: 'Components/Progress',
  tags: ['autodocs'],
  render: () => html``,
  argTypes: {},
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    ${progressStyles}
    <div class="demo-container">
      <div class="progress-wrapper">
        <span class="progress-label">Default Progress</span>
        <wc-progress value="50">
          <wc-progress-indicator></wc-progress-indicator>
        </wc-progress>
        <span class="progress-value">50%</span>
      </div>
    </div>
  `,
};

export const DifferentValues: Story = {
  render: () => html`
    ${progressStyles}
    <div class="demo-container">
      <div class="progress-wrapper">
        <span class="progress-label">25% Complete</span>
        <wc-progress value="25">
          <wc-progress-indicator></wc-progress-indicator>
        </wc-progress>
      </div>

      <div class="progress-wrapper">
        <span class="progress-label">50% Complete</span>
        <wc-progress value="50">
          <wc-progress-indicator></wc-progress-indicator>
        </wc-progress>
      </div>

      <div class="progress-wrapper">
        <span class="progress-label">75% Complete</span>
        <wc-progress value="75">
          <wc-progress-indicator></wc-progress-indicator>
        </wc-progress>
      </div>

      <div class="progress-wrapper">
        <span class="progress-label">100% Complete</span>
        <wc-progress value="100">
          <wc-progress-indicator></wc-progress-indicator>
        </wc-progress>
      </div>
    </div>
  `,
};

export const Indeterminate: Story = {
  render: () => html`
    ${progressStyles}
    <div class="demo-container">
      <div class="progress-wrapper">
        <span class="progress-label">Loading...</span>
        <wc-progress>
          <wc-progress-indicator></wc-progress-indicator>
        </wc-progress>
      </div>
    </div>
  `,
};

export const CustomMax: Story = {
  render: () => html`
    ${progressStyles}
    <div class="demo-container">
      <div class="progress-wrapper">
        <span class="progress-label">Custom Max Value (200)</span>
        <wc-progress value="100" max="200">
          <wc-progress-indicator></wc-progress-indicator>
        </wc-progress>
        <span class="progress-value">100 / 200 (50%)</span>
      </div>
    </div>
  `,
};

export const Interactive: Story = {
  render: () => {
    let progress = 0;
    const updateProgress = () => {
      const progressEl = document.querySelector('#interactive-progress') as unknown as ProgressElement;
      const valueEl = document.querySelector('#interactive-value');
      if (progressEl && valueEl) {
        progress = (progress + 10) % 110;
        progressEl.value = progress === 0 ? null : progress;
        valueEl.textContent = progress === 0 ? 'Indeterminate' : `${progress}%`;
      }
    };

    setTimeout(() => {
      const btn = document.querySelector('#update-progress-btn');
      if (btn) {
        btn.addEventListener('click', updateProgress);
      }
    }, 0);

    return html`
      ${progressStyles}
      <style>
        .update-button {
          padding: 0.5rem 1rem;
          background: #0066cc;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
        }
        .update-button:hover {
          background: #0052a3;
        }
      </style>
      <div class="demo-container">
        <div class="progress-wrapper">
          <span class="progress-label">Interactive Progress</span>
          <wc-progress id="interactive-progress" value="0">
            <wc-progress-indicator></wc-progress-indicator>
          </wc-progress>
          <span class="progress-value" id="interactive-value">0%</span>
        </div>
        <button id="update-progress-btn" class="update-button">
          Update Progress (+10%)
        </button>
      </div>
    `;
  },
};

export const Styled: Story = {
  render: () => html`
    ${progressStyles}
    <style>
      /* Success progress */
      .progress-success wc-progress {
        background-color: #d1fae5;
      }
      .progress-success wc-progress-indicator {
        background-color: #10b981;
      }

      /* Warning progress */
      .progress-warning wc-progress {
        background-color: #fef3c7;
      }
      .progress-warning wc-progress-indicator {
        background-color: #f59e0b;
      }

      /* Error progress */
      .progress-error wc-progress {
        background-color: #fee2e2;
      }
      .progress-error wc-progress-indicator {
        background-color: #ef4444;
      }

      /* Thin progress */
      .progress-thin wc-progress {
        height: 4px;
      }

      /* Thick progress */
      .progress-thick wc-progress {
        height: 24px;
      }
    </style>
    <div class="demo-container">
      <div class="progress-wrapper progress-success">
        <span class="progress-label">Success</span>
        <wc-progress value="80">
          <wc-progress-indicator></wc-progress-indicator>
        </wc-progress>
      </div>

      <div class="progress-wrapper progress-warning">
        <span class="progress-label">Warning</span>
        <wc-progress value="60">
          <wc-progress-indicator></wc-progress-indicator>
        </wc-progress>
      </div>

      <div class="progress-wrapper progress-error">
        <span class="progress-label">Error</span>
        <wc-progress value="40">
          <wc-progress-indicator></wc-progress-indicator>
        </wc-progress>
      </div>

      <div class="progress-wrapper progress-thin">
        <span class="progress-label">Thin</span>
        <wc-progress value="70">
          <wc-progress-indicator></wc-progress-indicator>
        </wc-progress>
      </div>

      <div class="progress-wrapper progress-thick">
        <span class="progress-label">Thick</span>
        <wc-progress value="90">
          <wc-progress-indicator></wc-progress-indicator>
        </wc-progress>
      </div>
    </div>
  `,
};
