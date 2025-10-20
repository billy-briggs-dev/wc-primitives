import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './radio-group.js';
import './radio-group-item.js';
import type { RadioGroupElement } from './radio-group.js';

describe('Radio Group Component', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should render radio group element', () => {
    container.innerHTML = `
      <wc-radio-group>
        <wc-radio-group-item value="option1">Option 1</wc-radio-group-item>
        <wc-radio-group-item value="option2">Option 2</wc-radio-group-item>
      </wc-radio-group>
    `;

    const radioGroup = container.querySelector('wc-radio-group') as RadioGroupElement;
    expect(radioGroup).toBeDefined();
    expect(radioGroup.tagName.toLowerCase()).toBe('wc-radio-group');
  });

  it('should have correct default properties', () => {
    const radioGroup = document.createElement('wc-radio-group') as RadioGroupElement;
    container.appendChild(radioGroup);

    expect(radioGroup.value).toBe('');
    expect(radioGroup.disabled).toBe(false);
    expect(radioGroup.orientation).toBe('vertical');
  });

  it('should set aria attributes', async () => {
    container.innerHTML = `
      <wc-radio-group value="option1">
        <wc-radio-group-item value="option1">Option 1</wc-radio-group-item>
        <wc-radio-group-item value="option2">Option 2</wc-radio-group-item>
      </wc-radio-group>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const radioGroup = container.querySelector('wc-radio-group');
    const item1 = container.querySelector('wc-radio-group-item[value="option1"]');
    const item2 = container.querySelector('wc-radio-group-item[value="option2"]');

    expect(radioGroup?.getAttribute('role')).toBe('radiogroup');
    expect(item1?.getAttribute('role')).toBe('radio');
    expect(item1?.getAttribute('aria-checked')).toBe('true');
    expect(item2?.getAttribute('role')).toBe('radio');
    expect(item2?.getAttribute('aria-checked')).toBe('false');
  });

  it('should select item on click', async () => {
    container.innerHTML = `
      <wc-radio-group>
        <wc-radio-group-item value="option1">Option 1</wc-radio-group-item>
        <wc-radio-group-item value="option2">Option 2</wc-radio-group-item>
      </wc-radio-group>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const radioGroup = container.querySelector('wc-radio-group') as RadioGroupElement;
    const item1 = container.querySelector('wc-radio-group-item[value="option1"]') as HTMLElement;

    expect(radioGroup.value).toBe('');

    item1.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(radioGroup.value).toBe('option1');
    expect(radioGroup.isValueSelected('option1')).toBe(true);
  });

  it('should only allow one item to be selected', async () => {
    container.innerHTML = `
      <wc-radio-group value="option1">
        <wc-radio-group-item value="option1">Option 1</wc-radio-group-item>
        <wc-radio-group-item value="option2">Option 2</wc-radio-group-item>
      </wc-radio-group>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const radioGroup = container.querySelector('wc-radio-group') as RadioGroupElement;
    const item1 = container.querySelector('wc-radio-group-item[value="option1"]');
    const item2 = container.querySelector('wc-radio-group-item[value="option2"]') as HTMLElement;

    expect(item1?.getAttribute('aria-checked')).toBe('true');
    expect(item2?.getAttribute('aria-checked')).toBe('false');

    item2.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(radioGroup.value).toBe('option2');
    expect(item1?.getAttribute('aria-checked')).toBe('false');
    expect(item2?.getAttribute('aria-checked')).toBe('true');
  });

  it('should dispatch value-change event', async () => {
    container.innerHTML = `
      <wc-radio-group>
        <wc-radio-group-item value="option1">Option 1</wc-radio-group-item>
      </wc-radio-group>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const radioGroup = container.querySelector('wc-radio-group');
    const item = container.querySelector('wc-radio-group-item') as HTMLElement;

    let eventFired = false;
    let eventValue = '';

    radioGroup?.addEventListener('value-change', ((e: CustomEvent) => {
      eventFired = true;
      eventValue = e.detail.value;
    }) as EventListener);

    item.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(eventFired).toBe(true);
    expect(eventValue).toBe('option1');
  });

  it('should respect disabled state on group', async () => {
    container.innerHTML = `
      <wc-radio-group disabled>
        <wc-radio-group-item value="option1">Option 1</wc-radio-group-item>
      </wc-radio-group>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const radioGroup = container.querySelector('wc-radio-group') as RadioGroupElement;
    const item = container.querySelector('wc-radio-group-item') as HTMLElement;

    expect(radioGroup.getAttribute('data-disabled')).toBe('');

    item.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(radioGroup.value).toBe('');
  });

  it('should respect disabled state on item', async () => {
    container.innerHTML = `
      <wc-radio-group>
        <wc-radio-group-item value="option1" disabled>Option 1</wc-radio-group-item>
        <wc-radio-group-item value="option2">Option 2</wc-radio-group-item>
      </wc-radio-group>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const radioGroup = container.querySelector('wc-radio-group') as RadioGroupElement;
    const item1 = container.querySelector('wc-radio-group-item[value="option1"]') as HTMLElement;

    expect(item1.getAttribute('data-disabled')).toBe('');

    item1.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(radioGroup.value).toBe('');
  });

  it('should handle keyboard navigation (arrow down)', async () => {
    container.innerHTML = `
      <wc-radio-group>
        <wc-radio-group-item value="option1">Option 1</wc-radio-group-item>
        <wc-radio-group-item value="option2">Option 2</wc-radio-group-item>
        <wc-radio-group-item value="option3">Option 3</wc-radio-group-item>
      </wc-radio-group>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const radioGroup = container.querySelector('wc-radio-group') as RadioGroupElement;
    const item1 = container.querySelector('wc-radio-group-item[value="option1"]') as HTMLElement;

    item1.focus();
    
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true });
    radioGroup.dispatchEvent(event);
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(radioGroup.value).toBe('option2');
  });

  it('should handle keyboard navigation (arrow up)', async () => {
    container.innerHTML = `
      <wc-radio-group value="option2">
        <wc-radio-group-item value="option1">Option 1</wc-radio-group-item>
        <wc-radio-group-item value="option2">Option 2</wc-radio-group-item>
        <wc-radio-group-item value="option3">Option 3</wc-radio-group-item>
      </wc-radio-group>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const radioGroup = container.querySelector('wc-radio-group') as RadioGroupElement;
    const item2 = container.querySelector('wc-radio-group-item[value="option2"]') as HTMLElement;

    item2.focus();
    
    const event = new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true });
    radioGroup.dispatchEvent(event);
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(radioGroup.value).toBe('option1');
  });

  it('should handle horizontal orientation with arrow keys', async () => {
    container.innerHTML = `
      <wc-radio-group orientation="horizontal">
        <wc-radio-group-item value="option1">Option 1</wc-radio-group-item>
        <wc-radio-group-item value="option2">Option 2</wc-radio-group-item>
      </wc-radio-group>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const radioGroup = container.querySelector('wc-radio-group') as RadioGroupElement;
    const item1 = container.querySelector('wc-radio-group-item[value="option1"]') as HTMLElement;

    item1.focus();
    
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
    radioGroup.dispatchEvent(event);
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(radioGroup.value).toBe('option2');
  });

  it('should set data-state on items', async () => {
    container.innerHTML = `
      <wc-radio-group value="option1">
        <wc-radio-group-item value="option1">Option 1</wc-radio-group-item>
        <wc-radio-group-item value="option2">Option 2</wc-radio-group-item>
      </wc-radio-group>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const item1 = container.querySelector('wc-radio-group-item[value="option1"]');
    const item2 = container.querySelector('wc-radio-group-item[value="option2"]');

    expect(item1?.getAttribute('data-state')).toBe('checked');
    expect(item2?.getAttribute('data-state')).toBe('unchecked');
  });
});
