import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './slider.js';
import './slider-track.js';
import './slider-range.js';
import './slider-thumb.js';
import type { SliderElement } from './slider.js';

describe('Slider Component', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should render slider element', () => {
    container.innerHTML = `
      <wc-slider>
        <wc-slider-track>
          <wc-slider-range></wc-slider-range>
        </wc-slider-track>
        <wc-slider-thumb></wc-slider-thumb>
      </wc-slider>
    `;

    const slider = container.querySelector('wc-slider') as SliderElement;
    expect(slider).toBeDefined();
    expect(slider.tagName.toLowerCase()).toBe('wc-slider');
  });

  it('should have correct default properties', () => {
    const slider = document.createElement('wc-slider') as SliderElement;
    container.appendChild(slider);

    expect(slider.value).toBe(50);
    expect(slider.min).toBe(0);
    expect(slider.max).toBe(100);
    expect(slider.step).toBe(1);
    expect(slider.disabled).toBe(false);
    expect(slider.orientation).toBe('horizontal');
  });

  it('should set aria attributes', async () => {
    container.innerHTML = `
      <wc-slider value="75" min="0" max="100">
        <wc-slider-track>
          <wc-slider-range></wc-slider-range>
        </wc-slider-track>
        <wc-slider-thumb></wc-slider-thumb>
      </wc-slider>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const slider = container.querySelector('wc-slider');

    expect(slider?.getAttribute('role')).toBe('slider');
    expect(slider?.getAttribute('aria-valuenow')).toBe('75');
    expect(slider?.getAttribute('aria-valuemin')).toBe('0');
    expect(slider?.getAttribute('aria-valuemax')).toBe('100');
    expect(slider?.getAttribute('tabindex')).toBe('0');
  });

  it('should calculate percentage correctly', () => {
    const slider = document.createElement('wc-slider') as SliderElement;
    slider.value = 50;
    slider.min = 0;
    slider.max = 100;
    container.appendChild(slider);

    expect(slider.getPercentage()).toBe(50);

    slider.value = 25;
    expect(slider.getPercentage()).toBe(25);

    slider.value = 75;
    expect(slider.getPercentage()).toBe(75);
  });

  it('should set value from percentage', () => {
    const slider = document.createElement('wc-slider') as SliderElement;
    slider.min = 0;
    slider.max = 100;
    slider.step = 1;
    container.appendChild(slider);

    slider.setValueFromPercentage(50);
    expect(slider.value).toBe(50);

    slider.setValueFromPercentage(25);
    expect(slider.value).toBe(25);

    slider.setValueFromPercentage(75);
    expect(slider.value).toBe(75);
  });

  it('should increment value on arrow key press', async () => {
    container.innerHTML = `
      <wc-slider value="50" step="5">
        <wc-slider-track>
          <wc-slider-range></wc-slider-range>
        </wc-slider-track>
        <wc-slider-thumb></wc-slider-thumb>
      </wc-slider>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const slider = container.querySelector('wc-slider') as SliderElement;

    expect(slider.value).toBe(50);

    const rightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    slider.dispatchEvent(rightEvent);
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(slider.value).toBe(55);

    const leftEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    slider.dispatchEvent(leftEvent);
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(slider.value).toBe(50);
  });

  it('should jump to min/max on Home/End key press', async () => {
    container.innerHTML = `
      <wc-slider value="50" min="0" max="100">
        <wc-slider-track>
          <wc-slider-range></wc-slider-range>
        </wc-slider-track>
        <wc-slider-thumb></wc-slider-thumb>
      </wc-slider>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const slider = container.querySelector('wc-slider') as SliderElement;

    const homeEvent = new KeyboardEvent('keydown', { key: 'Home' });
    slider.dispatchEvent(homeEvent);
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(slider.value).toBe(0);

    const endEvent = new KeyboardEvent('keydown', { key: 'End' });
    slider.dispatchEvent(endEvent);
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(slider.value).toBe(100);
  });

  it('should not change value when disabled', async () => {
    container.innerHTML = `
      <wc-slider value="50" disabled>
        <wc-slider-track>
          <wc-slider-range></wc-slider-range>
        </wc-slider-track>
        <wc-slider-thumb></wc-slider-thumb>
      </wc-slider>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const slider = container.querySelector('wc-slider') as SliderElement;

    expect(slider.value).toBe(50);

    const rightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    slider.dispatchEvent(rightEvent);
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(slider.value).toBe(50);
  });

  it('should dispatch value-change event', async () => {
    container.innerHTML = `
      <wc-slider value="50">
        <wc-slider-track>
          <wc-slider-range></wc-slider-range>
        </wc-slider-track>
        <wc-slider-thumb></wc-slider-thumb>
      </wc-slider>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const slider = container.querySelector('wc-slider') as SliderElement;
    
    let eventFired = false;
    let eventDetail: any = null;
    
    slider.addEventListener('value-change', (e: Event) => {
      eventFired = true;
      eventDetail = (e as CustomEvent).detail;
    });

    slider.value = 75;
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(eventFired).toBe(true);
    expect(eventDetail.value).toBe(75);
  });

  it('should set disabled attributes correctly', async () => {
    container.innerHTML = `
      <wc-slider disabled>
        <wc-slider-track>
          <wc-slider-range></wc-slider-range>
        </wc-slider-track>
        <wc-slider-thumb></wc-slider-thumb>
      </wc-slider>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const slider = container.querySelector('wc-slider');

    expect(slider?.hasAttribute('data-disabled')).toBe(true);
    expect(slider?.getAttribute('aria-disabled')).toBe('true');
    expect(slider?.getAttribute('tabindex')).toBe('-1');
  });

  it('should set orientation attribute correctly', async () => {
    container.innerHTML = `
      <wc-slider orientation="vertical">
        <wc-slider-track>
          <wc-slider-range></wc-slider-range>
        </wc-slider-track>
        <wc-slider-thumb></wc-slider-thumb>
      </wc-slider>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const slider = container.querySelector('wc-slider');

    expect(slider?.getAttribute('data-orientation')).toBe('vertical');
  });

  it('should clamp value to min/max range', () => {
    const slider = document.createElement('wc-slider') as SliderElement;
    slider.min = 0;
    slider.max = 100;
    slider.step = 1;
    container.appendChild(slider);

    slider.setValueFromPercentage(150); // Over 100%
    expect(slider.value).toBe(100);

    slider.setValueFromPercentage(-50); // Under 0%
    expect(slider.value).toBe(0);
  });
});
