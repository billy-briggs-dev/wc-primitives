import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './context-menu.js';
import './context-menu-trigger.js';
import './context-menu-content.js';
import './context-menu-item.js';
import './context-menu-separator.js';
import './context-menu-label.js';
import type { ContextMenuElement } from './context-menu.js';

describe('Context Menu Component', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should render context menu element', () => {
    container.innerHTML = `
      <wc-context-menu>
        <wc-context-menu-trigger>
          <div>Right-click me</div>
        </wc-context-menu-trigger>
        <wc-context-menu-content>
          <wc-context-menu-item>Item 1</wc-context-menu-item>
        </wc-context-menu-content>
      </wc-context-menu>
    `;

    const menu = container.querySelector('wc-context-menu') as ContextMenuElement;
    expect(menu).toBeDefined();
    expect(menu.tagName.toLowerCase()).toBe('wc-context-menu');
  });

  it('should have correct default properties', () => {
    const menu = document.createElement('wc-context-menu') as ContextMenuElement;
    container.appendChild(menu);

    expect(menu.open).toBe(false);
    expect(menu.disabled).toBe(false);
  });

  it('should set aria attributes', async () => {
    container.innerHTML = `
      <wc-context-menu>
        <wc-context-menu-trigger>
          <div>Right-click me</div>
        </wc-context-menu-trigger>
        <wc-context-menu-content>
          <wc-context-menu-item>Item 1</wc-context-menu-item>
        </wc-context-menu-content>
      </wc-context-menu>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const menu = container.querySelector('wc-context-menu');
    const content = container.querySelector('wc-context-menu-content');
    const item = container.querySelector('wc-context-menu-item');

    expect(menu?.getAttribute('role')).toBe('group');
    expect(content?.getAttribute('role')).toBe('menu');
    expect(item?.getAttribute('role')).toBe('menuitem');
  });

  it('should open menu on contextmenu event', async () => {
    container.innerHTML = `
      <wc-context-menu>
        <wc-context-menu-trigger>
          <div>Right-click me</div>
        </wc-context-menu-trigger>
        <wc-context-menu-content>
          <wc-context-menu-item>Item 1</wc-context-menu-item>
        </wc-context-menu-content>
      </wc-context-menu>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const menu = container.querySelector('wc-context-menu') as ContextMenuElement;
    const trigger = container.querySelector('wc-context-menu-trigger') as HTMLElement;

    expect(menu.open).toBe(false);

    // Simulate right-click
    const contextMenuEvent = new MouseEvent('contextmenu', {
      bubbles: true,
      cancelable: true,
      clientX: 100,
      clientY: 200,
    });
    trigger.dispatchEvent(contextMenuEvent);
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(menu.open).toBe(true);
    const position = menu.getPosition();
    expect(position.x).toBe(100);
    expect(position.y).toBe(200);
  });

  it('should close menu on item click', async () => {
    container.innerHTML = `
      <wc-context-menu>
        <wc-context-menu-trigger>
          <div>Right-click me</div>
        </wc-context-menu-trigger>
        <wc-context-menu-content>
          <wc-context-menu-item>Item 1</wc-context-menu-item>
        </wc-context-menu-content>
      </wc-context-menu>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const menu = container.querySelector('wc-context-menu') as ContextMenuElement;
    const trigger = container.querySelector('wc-context-menu-trigger') as HTMLElement;
    const item = container.querySelector('wc-context-menu-item') as HTMLElement;

    // Open menu with right-click
    const contextMenuEvent = new MouseEvent('contextmenu', {
      bubbles: true,
      cancelable: true,
      clientX: 100,
      clientY: 200,
    });
    trigger.dispatchEvent(contextMenuEvent);
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(menu.open).toBe(true);

    // Click item
    item.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(menu.open).toBe(false);
  });

  it('should support keyboard navigation with arrows', async () => {
    container.innerHTML = `
      <wc-context-menu>
        <wc-context-menu-trigger>
          <div>Right-click me</div>
        </wc-context-menu-trigger>
        <wc-context-menu-content>
          <wc-context-menu-item>Item 1</wc-context-menu-item>
          <wc-context-menu-item>Item 2</wc-context-menu-item>
          <wc-context-menu-item>Item 3</wc-context-menu-item>
        </wc-context-menu-content>
      </wc-context-menu>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const menu = container.querySelector('wc-context-menu') as ContextMenuElement;
    const trigger = container.querySelector('wc-context-menu-trigger') as HTMLElement;
    const content = container.querySelector('wc-context-menu-content') as HTMLElement;

    // Open menu with right-click
    const contextMenuEvent = new MouseEvent('contextmenu', {
      bubbles: true,
      cancelable: true,
      clientX: 100,
      clientY: 200,
    });
    trigger.dispatchEvent(contextMenuEvent);
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(menu.open).toBe(true);

    // Focus content and navigate
    content.focus();

    const downEvent = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true });
    content.dispatchEvent(downEvent);
    await new Promise(resolve => setTimeout(resolve, 50));

    // First item should be focused
    const items = container.querySelectorAll('wc-context-menu-item');
    expect(document.activeElement).toBe(items[0]);
  });

  it('should close menu on Escape key', async () => {
    container.innerHTML = `
      <wc-context-menu>
        <wc-context-menu-trigger>
          <div>Right-click me</div>
        </wc-context-menu-trigger>
        <wc-context-menu-content>
          <wc-context-menu-item>Item 1</wc-context-menu-item>
        </wc-context-menu-content>
      </wc-context-menu>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const menu = container.querySelector('wc-context-menu') as ContextMenuElement;
    const trigger = container.querySelector('wc-context-menu-trigger') as HTMLElement;
    const content = container.querySelector('wc-context-menu-content') as HTMLElement;

    // Open menu with right-click
    const contextMenuEvent = new MouseEvent('contextmenu', {
      bubbles: true,
      cancelable: true,
      clientX: 100,
      clientY: 200,
    });
    trigger.dispatchEvent(contextMenuEvent);
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
      <wc-context-menu disabled>
        <wc-context-menu-trigger>
          <div>Right-click me</div>
        </wc-context-menu-trigger>
        <wc-context-menu-content>
          <wc-context-menu-item>Item 1</wc-context-menu-item>
        </wc-context-menu-content>
      </wc-context-menu>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const menu = container.querySelector('wc-context-menu') as ContextMenuElement;
    const trigger = container.querySelector('wc-context-menu-trigger') as HTMLElement;

    expect(menu.open).toBe(false);

    // Try to open menu with right-click
    const contextMenuEvent = new MouseEvent('contextmenu', {
      bubbles: true,
      cancelable: true,
      clientX: 100,
      clientY: 200,
    });
    trigger.dispatchEvent(contextMenuEvent);
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(menu.open).toBe(false);
  });

  it('should fire open-change event', async () => {
    container.innerHTML = `
      <wc-context-menu>
        <wc-context-menu-trigger>
          <div>Right-click me</div>
        </wc-context-menu-trigger>
        <wc-context-menu-content>
          <wc-context-menu-item>Item 1</wc-context-menu-item>
        </wc-context-menu-content>
      </wc-context-menu>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const menu = container.querySelector('wc-context-menu') as ContextMenuElement;
    const trigger = container.querySelector('wc-context-menu-trigger') as HTMLElement;

    let eventFired = false;
    let eventDetail: any;

    menu.addEventListener('open-change', (e: Event) => {
      eventFired = true;
      eventDetail = (e as CustomEvent).detail;
    });

    // Open menu with right-click
    const contextMenuEvent = new MouseEvent('contextmenu', {
      bubbles: true,
      cancelable: true,
      clientX: 100,
      clientY: 200,
    });
    trigger.dispatchEvent(contextMenuEvent);
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(eventFired).toBe(true);
    expect(eventDetail.open).toBe(true);
  });

  it('should render separator with correct role', async () => {
    container.innerHTML = `
      <wc-context-menu>
        <wc-context-menu-trigger>
          <div>Right-click me</div>
        </wc-context-menu-trigger>
        <wc-context-menu-content>
          <wc-context-menu-item>Item 1</wc-context-menu-item>
          <wc-context-menu-separator></wc-context-menu-separator>
          <wc-context-menu-item>Item 2</wc-context-menu-item>
        </wc-context-menu-content>
      </wc-context-menu>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const separator = container.querySelector('wc-context-menu-separator');
    expect(separator?.getAttribute('role')).toBe('separator');
  });
});
