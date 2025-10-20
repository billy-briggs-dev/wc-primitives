import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './popover.js';
import './popover-trigger.js';
import './popover-anchor.js';
import './popover-portal.js';
import './popover-content.js';
import './popover-close.js';
import type { PopoverElement } from './popover.js';

describe('Popover Component', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should render popover element', () => {
    container.innerHTML = `
      <wc-popover>
        <wc-popover-trigger>Open</wc-popover-trigger>
        <wc-popover-portal>
          <wc-popover-content>Content</wc-popover-content>
        </wc-popover-portal>
      </wc-popover>
    `;

    const popover = container.querySelector('wc-popover') as PopoverElement;
    expect(popover).toBeDefined();
    expect(popover.tagName.toLowerCase()).toBe('wc-popover');
  });

  it('should have correct default properties', () => {
    const popover = document.createElement('wc-popover') as PopoverElement;
    container.appendChild(popover);

    expect(popover.open).toBe(false);
    expect(popover.disabled).toBe(false);
    expect(popover.modal).toBe(false);
  });

  it('should set aria attributes', async () => {
    container.innerHTML = `
      <wc-popover>
        <wc-popover-trigger>Open</wc-popover-trigger>
        <wc-popover-portal>
          <wc-popover-content>Content</wc-popover-content>
        </wc-popover-portal>
      </wc-popover>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const popover = container.querySelector('wc-popover');
    const trigger = container.querySelector('wc-popover-trigger');
    const content = container.querySelector('wc-popover-content');

    expect(popover?.getAttribute('role')).toBe('group');
    expect(trigger?.getAttribute('role')).toBe('button');
    expect(trigger?.getAttribute('aria-expanded')).toBe('false');
    expect(trigger?.getAttribute('aria-haspopup')).toBe('dialog');
    expect(content?.getAttribute('role')).toBe('dialog');
  });

  it('should toggle popover on trigger click', async () => {
    container.innerHTML = `
      <wc-popover>
        <wc-popover-trigger>Open</wc-popover-trigger>
        <wc-popover-portal>
          <wc-popover-content>Content</wc-popover-content>
        </wc-popover-portal>
      </wc-popover>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const popover = container.querySelector('wc-popover') as PopoverElement;
    const trigger = container.querySelector('wc-popover-trigger') as HTMLElement;

    expect(popover.open).toBe(false);

    trigger.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(popover.open).toBe(true);

    trigger.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(popover.open).toBe(false);
  });

  it('should close popover when close button is clicked', async () => {
    container.innerHTML = `
      <wc-popover open>
        <wc-popover-trigger>Open</wc-popover-trigger>
        <wc-popover-portal>
          <wc-popover-content>
            Content
            <wc-popover-close>Close</wc-popover-close>
          </wc-popover-content>
        </wc-popover-portal>
      </wc-popover>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const popover = container.querySelector('wc-popover') as PopoverElement;
    const close = container.querySelector('wc-popover-close') as HTMLElement;

    expect(popover.open).toBe(true);

    close.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(popover.open).toBe(false);
  });

  it('should respect disabled state', async () => {
    container.innerHTML = `
      <wc-popover disabled>
        <wc-popover-trigger>Open</wc-popover-trigger>
        <wc-popover-portal>
          <wc-popover-content>Content</wc-popover-content>
        </wc-popover-portal>
      </wc-popover>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const popover = container.querySelector('wc-popover') as PopoverElement;
    const trigger = container.querySelector('wc-popover-trigger') as HTMLElement;

    expect(popover.open).toBe(false);

    trigger.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(popover.open).toBe(false);
  });

  it('should hide portal when popover is closed', async () => {
    container.innerHTML = `
      <wc-popover>
        <wc-popover-trigger>Open</wc-popover-trigger>
        <wc-popover-portal>
          <wc-popover-content>Content</wc-popover-content>
        </wc-popover-portal>
      </wc-popover>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const portal = container.querySelector('wc-popover-portal') as HTMLElement;

    expect(portal.style.display).toBe('none');
  });

  it('should show portal when popover is open', async () => {
    container.innerHTML = `
      <wc-popover open>
        <wc-popover-trigger>Open</wc-popover-trigger>
        <wc-popover-portal>
          <wc-popover-content>Content</wc-popover-content>
        </wc-popover-portal>
      </wc-popover>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const portal = container.querySelector('wc-popover-portal') as HTMLElement;

    expect(portal.style.display).toBe('');
  });

  it('should set data attributes on content', async () => {
    container.innerHTML = `
      <wc-popover>
        <wc-popover-trigger>Open</wc-popover-trigger>
        <wc-popover-portal>
          <wc-popover-content side="top" align="start">Content</wc-popover-content>
        </wc-popover-portal>
      </wc-popover>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const content = container.querySelector('wc-popover-content');

    expect(content?.getAttribute('data-side')).toBe('top');
    expect(content?.getAttribute('data-align')).toBe('start');
  });

  it('should dispatch open-change event', async () => {
    container.innerHTML = `
      <wc-popover>
        <wc-popover-trigger>Open</wc-popover-trigger>
        <wc-popover-portal>
          <wc-popover-content>Content</wc-popover-content>
        </wc-popover-portal>
      </wc-popover>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const popover = container.querySelector('wc-popover') as PopoverElement;
    const trigger = container.querySelector('wc-popover-trigger') as HTMLElement;

    let eventDetail: { open: boolean } | null = null;
    popover.addEventListener('open-change', (e: Event) => {
      eventDetail = (e as CustomEvent).detail;
    });

    trigger.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(eventDetail).toEqual({ open: true });
  });

  it('should close on escape key when content is focused', async () => {
    container.innerHTML = `
      <wc-popover open>
        <wc-popover-trigger>Open</wc-popover-trigger>
        <wc-popover-portal>
          <wc-popover-content>Content</wc-popover-content>
        </wc-popover-portal>
      </wc-popover>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const popover = container.querySelector('wc-popover') as PopoverElement;
    const content = container.querySelector('wc-popover-content') as HTMLElement;

    expect(popover.open).toBe(true);

    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    content.dispatchEvent(escapeEvent);
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(popover.open).toBe(false);
  });
});
