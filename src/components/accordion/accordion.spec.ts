import { describe, it, expect, beforeEach } from 'vitest';
import './accordion.js';
import './accordion-item.js';
import './accordion-trigger.js';
import './accordion-content.js';
import type { AccordionElement } from './accordion.js';

describe('Accordion Component', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should render accordion element', () => {
    container.innerHTML = `
      <wc-accordion>
        <wc-accordion-item value="item-1">
          <wc-accordion-trigger>Item 1</wc-accordion-trigger>
          <wc-accordion-content>Content 1</wc-accordion-content>
        </wc-accordion-item>
      </wc-accordion>
    `;

    const accordion = container.querySelector('wc-accordion') as AccordionElement;
    expect(accordion).toBeDefined();
    expect(accordion.tagName.toLowerCase()).toBe('wc-accordion');
  });

  it('should have correct default properties', () => {
    const accordion = document.createElement('wc-accordion') as AccordionElement;
    container.appendChild(accordion);

    expect(accordion.type).toBe('single');
    expect(accordion.collapsible).toBe(false);
    expect(accordion.disabled).toBe(false);
    expect(accordion.orientation).toBe('vertical');
  });

  it('should set aria attributes', async () => {
    container.innerHTML = `
      <wc-accordion>
        <wc-accordion-item value="item-1">
          <wc-accordion-trigger>Item 1</wc-accordion-trigger>
          <wc-accordion-content>Content 1</wc-accordion-content>
        </wc-accordion-item>
      </wc-accordion>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const accordion = container.querySelector('wc-accordion');
    const trigger = container.querySelector('wc-accordion-trigger');
    const content = container.querySelector('wc-accordion-content');

    expect(accordion?.getAttribute('role')).toBe('region');
    expect(trigger?.getAttribute('role')).toBe('button');
    expect(trigger?.getAttribute('aria-expanded')).toBe('false');
    expect(content?.getAttribute('role')).toBe('region');
  });

  it('should toggle item on trigger click', async () => {
    container.innerHTML = `
      <wc-accordion type="single" collapsible>
        <wc-accordion-item value="item-1">
          <wc-accordion-trigger>Item 1</wc-accordion-trigger>
          <wc-accordion-content>Content 1</wc-accordion-content>
        </wc-accordion-item>
      </wc-accordion>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const accordion = container.querySelector('wc-accordion') as AccordionElement;
    const trigger = container.querySelector('wc-accordion-trigger') as HTMLElement;

    expect(accordion.isItemOpen('item-1')).toBe(false);

    trigger.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(accordion.isItemOpen('item-1')).toBe(true);
  });

  it('should only allow one item open in single mode', async () => {
    container.innerHTML = `
      <wc-accordion type="single">
        <wc-accordion-item value="item-1">
          <wc-accordion-trigger>Item 1</wc-accordion-trigger>
          <wc-accordion-content>Content 1</wc-accordion-content>
        </wc-accordion-item>
        <wc-accordion-item value="item-2">
          <wc-accordion-trigger>Item 2</wc-accordion-trigger>
          <wc-accordion-content>Content 2</wc-accordion-content>
        </wc-accordion-item>
      </wc-accordion>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const accordion = container.querySelector('wc-accordion') as AccordionElement;
    const triggers = container.querySelectorAll('wc-accordion-trigger');

    (triggers[0] as HTMLElement).click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(accordion.isItemOpen('item-1')).toBe(true);
    expect(accordion.isItemOpen('item-2')).toBe(false);

    (triggers[1] as HTMLElement).click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(accordion.isItemOpen('item-1')).toBe(false);
    expect(accordion.isItemOpen('item-2')).toBe(true);
  });

  it('should allow multiple items open in multiple mode', async () => {
    container.innerHTML = `
      <wc-accordion type="multiple">
        <wc-accordion-item value="item-1">
          <wc-accordion-trigger>Item 1</wc-accordion-trigger>
          <wc-accordion-content>Content 1</wc-accordion-content>
        </wc-accordion-item>
        <wc-accordion-item value="item-2">
          <wc-accordion-trigger>Item 2</wc-accordion-trigger>
          <wc-accordion-content>Content 2</wc-accordion-content>
        </wc-accordion-item>
      </wc-accordion>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const accordion = container.querySelector('wc-accordion') as AccordionElement;
    const triggers = container.querySelectorAll('wc-accordion-trigger');

    (triggers[0] as HTMLElement).click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(accordion.isItemOpen('item-1')).toBe(true);
    expect(accordion.isItemOpen('item-2')).toBe(false);

    (triggers[1] as HTMLElement).click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(accordion.isItemOpen('item-1')).toBe(true);
    expect(accordion.isItemOpen('item-2')).toBe(true);
  });

  it('should respect disabled state', async () => {
    container.innerHTML = `
      <wc-accordion disabled>
        <wc-accordion-item value="item-1">
          <wc-accordion-trigger>Item 1</wc-accordion-trigger>
          <wc-accordion-content>Content 1</wc-accordion-content>
        </wc-accordion-item>
      </wc-accordion>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const accordion = container.querySelector('wc-accordion') as AccordionElement;
    const trigger = container.querySelector('wc-accordion-trigger') as HTMLElement;

    expect(accordion.isItemOpen('item-1')).toBe(false);

    trigger.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(accordion.isItemOpen('item-1')).toBe(false);
  });
});
