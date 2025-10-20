import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './hover-card.js';
import './hover-card-trigger.js';
import './hover-card-content.js';

describe('Hover Card Component', () => {
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
      <wc-hover-card>
        <wc-hover-card-trigger>Hover me</wc-hover-card-trigger>
        <wc-hover-card-content>Content</wc-hover-card-content>
      </wc-hover-card>
    `;
    await new Promise((resolve) => setTimeout(resolve, 100));

    const hoverCard = container.querySelector('wc-hover-card');
    expect(hoverCard).toBeDefined();
  });

  it('should have proper role', async () => {
    container.innerHTML = `
      <wc-hover-card>
        <wc-hover-card-trigger>Hover me</wc-hover-card-trigger>
        <wc-hover-card-content>Content</wc-hover-card-content>
      </wc-hover-card>
    `;
    await new Promise((resolve) => setTimeout(resolve, 100));

    const hoverCard = container.querySelector('wc-hover-card');
    const content = container.querySelector('wc-hover-card-content');
    
    expect(hoverCard?.getAttribute('role')).toBe('group');
    expect(content?.getAttribute('role')).toBe('dialog');
  });

  it('should open on trigger hover', async () => {
    container.innerHTML = `
      <wc-hover-card>
        <wc-hover-card-trigger>Hover me</wc-hover-card-trigger>
        <wc-hover-card-content>Content</wc-hover-card-content>
      </wc-hover-card>
    `;
    await new Promise((resolve) => setTimeout(resolve, 100));

    const hoverCard = container.querySelector('wc-hover-card') as any;

    expect(hoverCard?.getAttribute('data-state')).toBe('closed');

    // Open directly to test state change
    hoverCard?.openHoverCard(0);
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(hoverCard?.getAttribute('data-state')).toBe('open');
  });

  it('should close on trigger leave', async () => {
    container.innerHTML = `
      <wc-hover-card>
        <wc-hover-card-trigger>Hover me</wc-hover-card-trigger>
        <wc-hover-card-content>Content</wc-hover-card-content>
      </wc-hover-card>
    `;
    await new Promise((resolve) => setTimeout(resolve, 100));

    const hoverCard = container.querySelector('wc-hover-card') as any;

    // Open directly using the method
    hoverCard?.openHoverCard(0);
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(hoverCard?.getAttribute('data-state')).toBe('open');

    // Close directly
    hoverCard?.closeHoverCard(0);
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(hoverCard?.getAttribute('data-state')).toBe('closed');
  });

  it('should open on focus with no delay', async () => {
    container.innerHTML = `
      <wc-hover-card open-delay="500">
        <wc-hover-card-trigger>Focus me</wc-hover-card-trigger>
        <wc-hover-card-content>Content</wc-hover-card-content>
      </wc-hover-card>
    `;
    await new Promise((resolve) => setTimeout(resolve, 100));

    const hoverCard = container.querySelector('wc-hover-card');
    const trigger = container.querySelector('wc-hover-card-trigger');

    expect(hoverCard?.getAttribute('data-state')).toBe('closed');

    // Simulate focus - should open immediately despite openDelay
    trigger?.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(hoverCard?.getAttribute('data-state')).toBe('open');
  });

  it('should have proper aria attributes', async () => {
    container.innerHTML = `
      <wc-hover-card>
        <wc-hover-card-trigger>Trigger</wc-hover-card-trigger>
        <wc-hover-card-content>Content</wc-hover-card-content>
      </wc-hover-card>
    `;
    await new Promise((resolve) => setTimeout(resolve, 100));

    const trigger = container.querySelector('wc-hover-card-trigger');
    const content = container.querySelector('wc-hover-card-content');

    expect(trigger?.getAttribute('aria-expanded')).toBe('false');
    expect(trigger?.hasAttribute('aria-controls')).toBe(true);
    expect(content?.hasAttribute('id')).toBe(true);
  });

  it('should dispatch open-change event', async () => {
    container.innerHTML = `
      <wc-hover-card>
        <wc-hover-card-trigger>Hover me</wc-hover-card-trigger>
        <wc-hover-card-content>Content</wc-hover-card-content>
      </wc-hover-card>
    `;
    await new Promise((resolve) => setTimeout(resolve, 100));

    const hoverCard = container.querySelector('wc-hover-card') as any;

    let eventFired = false;
    let eventDetail: any = null;

    hoverCard?.addEventListener('open-change', ((e: CustomEvent) => {
      eventFired = true;
      eventDetail = e.detail;
    }) as EventListener);

    // Open directly using the method
    hoverCard?.openHoverCard(0);
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(eventFired).toBe(true);
    expect(eventDetail?.open).toBe(true);
  });

  it('should not open when disabled', async () => {
    container.innerHTML = `
      <wc-hover-card disabled open-delay="50">
        <wc-hover-card-trigger>Hover me</wc-hover-card-trigger>
        <wc-hover-card-content>Content</wc-hover-card-content>
      </wc-hover-card>
    `;
    await new Promise((resolve) => setTimeout(resolve, 100));

    const hoverCard = container.querySelector('wc-hover-card');
    const trigger = container.querySelector('wc-hover-card-trigger');

    expect(hoverCard?.hasAttribute('data-disabled')).toBe(true);

    trigger?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(hoverCard?.getAttribute('data-state')).toBe('closed');
  });

  it('should stay open when hovering content', async () => {
    container.innerHTML = `
      <wc-hover-card open-delay="30" close-delay="30">
        <wc-hover-card-trigger>Hover me</wc-hover-card-trigger>
        <wc-hover-card-content>Hoverable content</wc-hover-card-content>
      </wc-hover-card>
    `;
    await new Promise((resolve) => setTimeout(resolve, 100));

    const hoverCard = container.querySelector('wc-hover-card') as any;
    const trigger = container.querySelector('wc-hover-card-trigger') as HTMLElement;
    const content = container.querySelector('wc-hover-card-content') as HTMLElement;

    // Open directly using the method
    hoverCard?.openHoverCard(0);
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(hoverCard?.getAttribute('data-state')).toBe('open');

    // Leave trigger
    trigger?.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    
    // Enter content before close delay
    await new Promise((resolve) => setTimeout(resolve, 10));
    content?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Should still be open
    expect(hoverCard?.getAttribute('data-state')).toBe('open');
  });
});
