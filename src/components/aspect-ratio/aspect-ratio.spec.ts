import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './aspect-ratio.js';
import type { AspectRatioElement } from './aspect-ratio.js';

describe('AspectRatio Component', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should render aspect ratio element', () => {
    container.innerHTML = `
      <wc-aspect-ratio>
        <div>Content</div>
      </wc-aspect-ratio>
    `;

    const aspectRatio = container.querySelector('wc-aspect-ratio') as AspectRatioElement;
    expect(aspectRatio).toBeDefined();
    expect(aspectRatio.tagName.toLowerCase()).toBe('wc-aspect-ratio');
  });

  it('should have default 1/1 ratio', () => {
    const aspectRatio = document.createElement('wc-aspect-ratio') as AspectRatioElement;
    container.appendChild(aspectRatio);

    expect(aspectRatio.ratio).toBe('1/1');
  });

  it('should accept custom ratio', () => {
    container.innerHTML = `<wc-aspect-ratio ratio="16/9"></wc-aspect-ratio>`;

    const aspectRatio = container.querySelector('wc-aspect-ratio') as AspectRatioElement;
    expect(aspectRatio.ratio).toBe('16/9');
  });

  it('should render content in slot', async () => {
    container.innerHTML = `
      <wc-aspect-ratio>
        <div class="test-content">Test Content</div>
      </wc-aspect-ratio>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const content = container.querySelector('.test-content');
    expect(content).toBeDefined();
    expect(content?.textContent).toBe('Test Content');
  });

  it('should set correct position style', () => {
    container.innerHTML = `<wc-aspect-ratio></wc-aspect-ratio>`;

    const aspectRatio = container.querySelector('wc-aspect-ratio') as AspectRatioElement;
    expect(aspectRatio.style.position).toBe('relative');
    expect(aspectRatio.style.width).toBe('100%');
  });

  it('should update when ratio changes', async () => {
    container.innerHTML = `<wc-aspect-ratio ratio="16/9"></wc-aspect-ratio>`;

    const aspectRatio = container.querySelector('wc-aspect-ratio') as AspectRatioElement;
    expect(aspectRatio.ratio).toBe('16/9');

    aspectRatio.ratio = '4/3';
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(aspectRatio.ratio).toBe('4/3');
  });

  it('should handle different ratio formats', async () => {
    const ratios = ['16/9', '4/3', '1/1', '21/9', '9/16'];

    for (const ratio of ratios) {
      container.innerHTML = `<wc-aspect-ratio ratio="${ratio}"></wc-aspect-ratio>`;
      await new Promise(resolve => setTimeout(resolve, 50));

      const aspectRatio = container.querySelector('wc-aspect-ratio') as AspectRatioElement;
      expect(aspectRatio.ratio).toBe(ratio);
    }
  });
});
