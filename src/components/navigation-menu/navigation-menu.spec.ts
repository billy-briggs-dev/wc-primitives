import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './navigation-menu.js';
import './navigation-menu-list.js';
import './navigation-menu-item.js';
import './navigation-menu-trigger.js';
import './navigation-menu-content.js';
import './navigation-menu-link.js';
import type { NavigationMenuElement } from './navigation-menu.js';

describe('Navigation Menu Component', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should render navigation menu element', () => {
    container.innerHTML = `
      <wc-navigation-menu>
        <wc-navigation-menu-list>
          <wc-navigation-menu-item value="item1">
            <wc-navigation-menu-trigger>Item 1</wc-navigation-menu-trigger>
            <wc-navigation-menu-content>Content 1</wc-navigation-menu-content>
          </wc-navigation-menu-item>
        </wc-navigation-menu-list>
      </wc-navigation-menu>
    `;

    const navMenu = container.querySelector('wc-navigation-menu') as NavigationMenuElement;
    expect(navMenu).toBeDefined();
    expect(navMenu.tagName.toLowerCase()).toBe('wc-navigation-menu');
  });

  it('should have correct default properties', () => {
    const navMenu = document.createElement('wc-navigation-menu') as NavigationMenuElement;
    container.appendChild(navMenu);

    expect(navMenu.value).toBe('');
    expect(navMenu.disabled).toBe(false);
    expect(navMenu.orientation).toBe('horizontal');
  });

  it('should set aria attributes on list', async () => {
    container.innerHTML = `
      <wc-navigation-menu>
        <wc-navigation-menu-list>
          <wc-navigation-menu-item value="item1">
            <wc-navigation-menu-trigger>Item 1</wc-navigation-menu-trigger>
          </wc-navigation-menu-item>
        </wc-navigation-menu-list>
      </wc-navigation-menu>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const list = container.querySelector('wc-navigation-menu-list');
    expect(list?.getAttribute('role')).toBe('menubar');
  });

  it('should set aria attributes on trigger', async () => {
    container.innerHTML = `
      <wc-navigation-menu>
        <wc-navigation-menu-list>
          <wc-navigation-menu-item value="item1">
            <wc-navigation-menu-trigger>Item 1</wc-navigation-menu-trigger>
            <wc-navigation-menu-content>Content</wc-navigation-menu-content>
          </wc-navigation-menu-item>
        </wc-navigation-menu-list>
      </wc-navigation-menu>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const trigger = container.querySelector('wc-navigation-menu-trigger');
    expect(trigger?.getAttribute('role')).toBe('button');
    expect(trigger?.getAttribute('aria-expanded')).toBe('false');
  });

  it('should toggle item on trigger click', async () => {
    container.innerHTML = `
      <wc-navigation-menu>
        <wc-navigation-menu-list>
          <wc-navigation-menu-item value="item1">
            <wc-navigation-menu-trigger>Item 1</wc-navigation-menu-trigger>
            <wc-navigation-menu-content>Content</wc-navigation-menu-content>
          </wc-navigation-menu-item>
        </wc-navigation-menu-list>
      </wc-navigation-menu>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const navMenu = container.querySelector('wc-navigation-menu') as NavigationMenuElement;
    const trigger = container.querySelector('wc-navigation-menu-trigger') as HTMLElement;
    const content = container.querySelector('wc-navigation-menu-content');

    expect(navMenu.value).toBe('');
    expect(content?.hasAttribute('hidden')).toBe(true);

    trigger.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(navMenu.value).toBe('item1');
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(content?.hasAttribute('hidden')).toBe(false);
  });

  it('should hide content when closed', async () => {
    container.innerHTML = `
      <wc-navigation-menu value="item1">
        <wc-navigation-menu-list>
          <wc-navigation-menu-item value="item1">
            <wc-navigation-menu-trigger>Item 1</wc-navigation-menu-trigger>
            <wc-navigation-menu-content>Content</wc-navigation-menu-content>
          </wc-navigation-menu-item>
        </wc-navigation-menu-list>
      </wc-navigation-menu>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const content = container.querySelector('wc-navigation-menu-content');
    expect(content?.hasAttribute('hidden')).toBe(false);

    const trigger = container.querySelector('wc-navigation-menu-trigger') as HTMLElement;
    trigger.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(content?.hasAttribute('hidden')).toBe(true);
  });

  it('should dispatch value-change event', async () => {
    container.innerHTML = `
      <wc-navigation-menu>
        <wc-navigation-menu-list>
          <wc-navigation-menu-item value="item1">
            <wc-navigation-menu-trigger>Item 1</wc-navigation-menu-trigger>
            <wc-navigation-menu-content>Content</wc-navigation-menu-content>
          </wc-navigation-menu-item>
        </wc-navigation-menu-list>
      </wc-navigation-menu>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const navMenu = container.querySelector('wc-navigation-menu');
    const trigger = container.querySelector('wc-navigation-menu-trigger') as HTMLElement;

    let eventFired = false;
    let eventValue = '';

    navMenu?.addEventListener('value-change', ((e: CustomEvent) => {
      eventFired = true;
      eventValue = e.detail.value;
    }) as EventListener);

    trigger.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(eventFired).toBe(true);
    expect(eventValue).toBe('item1');
  });

  it('should respect disabled state on item', async () => {
    container.innerHTML = `
      <wc-navigation-menu>
        <wc-navigation-menu-list>
          <wc-navigation-menu-item value="item1" disabled>
            <wc-navigation-menu-trigger>Item 1</wc-navigation-menu-trigger>
            <wc-navigation-menu-content>Content</wc-navigation-menu-content>
          </wc-navigation-menu-item>
        </wc-navigation-menu-list>
      </wc-navigation-menu>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const navMenu = container.querySelector('wc-navigation-menu') as NavigationMenuElement;
    const trigger = container.querySelector('wc-navigation-menu-trigger') as HTMLElement;
    const item = container.querySelector('wc-navigation-menu-item');

    expect(item?.getAttribute('data-disabled')).toBe('');
    expect(trigger.getAttribute('data-disabled')).toBe('');

    trigger.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(navMenu.value).toBe('');
  });

  it('should set data-state on items', async () => {
    container.innerHTML = `
      <wc-navigation-menu value="item1">
        <wc-navigation-menu-list>
          <wc-navigation-menu-item value="item1">
            <wc-navigation-menu-trigger>Item 1</wc-navigation-menu-trigger>
            <wc-navigation-menu-content>Content 1</wc-navigation-menu-content>
          </wc-navigation-menu-item>
          <wc-navigation-menu-item value="item2">
            <wc-navigation-menu-trigger>Item 2</wc-navigation-menu-trigger>
            <wc-navigation-menu-content>Content 2</wc-navigation-menu-content>
          </wc-navigation-menu-item>
        </wc-navigation-menu-list>
      </wc-navigation-menu>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const item1 = container.querySelector('wc-navigation-menu-item[value="item1"]');
    const item2 = container.querySelector('wc-navigation-menu-item[value="item2"]');

    expect(item1?.getAttribute('data-state')).toBe('open');
    expect(item2?.getAttribute('data-state')).toBe('closed');
  });

  it('should handle link component', async () => {
    container.innerHTML = `
      <wc-navigation-menu>
        <wc-navigation-menu-list>
          <wc-navigation-menu-link href="/test">Test Link</wc-navigation-menu-link>
        </wc-navigation-menu-list>
      </wc-navigation-menu>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const link = container.querySelector('wc-navigation-menu-link');
    expect(link?.getAttribute('role')).toBe('link');
    expect(link?.getAttribute('data-href')).toBe('/test');
  });

  it('should respect disabled state on link', async () => {
    container.innerHTML = `
      <wc-navigation-menu>
        <wc-navigation-menu-list>
          <wc-navigation-menu-link href="/test" disabled>
            Disabled Link
          </wc-navigation-menu-link>
        </wc-navigation-menu-list>
      </wc-navigation-menu>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const link = container.querySelector('wc-navigation-menu-link');
    expect(link?.getAttribute('data-disabled')).toBe('');
    expect(link?.getAttribute('aria-disabled')).toBe('true');
  });
});
