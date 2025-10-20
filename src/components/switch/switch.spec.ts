import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './switch.js';
import type { SwitchElement } from './switch.js';

describe('Switch Component', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should render switch element', () => {
    container.innerHTML = `<wc-switch></wc-switch>`;

    const switchEl = container.querySelector('wc-switch') as SwitchElement;
    expect(switchEl).toBeDefined();
    expect(switchEl.tagName.toLowerCase()).toBe('wc-switch');
  });

  it('should have correct default properties', () => {
    const switchEl = document.createElement('wc-switch') as SwitchElement;
    container.appendChild(switchEl);

    expect(switchEl.checked).toBe(false);
    expect(switchEl.disabled).toBe(false);
    expect(switchEl.required).toBe(false);
    expect(switchEl.name).toBe('');
    expect(switchEl.value).toBe('on');
  });

  it('should set aria attributes', async () => {
    container.innerHTML = `<wc-switch></wc-switch>`;

    await new Promise(resolve => setTimeout(resolve, 100));

    const switchEl = container.querySelector('wc-switch');

    expect(switchEl?.getAttribute('role')).toBe('switch');
    expect(switchEl?.getAttribute('aria-checked')).toBe('false');
    expect(switchEl?.getAttribute('tabindex')).toBe('0');
  });

  it('should toggle checked state on click', async () => {
    container.innerHTML = `<wc-switch></wc-switch>`;

    await new Promise(resolve => setTimeout(resolve, 100));

    const switchEl = container.querySelector('wc-switch') as SwitchElement;

    expect(switchEl.checked).toBe(false);

    switchEl.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(switchEl.checked).toBe(true);
    expect(switchEl.getAttribute('aria-checked')).toBe('true');
    expect(switchEl.getAttribute('data-state')).toBe('checked');
  });

  it('should toggle on Enter key press', async () => {
    container.innerHTML = `<wc-switch></wc-switch>`;

    await new Promise(resolve => setTimeout(resolve, 100));

    const switchEl = container.querySelector('wc-switch') as SwitchElement;

    expect(switchEl.checked).toBe(false);

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    switchEl.dispatchEvent(event);
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(switchEl.checked).toBe(true);
  });

  it('should toggle on Space key press', async () => {
    container.innerHTML = `<wc-switch></wc-switch>`;

    await new Promise(resolve => setTimeout(resolve, 100));

    const switchEl = container.querySelector('wc-switch') as SwitchElement;

    expect(switchEl.checked).toBe(false);

    const event = new KeyboardEvent('keydown', { key: ' ' });
    switchEl.dispatchEvent(event);
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(switchEl.checked).toBe(true);
  });

  it('should not toggle when disabled', async () => {
    container.innerHTML = `<wc-switch disabled></wc-switch>`;

    await new Promise(resolve => setTimeout(resolve, 100));

    const switchEl = container.querySelector('wc-switch') as SwitchElement;

    expect(switchEl.checked).toBe(false);

    switchEl.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(switchEl.checked).toBe(false);
  });

  it('should dispatch checked-change event', async () => {
    container.innerHTML = `<wc-switch></wc-switch>`;

    await new Promise(resolve => setTimeout(resolve, 100));

    const switchEl = container.querySelector('wc-switch') as SwitchElement;
    
    let eventFired = false;
    let eventDetail: any = null;
    
    switchEl.addEventListener('checked-change', (e: Event) => {
      eventFired = true;
      eventDetail = (e as CustomEvent).detail;
    });

    switchEl.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(eventFired).toBe(true);
    expect(eventDetail.checked).toBe(true);
  });

  it('should set disabled attributes correctly', async () => {
    container.innerHTML = `<wc-switch disabled></wc-switch>`;

    await new Promise(resolve => setTimeout(resolve, 100));

    const switchEl = container.querySelector('wc-switch');

    expect(switchEl?.hasAttribute('data-disabled')).toBe(true);
    expect(switchEl?.getAttribute('aria-disabled')).toBe('true');
    expect(switchEl?.getAttribute('tabindex')).toBe('-1');
  });

  it('should set required attribute correctly', async () => {
    container.innerHTML = `<wc-switch required></wc-switch>`;

    await new Promise(resolve => setTimeout(resolve, 100));

    const switchEl = container.querySelector('wc-switch');

    expect(switchEl?.getAttribute('aria-required')).toBe('true');
  });
});
