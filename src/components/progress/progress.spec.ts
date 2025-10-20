import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './progress.js';
import './progress-indicator.js';
import type { ProgressElement } from './progress.js';

describe('Progress Component', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should render progress element', () => {
    container.innerHTML = `
      <wc-progress value="50">
        <wc-progress-indicator></wc-progress-indicator>
      </wc-progress>
    `;

    const progress = container.querySelector('wc-progress') as ProgressElement;
    expect(progress).toBeDefined();
    expect(progress.tagName.toLowerCase()).toBe('wc-progress');
  });

  it('should have correct default properties', () => {
    const progress = document.createElement('wc-progress') as ProgressElement;
    container.appendChild(progress);

    expect(progress.value).toBe(null);
    expect(progress.max).toBe(100);
  });

  it('should set aria attributes for determinate state', async () => {
    container.innerHTML = `
      <wc-progress value="50" max="100">
        <wc-progress-indicator></wc-progress-indicator>
      </wc-progress>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const progress = container.querySelector('wc-progress');
    expect(progress?.getAttribute('role')).toBe('progressbar');
    expect(progress?.getAttribute('aria-valuenow')).toBe('50');
    expect(progress?.getAttribute('aria-valuemin')).toBe('0');
    expect(progress?.getAttribute('aria-valuemax')).toBe('100');
    expect(progress?.getAttribute('data-state')).toBe('complete');
  });

  it('should set aria attributes for indeterminate state', async () => {
    container.innerHTML = `
      <wc-progress>
        <wc-progress-indicator></wc-progress-indicator>
      </wc-progress>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const progress = container.querySelector('wc-progress');
    expect(progress?.getAttribute('role')).toBe('progressbar');
    expect(progress?.hasAttribute('aria-valuenow')).toBe(false);
    expect(progress?.getAttribute('aria-valuemin')).toBe('0');
    expect(progress?.getAttribute('aria-valuemax')).toBe('100');
    expect(progress?.getAttribute('data-state')).toBe('indeterminate');
  });

  it('should calculate percentage correctly', async () => {
    const progress = document.createElement('wc-progress') as ProgressElement;
    progress.value = 50;
    progress.max = 100;
    container.appendChild(progress);

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(progress.getPercentage()).toBe(50);
  });

  it('should handle custom max value', async () => {
    const progress = document.createElement('wc-progress') as ProgressElement;
    progress.value = 50;
    progress.max = 200;
    container.appendChild(progress);

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(progress.getPercentage()).toBe(25);
  });

  it('should clamp values outside range', async () => {
    const progress = document.createElement('wc-progress') as ProgressElement;
    progress.value = 150;
    progress.max = 100;
    container.appendChild(progress);

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(progress.getPercentage()).toBe(100);
    expect(progress.getAttribute('aria-valuenow')).toBe('100');
  });

  it('should handle negative values', async () => {
    const progress = document.createElement('wc-progress') as ProgressElement;
    progress.value = -10;
    progress.max = 100;
    container.appendChild(progress);

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(progress.getPercentage()).toBe(0);
    expect(progress.getAttribute('aria-valuenow')).toBe('0');
  });

  it('should update indicator state', async () => {
    container.innerHTML = `
      <wc-progress value="50">
        <wc-progress-indicator></wc-progress-indicator>
      </wc-progress>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const indicator = container.querySelector('wc-progress-indicator');
    expect(indicator?.getAttribute('data-state')).toBe('complete');
    expect(indicator?.getAttribute('data-value')).toBe('50');
  });

  it('should update indicator for indeterminate state', async () => {
    container.innerHTML = `
      <wc-progress>
        <wc-progress-indicator></wc-progress-indicator>
      </wc-progress>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const indicator = container.querySelector('wc-progress-indicator');
    expect(indicator?.getAttribute('data-state')).toBe('indeterminate');
    expect(indicator?.hasAttribute('data-value')).toBe(false);
  });

  it('should update when value changes', async () => {
    const progress = document.createElement('wc-progress') as ProgressElement;
    progress.value = 25;
    container.appendChild(progress);

    await new Promise(resolve => setTimeout(resolve, 100));
    expect(progress.getPercentage()).toBe(25);

    progress.value = 75;
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(progress.getPercentage()).toBe(75);
  });
});
