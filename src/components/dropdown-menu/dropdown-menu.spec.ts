import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './dropdown-menu.js';
import './dropdown-menu-trigger.js';
import './dropdown-menu-content.js';
import './dropdown-menu-item.js';
import './dropdown-menu-separator.js';
import './dropdown-menu-label.js';
import type { DropdownMenuElement } from './dropdown-menu.js';

describe('Dropdown Menu Component', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should render dropdown menu element', () => {
    container.innerHTML = `
      <wc-dropdown-menu>
        <wc-dropdown-menu-trigger>Open</wc-dropdown-menu-trigger>
        <wc-dropdown-menu-content>
          <wc-dropdown-menu-item>Item 1</wc-dropdown-menu-item>
        </wc-dropdown-menu-content>
      </wc-dropdown-menu>
    `;

    const menu = container.querySelector('wc-dropdown-menu') as DropdownMenuElement;
    expect(menu).toBeDefined();
    expect(menu.tagName.toLowerCase()).toBe('wc-dropdown-menu');
  });

  it('should have correct default properties', () => {
    const menu = document.createElement('wc-dropdown-menu') as DropdownMenuElement;
    container.appendChild(menu);

    expect(menu.open).toBe(false);
    expect(menu.disabled).toBe(false);
    expect(menu.modal).toBe(true);
  });

  it('should set aria attributes', async () => {
    container.innerHTML = `
      <wc-dropdown-menu>
        <wc-dropdown-menu-trigger>Open</wc-dropdown-menu-trigger>
        <wc-dropdown-menu-content>
          <wc-dropdown-menu-item>Item 1</wc-dropdown-menu-item>
        </wc-dropdown-menu-content>
      </wc-dropdown-menu>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const menu = container.querySelector('wc-dropdown-menu');
    const trigger = container.querySelector('wc-dropdown-menu-trigger');
    const content = container.querySelector('wc-dropdown-menu-content');
    const item = container.querySelector('wc-dropdown-menu-item');

    expect(menu?.getAttribute('role')).toBe('group');
    expect(trigger?.getAttribute('role')).toBe('button');
    expect(trigger?.getAttribute('aria-haspopup')).toBe('menu');
    expect(trigger?.getAttribute('aria-expanded')).toBe('false');
    expect(content?.getAttribute('role')).toBe('menu');
    expect(item?.getAttribute('role')).toBe('menuitem');
  });

  it('should open menu on trigger click', async () => {
    container.innerHTML = `
      <wc-dropdown-menu>
        <wc-dropdown-menu-trigger>Open</wc-dropdown-menu-trigger>
        <wc-dropdown-menu-content>
          <wc-dropdown-menu-item>Item 1</wc-dropdown-menu-item>
        </wc-dropdown-menu-content>
      </wc-dropdown-menu>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const menu = container.querySelector('wc-dropdown-menu') as DropdownMenuElement;
    const trigger = container.querySelector('wc-dropdown-menu-trigger') as HTMLElement;

    expect(menu.open).toBe(false);

    trigger.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(menu.open).toBe(true);
  });

  it('should close menu on item click', async () => {
    container.innerHTML = `
      <wc-dropdown-menu>
        <wc-dropdown-menu-trigger>Open</wc-dropdown-menu-trigger>
        <wc-dropdown-menu-content>
          <wc-dropdown-menu-item>Item 1</wc-dropdown-menu-item>
        </wc-dropdown-menu-content>
      </wc-dropdown-menu>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const menu = container.querySelector('wc-dropdown-menu') as DropdownMenuElement;
    const trigger = container.querySelector('wc-dropdown-menu-trigger') as HTMLElement;
    const item = container.querySelector('wc-dropdown-menu-item') as HTMLElement;

    // Open menu
    trigger.click();
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(menu.open).toBe(true);

    // Click item
    item.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(menu.open).toBe(false);
  });

  it('should support keyboard navigation with arrows', async () => {
    container.innerHTML = `
      <wc-dropdown-menu>
        <wc-dropdown-menu-trigger>Open</wc-dropdown-menu-trigger>
        <wc-dropdown-menu-content>
          <wc-dropdown-menu-item>Item 1</wc-dropdown-menu-item>
          <wc-dropdown-menu-item>Item 2</wc-dropdown-menu-item>
          <wc-dropdown-menu-item>Item 3</wc-dropdown-menu-item>
        </wc-dropdown-menu-content>
      </wc-dropdown-menu>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const trigger = container.querySelector('wc-dropdown-menu-trigger') as HTMLElement;
    const content = container.querySelector('wc-dropdown-menu-content') as HTMLElement;

    // Open menu
    trigger.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    // Focus content and navigate
    content.focus();
    
    const downEvent = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true });
    content.dispatchEvent(downEvent);
    await new Promise(resolve => setTimeout(resolve, 50));

    // First item should be focused
    const items = container.querySelectorAll('wc-dropdown-menu-item');
    expect(document.activeElement).toBe(items[0]);
  });

  it('should close menu on Escape key', async () => {
    container.innerHTML = `
      <wc-dropdown-menu>
        <wc-dropdown-menu-trigger>Open</wc-dropdown-menu-trigger>
        <wc-dropdown-menu-content>
          <wc-dropdown-menu-item>Item 1</wc-dropdown-menu-item>
        </wc-dropdown-menu-content>
      </wc-dropdown-menu>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const menu = container.querySelector('wc-dropdown-menu') as DropdownMenuElement;
    const trigger = container.querySelector('wc-dropdown-menu-trigger') as HTMLElement;
    const content = container.querySelector('wc-dropdown-menu-content') as HTMLElement;

    // Open menu
    trigger.click();
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(menu.open).toBe(true);

    // Press Escape
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    content.dispatchEvent(escapeEvent);
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(menu.open).toBe(false);
  });

  it('should respect disabled state', async () => {
    container.innerHTML = `
      <wc-dropdown-menu disabled>
        <wc-dropdown-menu-trigger>Open</wc-dropdown-menu-trigger>
        <wc-dropdown-menu-content>
          <wc-dropdown-menu-item>Item 1</wc-dropdown-menu-item>
        </wc-dropdown-menu-content>
      </wc-dropdown-menu>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const menu = container.querySelector('wc-dropdown-menu') as DropdownMenuElement;
    const trigger = container.querySelector('wc-dropdown-menu-trigger') as HTMLElement;

    expect(menu.open).toBe(false);

    trigger.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(menu.open).toBe(false);
  });

  it('should fire open-change event', async () => {
    container.innerHTML = `
      <wc-dropdown-menu>
        <wc-dropdown-menu-trigger>Open</wc-dropdown-menu-trigger>
        <wc-dropdown-menu-content>
          <wc-dropdown-menu-item>Item 1</wc-dropdown-menu-item>
        </wc-dropdown-menu-content>
      </wc-dropdown-menu>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const menu = container.querySelector('wc-dropdown-menu') as DropdownMenuElement;
    const trigger = container.querySelector('wc-dropdown-menu-trigger') as HTMLElement;

    let eventFired = false;
    let eventDetail: any;

    menu.addEventListener('open-change', (e: Event) => {
      eventFired = true;
      eventDetail = (e as CustomEvent).detail;
    });

    trigger.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(eventFired).toBe(true);
    expect(eventDetail.open).toBe(true);
  });

  it('should render separator with correct role', async () => {
    container.innerHTML = `
      <wc-dropdown-menu>
        <wc-dropdown-menu-trigger>Open</wc-dropdown-menu-trigger>
        <wc-dropdown-menu-content>
          <wc-dropdown-menu-item>Item 1</wc-dropdown-menu-item>
          <wc-dropdown-menu-separator></wc-dropdown-menu-separator>
          <wc-dropdown-menu-item>Item 2</wc-dropdown-menu-item>
        </wc-dropdown-menu-content>
      </wc-dropdown-menu>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const separator = container.querySelector('wc-dropdown-menu-separator');
    expect(separator?.getAttribute('role')).toBe('separator');
  });
});
