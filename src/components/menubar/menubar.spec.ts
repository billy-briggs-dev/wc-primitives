import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './menubar.js';
import './menubar-menu.js';
import './menubar-trigger.js';
import './menubar-content.js';
import './menubar-item.js';
import './menubar-separator.js';

describe('Menubar Component', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should render', async () => {
    container.innerHTML = `
      <wc-menubar>
        <wc-menubar-menu>
          <wc-menubar-trigger>File</wc-menubar-trigger>
          <wc-menubar-content>
            <wc-menubar-item>New</wc-menubar-item>
          </wc-menubar-content>
        </wc-menubar-menu>
      </wc-menubar>
    `;
    await new Promise((resolve) => setTimeout(resolve, 100));

    const menubar = container.querySelector('wc-menubar');
    expect(menubar).toBeDefined();
  });

  it('should have proper roles', async () => {
    container.innerHTML = `
      <wc-menubar>
        <wc-menubar-menu>
          <wc-menubar-trigger>File</wc-menubar-trigger>
          <wc-menubar-content>
            <wc-menubar-item>New</wc-menubar-item>
          </wc-menubar-content>
        </wc-menubar-menu>
      </wc-menubar>
    `;
    await new Promise((resolve) => setTimeout(resolve, 100));

    const menubar = container.querySelector('wc-menubar');
    const trigger = container.querySelector('wc-menubar-trigger');
    const content = container.querySelector('wc-menubar-content');
    const item = container.querySelector('wc-menubar-item');

    expect(menubar?.getAttribute('role')).toBe('menubar');
    expect(trigger?.getAttribute('role')).toBe('menuitem');
    expect(content?.getAttribute('role')).toBe('menu');
    expect(item?.getAttribute('role')).toBe('menuitem');
  });

  it('should open menu on trigger click', async () => {
    container.innerHTML = `
      <wc-menubar>
        <wc-menubar-menu>
          <wc-menubar-trigger>File</wc-menubar-trigger>
          <wc-menubar-content>
            <wc-menubar-item>New</wc-menubar-item>
          </wc-menubar-content>
        </wc-menubar-menu>
      </wc-menubar>
    `;
    await new Promise((resolve) => setTimeout(resolve, 100));

    const menu = container.querySelector('wc-menubar-menu');
    const trigger = container.querySelector('wc-menubar-trigger');

    expect(menu?.getAttribute('data-state')).toBe('closed');

    trigger?.click();
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(menu?.getAttribute('data-state')).toBe('open');
  });

  it('should close menu on item click', async () => {
    container.innerHTML = `
      <wc-menubar>
        <wc-menubar-menu>
          <wc-menubar-trigger>File</wc-menubar-trigger>
          <wc-menubar-content>
            <wc-menubar-item>New</wc-menubar-item>
          </wc-menubar-content>
        </wc-menubar-menu>
      </wc-menubar>
    `;
    await new Promise((resolve) => setTimeout(resolve, 100));

    const menu = container.querySelector('wc-menubar-menu');
    const trigger = container.querySelector('wc-menubar-trigger');
    const item = container.querySelector('wc-menubar-item');

    // Open menu
    trigger?.click();
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(menu?.getAttribute('data-state')).toBe('open');

    // Click item
    item?.click();
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(menu?.getAttribute('data-state')).toBe('closed');
  });

  it('should dispatch select event on item click', async () => {
    container.innerHTML = `
      <wc-menubar>
        <wc-menubar-menu>
          <wc-menubar-trigger>File</wc-menubar-trigger>
          <wc-menubar-content>
            <wc-menubar-item>New File</wc-menubar-item>
          </wc-menubar-content>
        </wc-menubar-menu>
      </wc-menubar>
    `;
    await new Promise((resolve) => setTimeout(resolve, 100));

    const item = container.querySelector('wc-menubar-item');

    let eventFired = false;
    let eventDetail: any = null;

    item?.addEventListener('select', ((e: CustomEvent) => {
      eventFired = true;
      eventDetail = e.detail;
    }) as EventListener);

    item?.click();
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(eventFired).toBe(true);
    expect(eventDetail?.value).toBe('New File');
  });

  it('should have proper aria attributes', async () => {
    container.innerHTML = `
      <wc-menubar>
        <wc-menubar-menu>
          <wc-menubar-trigger>File</wc-menubar-trigger>
          <wc-menubar-content>
            <wc-menubar-item>New</wc-menubar-item>
          </wc-menubar-content>
        </wc-menubar-menu>
      </wc-menubar>
    `;
    await new Promise((resolve) => setTimeout(resolve, 100));

    const trigger = container.querySelector('wc-menubar-trigger');
    const content = container.querySelector('wc-menubar-content');

    expect(trigger?.getAttribute('aria-haspopup')).toBe('true');
    expect(trigger?.getAttribute('aria-expanded')).toBe('false');
    expect(trigger?.hasAttribute('aria-controls')).toBe(true);
    expect(content?.hasAttribute('id')).toBe(true);
  });

  it('should not open when disabled', async () => {
    container.innerHTML = `
      <wc-menubar>
        <wc-menubar-menu disabled>
          <wc-menubar-trigger>File</wc-menubar-trigger>
          <wc-menubar-content>
            <wc-menubar-item>New</wc-menubar-item>
          </wc-menubar-content>
        </wc-menubar-menu>
      </wc-menubar>
    `;
    await new Promise((resolve) => setTimeout(resolve, 100));

    const menu = container.querySelector('wc-menubar-menu');
    const trigger = container.querySelector('wc-menubar-trigger');

    expect(menu?.hasAttribute('data-disabled')).toBe(true);

    trigger?.click();
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(menu?.getAttribute('data-state')).toBe('closed');
  });

  it('should render separator', async () => {
    container.innerHTML = `
      <wc-menubar>
        <wc-menubar-menu>
          <wc-menubar-trigger>File</wc-menubar-trigger>
          <wc-menubar-content>
            <wc-menubar-item>New</wc-menubar-item>
            <wc-menubar-separator></wc-menubar-separator>
            <wc-menubar-item>Open</wc-menubar-item>
          </wc-menubar-content>
        </wc-menubar-menu>
      </wc-menubar>
    `;
    await new Promise((resolve) => setTimeout(resolve, 100));

    const separator = container.querySelector('wc-menubar-separator');
    expect(separator).toBeDefined();
    expect(separator?.getAttribute('role')).toBe('separator');
  });

  it('should handle keyboard navigation between triggers', async () => {
    container.innerHTML = `
      <wc-menubar>
        <wc-menubar-menu>
          <wc-menubar-trigger>File</wc-menubar-trigger>
          <wc-menubar-content>
            <wc-menubar-item>New</wc-menubar-item>
          </wc-menubar-content>
        </wc-menubar-menu>
        <wc-menubar-menu>
          <wc-menubar-trigger>Edit</wc-menubar-trigger>
          <wc-menubar-content>
            <wc-menubar-item>Cut</wc-menubar-item>
          </wc-menubar-content>
        </wc-menubar-menu>
      </wc-menubar>
    `;
    await new Promise((resolve) => setTimeout(resolve, 100));

    const triggers = container.querySelectorAll('wc-menubar-trigger');
    const firstTrigger = triggers[0] as HTMLElement;
    const secondTrigger = triggers[1] as HTMLElement;

    firstTrigger.focus();
    expect(document.activeElement).toBe(firstTrigger);

    // Simulate ArrowRight
    const event = new KeyboardEvent('keydown', {
      key: 'ArrowRight',
      bubbles: true,
    });
    firstTrigger.dispatchEvent(event);
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(document.activeElement).toBe(secondTrigger);
  });

  it('should not interact with disabled items', async () => {
    container.innerHTML = `
      <wc-menubar>
        <wc-menubar-menu>
          <wc-menubar-trigger>File</wc-menubar-trigger>
          <wc-menubar-content>
            <wc-menubar-item disabled>Disabled Item</wc-menubar-item>
          </wc-menubar-content>
        </wc-menubar-menu>
      </wc-menubar>
    `;
    await new Promise((resolve) => setTimeout(resolve, 100));

    const item = container.querySelector('wc-menubar-item');

    expect(item?.hasAttribute('data-disabled')).toBe(true);
    expect(item?.getAttribute('aria-disabled')).toBe('true');

    let eventFired = false;
    item?.addEventListener('select', () => {
      eventFired = true;
    });

    item?.click();
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(eventFired).toBe(false);
  });
});
