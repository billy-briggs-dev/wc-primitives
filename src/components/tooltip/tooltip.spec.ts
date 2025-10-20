import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './tooltip.js';
import './tooltip-trigger.js';
import './tooltip-content.js';
import type { TooltipElement } from './tooltip.js';

describe('Tooltip Component', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should render tooltip element', () => {
    container.innerHTML = `
      <wc-tooltip>
        <wc-tooltip-trigger>Hover me</wc-tooltip-trigger>
        <wc-tooltip-content>Tooltip content</wc-tooltip-content>
      </wc-tooltip>
    `;

    const tooltip = container.querySelector('wc-tooltip') as TooltipElement;
    expect(tooltip).toBeDefined();
    expect(tooltip.tagName.toLowerCase()).toBe('wc-tooltip');
  });

  it('should have correct default properties', () => {
    const tooltip = document.createElement('wc-tooltip') as TooltipElement;
    container.appendChild(tooltip);

    expect(tooltip.open).toBe(false);
    expect(tooltip.disabled).toBe(false);
    expect(tooltip.delayDuration).toBe(700);
    expect(tooltip.skipDelayDuration).toBe(300);
  });

  it('should set aria attributes', async () => {
    container.innerHTML = `
      <wc-tooltip>
        <wc-tooltip-trigger>Hover me</wc-tooltip-trigger>
        <wc-tooltip-content>Tooltip content</wc-tooltip-content>
      </wc-tooltip>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const tooltip = container.querySelector('wc-tooltip');
    const trigger = container.querySelector('wc-tooltip-trigger');
    const content = container.querySelector('wc-tooltip-content');

    expect(tooltip?.getAttribute('role')).toBe('tooltip');
    expect(trigger?.hasAttribute('aria-describedby')).toBe(true);
    expect(content?.getAttribute('role')).toBe('tooltip');
  });

  it('should open tooltip on trigger hover', async () => {
    container.innerHTML = `
      <wc-tooltip>
        <wc-tooltip-trigger>Hover me</wc-tooltip-trigger>
        <wc-tooltip-content>Tooltip content</wc-tooltip-content>
      </wc-tooltip>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const tooltip = container.querySelector('wc-tooltip') as TooltipElement;
    const trigger = container.querySelector('wc-tooltip-trigger') as HTMLElement;

    // Set delayDuration programmatically
    tooltip.delayDuration = 0;

    expect(tooltip.open).toBe(false);

    // Simulate mouse enter
    const mouseEnterEvent = new MouseEvent('mouseenter', { bubbles: true });
    trigger.dispatchEvent(mouseEnterEvent);

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(tooltip.open).toBe(true);
  });

  it('should close tooltip on trigger mouse leave', async () => {
    container.innerHTML = `
      <wc-tooltip>
        <wc-tooltip-trigger>Hover me</wc-tooltip-trigger>
        <wc-tooltip-content>Tooltip content</wc-tooltip-content>
      </wc-tooltip>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const tooltip = container.querySelector('wc-tooltip') as TooltipElement;
    const trigger = container.querySelector('wc-tooltip-trigger') as HTMLElement;

    // Set delayDuration programmatically
    tooltip.delayDuration = 0;

    // Open tooltip
    const mouseEnterEvent = new MouseEvent('mouseenter', { bubbles: true });
    trigger.dispatchEvent(mouseEnterEvent);
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(tooltip.open).toBe(true);

    // Close tooltip
    const mouseLeaveEvent = new MouseEvent('mouseleave', { bubbles: true });
    trigger.dispatchEvent(mouseLeaveEvent);
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(tooltip.open).toBe(false);
  });

  it('should open tooltip on trigger focus', async () => {
    container.innerHTML = `
      <wc-tooltip>
        <wc-tooltip-trigger>Focus me</wc-tooltip-trigger>
        <wc-tooltip-content>Tooltip content</wc-tooltip-content>
      </wc-tooltip>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const tooltip = container.querySelector('wc-tooltip') as TooltipElement;
    const trigger = container.querySelector('wc-tooltip-trigger') as HTMLElement;

    expect(tooltip.open).toBe(false);

    // Simulate focus
    const focusEvent = new FocusEvent('focus', { bubbles: true });
    trigger.dispatchEvent(focusEvent);

    await new Promise(resolve => setTimeout(resolve, 50));

    expect(tooltip.open).toBe(true);
  });

  it('should close tooltip on trigger blur', async () => {
    container.innerHTML = `
      <wc-tooltip>
        <wc-tooltip-trigger>Focus me</wc-tooltip-trigger>
        <wc-tooltip-content>Tooltip content</wc-tooltip-content>
      </wc-tooltip>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const tooltip = container.querySelector('wc-tooltip') as TooltipElement;
    const trigger = container.querySelector('wc-tooltip-trigger') as HTMLElement;

    // Open tooltip with focus
    const focusEvent = new FocusEvent('focus', { bubbles: true });
    trigger.dispatchEvent(focusEvent);
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(tooltip.open).toBe(true);

    // Close tooltip with blur
    const blurEvent = new FocusEvent('blur', { bubbles: true });
    trigger.dispatchEvent(blurEvent);
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(tooltip.open).toBe(false);
  });

  it('should respect disabled state', async () => {
    container.innerHTML = `
      <wc-tooltip disabled>
        <wc-tooltip-trigger>Hover me</wc-tooltip-trigger>
        <wc-tooltip-content>Tooltip content</wc-tooltip-content>
      </wc-tooltip>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const tooltip = container.querySelector('wc-tooltip') as TooltipElement;
    const trigger = container.querySelector('wc-tooltip-trigger') as HTMLElement;

    expect(tooltip.open).toBe(false);

    // Try to open tooltip
    const mouseEnterEvent = new MouseEvent('mouseenter', { bubbles: true });
    trigger.dispatchEvent(mouseEnterEvent);
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(tooltip.open).toBe(false);
  });

  it('should hide content when closed', async () => {
    container.innerHTML = `
      <wc-tooltip>
        <wc-tooltip-trigger>Hover me</wc-tooltip-trigger>
        <wc-tooltip-content>Tooltip content</wc-tooltip-content>
      </wc-tooltip>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const content = container.querySelector('wc-tooltip-content') as HTMLElement;

    // Content should be hidden initially
    expect(content.style.display).toBe('none');
  });

  it('should dispatch open-change event', async () => {
    container.innerHTML = `
      <wc-tooltip>
        <wc-tooltip-trigger>Hover me</wc-tooltip-trigger>
        <wc-tooltip-content>Tooltip content</wc-tooltip-content>
      </wc-tooltip>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const tooltip = container.querySelector('wc-tooltip') as TooltipElement;
    const trigger = container.querySelector('wc-tooltip-trigger') as HTMLElement;

    // Set delayDuration programmatically
    tooltip.delayDuration = 0;

    let eventDetail: { open: boolean } | null = null;
    tooltip.addEventListener('open-change', (e: Event) => {
      eventDetail = (e as CustomEvent).detail;
    });

    // Open tooltip
    const mouseEnterEvent = new MouseEvent('mouseenter', { bubbles: true });
    trigger.dispatchEvent(mouseEnterEvent);
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(eventDetail).toEqual({ open: true });
  });
});
