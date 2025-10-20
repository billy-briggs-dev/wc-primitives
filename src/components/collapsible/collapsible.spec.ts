import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './collapsible.js';
import './collapsible-trigger.js';
import './collapsible-content.js';
import type { CollapsibleElement } from './collapsible.js';

describe('Collapsible Component', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should render collapsible element', () => {
    container.innerHTML = `
      <wc-collapsible>
        <wc-collapsible-trigger>Toggle</wc-collapsible-trigger>
        <wc-collapsible-content>Content</wc-collapsible-content>
      </wc-collapsible>
    `;

    const collapsible = container.querySelector('wc-collapsible') as CollapsibleElement;
    expect(collapsible).toBeDefined();
    expect(collapsible.tagName.toLowerCase()).toBe('wc-collapsible');
  });

  it('should have correct default properties', () => {
    const collapsible = document.createElement('wc-collapsible') as CollapsibleElement;
    container.appendChild(collapsible);

    expect(collapsible.open).toBe(false);
    expect(collapsible.disabled).toBe(false);
  });

  it('should set aria attributes', async () => {
    container.innerHTML = `
      <wc-collapsible>
        <wc-collapsible-trigger>Toggle</wc-collapsible-trigger>
        <wc-collapsible-content>Content</wc-collapsible-content>
      </wc-collapsible>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const trigger = container.querySelector('wc-collapsible-trigger');
    const content = container.querySelector('wc-collapsible-content');

    expect(trigger?.getAttribute('role')).toBe('button');
    expect(trigger?.getAttribute('aria-expanded')).toBe('false');
    expect(content?.getAttribute('role')).toBe('region');
  });

  it('should toggle on trigger click', async () => {
    container.innerHTML = `
      <wc-collapsible>
        <wc-collapsible-trigger>Toggle</wc-collapsible-trigger>
        <wc-collapsible-content>Content</wc-collapsible-content>
      </wc-collapsible>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const collapsible = container.querySelector('wc-collapsible') as CollapsibleElement;
    const trigger = container.querySelector('wc-collapsible-trigger') as HTMLElement;

    expect(collapsible.open).toBe(false);

    trigger.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(collapsible.open).toBe(true);

    trigger.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(collapsible.open).toBe(false);
  });

  it('should toggle on keyboard (Space/Enter)', async () => {
    container.innerHTML = `
      <wc-collapsible>
        <wc-collapsible-trigger>Toggle</wc-collapsible-trigger>
        <wc-collapsible-content>Content</wc-collapsible-content>
      </wc-collapsible>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const collapsible = container.querySelector('wc-collapsible') as CollapsibleElement;
    const trigger = container.querySelector('wc-collapsible-trigger') as HTMLElement;

    expect(collapsible.open).toBe(false);

    // Test Space key
    const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
    trigger.dispatchEvent(spaceEvent);
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(collapsible.open).toBe(true);

    // Test Enter key
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    trigger.dispatchEvent(enterEvent);
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(collapsible.open).toBe(false);
  });

  it('should respect disabled state', async () => {
    container.innerHTML = `
      <wc-collapsible disabled>
        <wc-collapsible-trigger>Toggle</wc-collapsible-trigger>
        <wc-collapsible-content>Content</wc-collapsible-content>
      </wc-collapsible>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const collapsible = container.querySelector('wc-collapsible') as CollapsibleElement;
    const trigger = container.querySelector('wc-collapsible-trigger') as HTMLElement;

    expect(collapsible.open).toBe(false);

    trigger.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(collapsible.open).toBe(false);
  });

  it('should fire open-change event', async () => {
    container.innerHTML = `
      <wc-collapsible>
        <wc-collapsible-trigger>Toggle</wc-collapsible-trigger>
        <wc-collapsible-content>Content</wc-collapsible-content>
      </wc-collapsible>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const collapsible = container.querySelector('wc-collapsible') as CollapsibleElement;
    const trigger = container.querySelector('wc-collapsible-trigger') as HTMLElement;

    let eventFired = false;
    let eventDetail: any;

    collapsible.addEventListener('open-change', (e: Event) => {
      eventFired = true;
      eventDetail = (e as CustomEvent).detail;
    });

    trigger.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(eventFired).toBe(true);
    expect(eventDetail.open).toBe(true);
  });

  it('should update data-state attribute', async () => {
    container.innerHTML = `
      <wc-collapsible>
        <wc-collapsible-trigger>Toggle</wc-collapsible-trigger>
        <wc-collapsible-content>Content</wc-collapsible-content>
      </wc-collapsible>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const collapsible = container.querySelector('wc-collapsible') as CollapsibleElement;
    const trigger = container.querySelector('wc-collapsible-trigger') as HTMLElement;
    const content = container.querySelector('wc-collapsible-content');

    expect(collapsible.getAttribute('data-state')).toBe('closed');
    expect(trigger.getAttribute('data-state')).toBe('closed');
    expect(content?.getAttribute('data-state')).toBe('closed');

    trigger.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(collapsible.getAttribute('data-state')).toBe('open');
    expect(trigger.getAttribute('data-state')).toBe('open');
    expect(content?.getAttribute('data-state')).toBe('open');
  });
});
