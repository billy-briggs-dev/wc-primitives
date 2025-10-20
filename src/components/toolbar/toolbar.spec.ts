import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './toolbar.js';
import './toolbar-button.js';
import './toolbar-separator.js';
import './toolbar-toggle-group.js';
import './toolbar-toggle-item.js';
import type { ToolbarElement } from './toolbar.js';
import type { ToolbarToggleGroupElement } from './toolbar-toggle-group.js';

describe('Toolbar Component', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should render toolbar element', () => {
    container.innerHTML = `
      <wc-toolbar>
        <wc-toolbar-button>Cut</wc-toolbar-button>
        <wc-toolbar-button>Copy</wc-toolbar-button>
      </wc-toolbar>
    `;

    const toolbar = container.querySelector('wc-toolbar') as ToolbarElement;
    expect(toolbar).toBeDefined();
    expect(toolbar.tagName.toLowerCase()).toBe('wc-toolbar');
  });

  it('should have correct default properties', () => {
    const toolbar = document.createElement('wc-toolbar') as ToolbarElement;
    container.appendChild(toolbar);

    expect(toolbar.orientation).toBe('horizontal');
    expect(toolbar.disabled).toBe(false);
    expect(toolbar.rovingTabindex).toBe(true);
  });

  it('should set correct ARIA attributes', async () => {
    container.innerHTML = `
      <wc-toolbar>
        <wc-toolbar-button>Button</wc-toolbar-button>
      </wc-toolbar>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const toolbar = container.querySelector('wc-toolbar');
    const button = container.querySelector('wc-toolbar-button');

    expect(toolbar?.getAttribute('role')).toBe('toolbar');
    expect(toolbar?.getAttribute('data-orientation')).toBe('horizontal');
    expect(button?.getAttribute('role')).toBe('button');
  });

  it('should set aria-orientation for vertical toolbar', async () => {
    container.innerHTML = `
      <wc-toolbar orientation="vertical">
        <wc-toolbar-button>Button</wc-toolbar-button>
      </wc-toolbar>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const toolbar = container.querySelector('wc-toolbar');
    expect(toolbar?.getAttribute('aria-orientation')).toBe('vertical');
    expect(toolbar?.getAttribute('data-orientation')).toBe('vertical');
  });

  it('should handle keyboard navigation in horizontal toolbar', async () => {
    container.innerHTML = `
      <wc-toolbar>
        <wc-toolbar-button>Button 1</wc-toolbar-button>
        <wc-toolbar-button>Button 2</wc-toolbar-button>
        <wc-toolbar-button>Button 3</wc-toolbar-button>
      </wc-toolbar>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const buttons = container.querySelectorAll('wc-toolbar-button');

    // Focus first button
    (buttons[0] as HTMLElement).focus();
    expect(document.activeElement).toBe(buttons[0]);

    // Press ArrowRight to move to next button
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
    (buttons[0] as HTMLElement).dispatchEvent(event);

    await new Promise(resolve => setTimeout(resolve, 50));
    expect(document.activeElement).toBe(buttons[1]);
  });

  it('should handle keyboard navigation in vertical toolbar', async () => {
    container.innerHTML = `
      <wc-toolbar orientation="vertical">
        <wc-toolbar-button>Button 1</wc-toolbar-button>
        <wc-toolbar-button>Button 2</wc-toolbar-button>
      </wc-toolbar>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const buttons = container.querySelectorAll('wc-toolbar-button');

    // Focus first button
    (buttons[0] as HTMLElement).focus();

    // Press ArrowDown to move to next button
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true });
    (buttons[0] as HTMLElement).dispatchEvent(event);

    await new Promise(resolve => setTimeout(resolve, 50));
    expect(document.activeElement).toBe(buttons[1]);
  });

  it('should respect disabled state', async () => {
    container.innerHTML = `
      <wc-toolbar disabled>
        <wc-toolbar-button>Button</wc-toolbar-button>
      </wc-toolbar>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const toolbar = container.querySelector('wc-toolbar');
    expect(toolbar?.hasAttribute('data-disabled')).toBe(true);
    expect(toolbar?.getAttribute('aria-disabled')).toBe('true');
  });

  it('should render separator with correct role', async () => {
    container.innerHTML = `
      <wc-toolbar>
        <wc-toolbar-button>Cut</wc-toolbar-button>
        <wc-toolbar-separator></wc-toolbar-separator>
        <wc-toolbar-button>Copy</wc-toolbar-button>
      </wc-toolbar>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const separator = container.querySelector('wc-toolbar-separator');
    expect(separator?.getAttribute('role')).toBe('separator');
  });

  describe('Toolbar Toggle Group', () => {
    it('should render toggle group', () => {
      container.innerHTML = `
        <wc-toolbar>
          <wc-toolbar-toggle-group type="single">
            <wc-toolbar-toggle-item value="left">Left</wc-toolbar-toggle-item>
            <wc-toolbar-toggle-item value="center">Center</wc-toolbar-toggle-item>
          </wc-toolbar-toggle-group>
        </wc-toolbar>
      `;

      const toggleGroup = container.querySelector('wc-toolbar-toggle-group') as ToolbarToggleGroupElement;
      expect(toggleGroup).toBeDefined();
      expect(toggleGroup.tagName.toLowerCase()).toBe('wc-toolbar-toggle-group');
    });

    it('should have correct default properties for toggle group', () => {
      const toggleGroup = document.createElement('wc-toolbar-toggle-group') as ToolbarToggleGroupElement;
      container.appendChild(toggleGroup);

      expect(toggleGroup.type).toBe('single');
      expect(toggleGroup.value).toBe('');
      expect(toggleGroup.disabled).toBe(false);
    });

    it('should toggle item in single mode', async () => {
      container.innerHTML = `
        <wc-toolbar>
          <wc-toolbar-toggle-group type="single">
            <wc-toolbar-toggle-item value="left">Left</wc-toolbar-toggle-item>
            <wc-toolbar-toggle-item value="center">Center</wc-toolbar-toggle-item>
          </wc-toolbar-toggle-group>
        </wc-toolbar>
      `;

      await new Promise(resolve => setTimeout(resolve, 100));

      const toggleGroup = container.querySelector('wc-toolbar-toggle-group') as ToolbarToggleGroupElement;
      const items = container.querySelectorAll('wc-toolbar-toggle-item');

      expect(toggleGroup.isItemActive('left')).toBe(false);

      (items[0] as HTMLElement).click();
      await new Promise(resolve => setTimeout(resolve, 50));

      expect(toggleGroup.isItemActive('left')).toBe(true);
      expect(toggleGroup.isItemActive('center')).toBe(false);

      // Clicking second item should deactivate first
      (items[1] as HTMLElement).click();
      await new Promise(resolve => setTimeout(resolve, 50));

      expect(toggleGroup.isItemActive('left')).toBe(false);
      expect(toggleGroup.isItemActive('center')).toBe(true);
    });

    it('should toggle multiple items in multiple mode', async () => {
      container.innerHTML = `
        <wc-toolbar>
          <wc-toolbar-toggle-group type="multiple">
            <wc-toolbar-toggle-item value="bold">Bold</wc-toolbar-toggle-item>
            <wc-toolbar-toggle-item value="italic">Italic</wc-toolbar-toggle-item>
          </wc-toolbar-toggle-group>
        </wc-toolbar>
      `;

      await new Promise(resolve => setTimeout(resolve, 100));

      const toggleGroup = container.querySelector('wc-toolbar-toggle-group') as ToolbarToggleGroupElement;
      const items = container.querySelectorAll('wc-toolbar-toggle-item');

      (items[0] as HTMLElement).click();
      await new Promise(resolve => setTimeout(resolve, 50));

      expect(toggleGroup.isItemActive('bold')).toBe(true);
      expect(toggleGroup.isItemActive('italic')).toBe(false);

      (items[1] as HTMLElement).click();
      await new Promise(resolve => setTimeout(resolve, 50));

      // Both should be active in multiple mode
      expect(toggleGroup.isItemActive('bold')).toBe(true);
      expect(toggleGroup.isItemActive('italic')).toBe(true);
    });

    it('should set correct aria-pressed attribute on toggle items', async () => {
      container.innerHTML = `
        <wc-toolbar>
          <wc-toolbar-toggle-group type="single" value="center">
            <wc-toolbar-toggle-item value="left">Left</wc-toolbar-toggle-item>
            <wc-toolbar-toggle-item value="center">Center</wc-toolbar-toggle-item>
          </wc-toolbar-toggle-group>
        </wc-toolbar>
      `;

      await new Promise(resolve => setTimeout(resolve, 100));

      const items = container.querySelectorAll('wc-toolbar-toggle-item');

      expect(items[0].getAttribute('aria-pressed')).toBe('false');
      expect(items[0].getAttribute('data-state')).toBe('off');
      expect(items[1].getAttribute('aria-pressed')).toBe('true');
      expect(items[1].getAttribute('data-state')).toBe('on');
    });

    it('should respect disabled state on toggle group', async () => {
      container.innerHTML = `
        <wc-toolbar>
          <wc-toolbar-toggle-group type="single" disabled>
            <wc-toolbar-toggle-item value="left">Left</wc-toolbar-toggle-item>
          </wc-toolbar-toggle-group>
        </wc-toolbar>
      `;

      await new Promise(resolve => setTimeout(resolve, 100));

      const toggleGroup = container.querySelector('wc-toolbar-toggle-group') as ToolbarToggleGroupElement;
      const item = container.querySelector('wc-toolbar-toggle-item') as HTMLElement;

      expect(toggleGroup.isItemActive('left')).toBe(false);

      item.click();
      await new Promise(resolve => setTimeout(resolve, 50));

      // Should still be false because group is disabled
      expect(toggleGroup.isItemActive('left')).toBe(false);
    });

    it('should fire value-change event when toggle changes', async () => {
      container.innerHTML = `
        <wc-toolbar>
          <wc-toolbar-toggle-group type="single">
            <wc-toolbar-toggle-item value="left">Left</wc-toolbar-toggle-item>
          </wc-toolbar-toggle-group>
        </wc-toolbar>
      `;

      await new Promise(resolve => setTimeout(resolve, 100));

      const toggleGroup = container.querySelector('wc-toolbar-toggle-group') as ToolbarToggleGroupElement;
      const item = container.querySelector('wc-toolbar-toggle-item') as HTMLElement;

      let eventFired = false;
      let eventDetail: { value: string } | null = null;

      toggleGroup.addEventListener('value-change', (e: Event) => {
        eventFired = true;
        eventDetail = (e as CustomEvent).detail;
      });

      item.click();
      await new Promise(resolve => setTimeout(resolve, 50));

      expect(eventFired).toBe(true);
      expect(eventDetail.value).toBe('left');
    });
  });

  describe('Toolbar Button', () => {
    it('should handle button clicks', async () => {
      container.innerHTML = `
        <wc-toolbar>
          <wc-toolbar-button>Click me</wc-toolbar-button>
        </wc-toolbar>
      `;

      await new Promise(resolve => setTimeout(resolve, 100));

      const button = container.querySelector('wc-toolbar-button') as HTMLElement;
      let clicked = false;

      button.addEventListener('click', () => {
        clicked = true;
      });

      button.click();
      await new Promise(resolve => setTimeout(resolve, 50));

      expect(clicked).toBe(true);
    });

    it('should respect disabled state on button', async () => {
      container.innerHTML = `
        <wc-toolbar>
          <wc-toolbar-button disabled>Click me</wc-toolbar-button>
        </wc-toolbar>
      `;

      await new Promise(resolve => setTimeout(resolve, 100));

      const button = container.querySelector('wc-toolbar-button');
      expect(button?.hasAttribute('data-disabled')).toBe(true);
      expect(button?.getAttribute('aria-disabled')).toBe('true');
    });
  });
});
