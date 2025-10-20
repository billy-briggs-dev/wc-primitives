import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './checkbox.js';
import type { CheckboxElement } from './checkbox.js';

describe('Checkbox Component', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should render checkbox element', () => {
    container.innerHTML = `<wc-checkbox></wc-checkbox>`;

    const checkbox = container.querySelector('wc-checkbox') as CheckboxElement;
    expect(checkbox).toBeDefined();
    expect(checkbox.tagName.toLowerCase()).toBe('wc-checkbox');
  });

  it('should have correct default properties', () => {
    const checkbox = document.createElement('wc-checkbox') as CheckboxElement;
    container.appendChild(checkbox);

    expect(checkbox.checked).toBe(false);
    expect(checkbox.indeterminate).toBe(false);
    expect(checkbox.disabled).toBe(false);
    expect(checkbox.required).toBe(false);
    expect(checkbox.value).toBe('on');
  });

  it('should set correct ARIA attributes', async () => {
    container.innerHTML = `<wc-checkbox></wc-checkbox>`;
    await new Promise(resolve => setTimeout(resolve, 100));

    const checkbox = container.querySelector('wc-checkbox');
    expect(checkbox?.getAttribute('role')).toBe('checkbox');
    expect(checkbox?.getAttribute('aria-checked')).toBe('false');
    expect(checkbox?.getAttribute('data-state')).toBe('unchecked');
  });

  it('should toggle checked state on click', async () => {
    container.innerHTML = `<wc-checkbox></wc-checkbox>`;
    await new Promise(resolve => setTimeout(resolve, 100));

    const checkbox = container.querySelector('wc-checkbox') as CheckboxElement;
    expect(checkbox.checked).toBe(false);

    checkbox.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(checkbox.checked).toBe(true);
    expect(checkbox.getAttribute('aria-checked')).toBe('true');
    expect(checkbox.getAttribute('data-state')).toBe('checked');
  });

  it('should toggle checked state with Space key', async () => {
    container.innerHTML = `<wc-checkbox></wc-checkbox>`;
    await new Promise(resolve => setTimeout(resolve, 100));

    const checkbox = container.querySelector('wc-checkbox') as CheckboxElement;
    checkbox.focus();

    const spaceEvent = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
    checkbox.dispatchEvent(spaceEvent);
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(checkbox.checked).toBe(true);
  });

  it('should handle indeterminate state', async () => {
    container.innerHTML = `<wc-checkbox indeterminate></wc-checkbox>`;
    await new Promise(resolve => setTimeout(resolve, 100));

    const checkbox = container.querySelector('wc-checkbox') as CheckboxElement;
    expect(checkbox.indeterminate).toBe(true);
    expect(checkbox.getAttribute('aria-checked')).toBe('mixed');
    expect(checkbox.getAttribute('data-state')).toBe('indeterminate');
  });

  it('should transition from indeterminate to checked on first click', async () => {
    container.innerHTML = `<wc-checkbox indeterminate></wc-checkbox>`;
    await new Promise(resolve => setTimeout(resolve, 100));

    const checkbox = container.querySelector('wc-checkbox') as CheckboxElement;
    
    checkbox.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(checkbox.indeterminate).toBe(false);
    expect(checkbox.checked).toBe(true);
  });

  it('should respect disabled state', async () => {
    container.innerHTML = `<wc-checkbox disabled></wc-checkbox>`;
    await new Promise(resolve => setTimeout(resolve, 100));

    const checkbox = container.querySelector('wc-checkbox') as CheckboxElement;
    expect(checkbox.hasAttribute('data-disabled')).toBe(true);
    expect(checkbox.getAttribute('aria-disabled')).toBe('true');

    const initialChecked = checkbox.checked;
    checkbox.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(checkbox.checked).toBe(initialChecked);
  });

  it('should fire checked-change event when checked state changes', async () => {
    container.innerHTML = `<wc-checkbox></wc-checkbox>`;
    await new Promise(resolve => setTimeout(resolve, 100));

    const checkbox = container.querySelector('wc-checkbox') as CheckboxElement;

    let eventFired = false;
    let eventDetail: { checked: boolean; indeterminate: boolean } | null = null;

    checkbox.addEventListener('checked-change', (e: Event) => {
      eventFired = true;
      eventDetail = (e as CustomEvent).detail;
    });

    checkbox.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(eventFired).toBe(true);
    expect(eventDetail?.checked).toBe(true);
    expect(eventDetail?.indeterminate).toBe(false);
  });

  it('should set aria-required when required', async () => {
    container.innerHTML = `<wc-checkbox required></wc-checkbox>`;
    await new Promise(resolve => setTimeout(resolve, 100));

    const checkbox = container.querySelector('wc-checkbox');
    expect(checkbox?.getAttribute('aria-required')).toBe('true');
  });

  it('should handle name and value properties', () => {
    const checkbox = document.createElement('wc-checkbox') as CheckboxElement;
    checkbox.name = 'terms';
    checkbox.value = 'accepted';
    container.appendChild(checkbox);

    expect(checkbox.name).toBe('terms');
    expect(checkbox.value).toBe('accepted');
  });

  it('should be focusable when not disabled', async () => {
    container.innerHTML = `<wc-checkbox></wc-checkbox>`;
    await new Promise(resolve => setTimeout(resolve, 100));

    const checkbox = container.querySelector('wc-checkbox') as CheckboxElement;
    expect(checkbox.getAttribute('tabindex')).toBe('0');
  });

  it('should not be focusable when disabled', async () => {
    container.innerHTML = `<wc-checkbox disabled></wc-checkbox>`;
    await new Promise(resolve => setTimeout(resolve, 100));

    const checkbox = container.querySelector('wc-checkbox');
    expect(checkbox?.getAttribute('tabindex')).toBe('-1');
  });

  it('should reflect checked state in attribute', async () => {
    container.innerHTML = `<wc-checkbox checked></wc-checkbox>`;
    await new Promise(resolve => setTimeout(resolve, 100));

    const checkbox = container.querySelector('wc-checkbox') as CheckboxElement;
    expect(checkbox.hasAttribute('checked')).toBe(true);

    checkbox.checked = false;
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(checkbox.hasAttribute('checked')).toBe(false);
  });

  it('should update state when properties change programmatically', async () => {
    container.innerHTML = `<wc-checkbox></wc-checkbox>`;
    await new Promise(resolve => setTimeout(resolve, 100));

    const checkbox = container.querySelector('wc-checkbox') as CheckboxElement;

    checkbox.checked = true;
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(checkbox.getAttribute('data-state')).toBe('checked');

    checkbox.indeterminate = true;
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(checkbox.getAttribute('data-state')).toBe('indeterminate');

    checkbox.disabled = true;
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(checkbox.hasAttribute('data-disabled')).toBe(true);
  });
});
