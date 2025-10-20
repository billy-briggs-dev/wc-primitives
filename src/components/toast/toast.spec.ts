import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import './toast-provider.js';
import './toast-viewport.js';
import './toast.js';
import './toast-title.js';
import './toast-description.js';
import './toast-action.js';
import './toast-close.js';
import type { ToastElement } from './toast.js';

describe('Toast Component', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    vi.useFakeTimers();
  });

  afterEach(() => {
    document.body.removeChild(container);
    vi.restoreAllMocks();
  });

  it('should render toast provider element', () => {
    container.innerHTML = `
      <wc-toast-provider>
        <wc-toast-viewport></wc-toast-viewport>
      </wc-toast-provider>
    `;

    const provider = container.querySelector('wc-toast-provider');
    expect(provider).toBeDefined();
    expect(provider?.tagName.toLowerCase()).toBe('wc-toast-provider');
  });

  it('should render toast viewport element', () => {
    container.innerHTML = `<wc-toast-viewport></wc-toast-viewport>`;

    const viewport = container.querySelector('wc-toast-viewport');
    expect(viewport).toBeDefined();
    expect(viewport?.getAttribute('role')).toBe('region');
    expect(viewport?.getAttribute('aria-live')).toBe('polite');
  });

  it('should render toast element', () => {
    container.innerHTML = `
      <wc-toast>
        <wc-toast-title>Title</wc-toast-title>
        <wc-toast-description>Description</wc-toast-description>
      </wc-toast>
    `;

    const toast = container.querySelector('wc-toast') as ToastElement;
    expect(toast).toBeDefined();
    expect(toast.tagName.toLowerCase()).toBe('wc-toast');
  });

  it('should have correct default properties', () => {
    const toast = document.createElement('wc-toast') as ToastElement;
    container.appendChild(toast);

    expect(toast.open).toBe(false);
    expect(toast.type).toBe('foreground');
    expect(toast.duration).toBe(5000);
  });

  it('should set aria attributes', async () => {
    container.innerHTML = `
      <wc-toast>
        <wc-toast-title>Title</wc-toast-title>
        <wc-toast-description>Description</wc-toast-description>
      </wc-toast>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const toast = container.querySelector('wc-toast');

    expect(toast?.getAttribute('role')).toBe('status');
    expect(toast?.getAttribute('aria-live')).toBe('assertive');
    expect(toast?.getAttribute('aria-atomic')).toBe('true');
  });

  it('should update data-state when open changes', async () => {
    container.innerHTML = `<wc-toast></wc-toast>`;

    await new Promise(resolve => setTimeout(resolve, 100));

    const toast = container.querySelector('wc-toast') as ToastElement;

    expect(toast.getAttribute('data-state')).toBe('closed');

    toast.open = true;
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(toast.getAttribute('data-state')).toBe('open');
  });

  it('should auto-close after duration', async () => {
    container.innerHTML = `<wc-toast duration="1000"></wc-toast>`;

    await new Promise(resolve => setTimeout(resolve, 100));

    const toast = container.querySelector('wc-toast') as ToastElement;

    toast.open = true;
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(toast.open).toBe(true);

    vi.advanceTimersByTime(1000);
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(toast.open).toBe(false);
  });

  it('should not auto-close when duration is 0', async () => {
    container.innerHTML = `<wc-toast duration="0"></wc-toast>`;

    await new Promise(resolve => setTimeout(resolve, 100));

    const toast = container.querySelector('wc-toast') as ToastElement;

    toast.open = true;
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(toast.open).toBe(true);

    vi.advanceTimersByTime(10000);
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(toast.open).toBe(true);
  });

  it('should close toast when close button is clicked', async () => {
    container.innerHTML = `
      <wc-toast open>
        <wc-toast-close>Close</wc-toast-close>
      </wc-toast>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const toast = container.querySelector('wc-toast') as ToastElement;
    const closeButton = container.querySelector('wc-toast-close') as HTMLElement;

    expect(toast.open).toBe(true);

    closeButton.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(toast.open).toBe(false);
  });

  it('should dispatch open-change event', async () => {
    container.innerHTML = `<wc-toast></wc-toast>`;

    await new Promise(resolve => setTimeout(resolve, 100));

    const toast = container.querySelector('wc-toast') as ToastElement;
    
    let eventFired = false;
    let eventDetail: any = null;
    
    toast.addEventListener('open-change', (e: Event) => {
      eventFired = true;
      eventDetail = (e as CustomEvent).detail;
    });

    toast.open = true;
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(eventFired).toBe(true);
    expect(eventDetail.open).toBe(true);
  });

  it('should link title to toast with aria-labelledby', async () => {
    container.innerHTML = `
      <wc-toast>
        <wc-toast-title>Test Title</wc-toast-title>
      </wc-toast>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const toast = container.querySelector('wc-toast');
    const title = container.querySelector('wc-toast-title');

    expect(title?.hasAttribute('id')).toBe(true);
    expect(toast?.getAttribute('aria-labelledby')).toBe(title?.getAttribute('id'));
  });

  it('should link description to toast with aria-describedby', async () => {
    container.innerHTML = `
      <wc-toast>
        <wc-toast-description>Test Description</wc-toast-description>
      </wc-toast>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const toast = container.querySelector('wc-toast');
    const description = container.querySelector('wc-toast-description');

    expect(description?.hasAttribute('id')).toBe(true);
    expect(toast?.getAttribute('aria-describedby')).toBe(description?.getAttribute('id'));
  });

  it('should set correct aria-live based on type', async () => {
    container.innerHTML = `
      <wc-toast type="background"></wc-toast>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const toast = container.querySelector('wc-toast');

    expect(toast?.getAttribute('aria-live')).toBe('polite');
    expect(toast?.getAttribute('data-type')).toBe('background');
  });
});
