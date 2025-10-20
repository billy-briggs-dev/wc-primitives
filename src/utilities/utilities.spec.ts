import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './visually-hidden.js';
import './slot.js';
import './portal.js';
import './accessible-icon.js';
import './direction-provider.js';
import { getDirection } from './direction-provider.js';
import type { VisuallyHiddenElement } from './visually-hidden.js';
import type { SlotElement } from './slot.js';
import type { PortalElement } from './portal.js';
import type { AccessibleIconElement } from './accessible-icon.js';
import type { DirectionProviderElement } from './direction-provider.js';

describe('Utilities', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('VisuallyHidden', () => {
    it('should render visually hidden element', () => {
      container.innerHTML = `
        <wc-visually-hidden>Hidden content</wc-visually-hidden>
      `;

      const element = container.querySelector('wc-visually-hidden') as VisuallyHiddenElement;
      expect(element).toBeDefined();
      expect(element.tagName.toLowerCase()).toBe('wc-visually-hidden');
    });

    it('should apply visually hidden styles', async () => {
      container.innerHTML = `
        <wc-visually-hidden>Hidden content</wc-visually-hidden>
      `;

      await new Promise((resolve) => setTimeout(resolve, 50));

      const element = container.querySelector('wc-visually-hidden') as VisuallyHiddenElement;

      expect(element.style.position).toBe('absolute');
      expect(element.style.width).toBe('1px');
      expect(element.style.height).toBe('1px');
      expect(element.style.overflow).toBe('hidden');
    });

    it('should render slotted content', () => {
      container.innerHTML = `
        <wc-visually-hidden>Screen reader text</wc-visually-hidden>
      `;

      const element = container.querySelector('wc-visually-hidden') as VisuallyHiddenElement;
      expect(element.textContent?.trim()).toBe('Screen reader text');
    });
  });

  describe('Slot', () => {
    it('should render slot element', () => {
      container.innerHTML = `
        <wc-slot>
          <button>Click me</button>
        </wc-slot>
      `;

      const element = container.querySelector('wc-slot') as SlotElement;
      expect(element).toBeDefined();
      expect(element.tagName.toLowerCase()).toBe('wc-slot');
    });

    it('should have asChild property default to false', () => {
      const element = document.createElement('wc-slot') as SlotElement;
      container.appendChild(element);

      expect(element.asChild).toBe(false);
    });

    it('should render slotted child element', async () => {
      container.innerHTML = `
        <wc-slot>
          <button>Click me</button>
        </wc-slot>
      `;

      await new Promise((resolve) => setTimeout(resolve, 50));

      const button = container.querySelector('button');
      expect(button).toBeDefined();
      expect(button?.textContent).toBe('Click me');
    });
  });

  describe('Portal', () => {
    it('should render portal element', () => {
      container.innerHTML = `
        <wc-portal>
          <div>Portaled content</div>
        </wc-portal>
      `;

      const element = container.querySelector('wc-portal') as PortalElement;
      expect(element).toBeDefined();
      expect(element.tagName.toLowerCase()).toBe('wc-portal');
    });

    it('should have disabled property default to false', () => {
      const element = document.createElement('wc-portal') as PortalElement;
      container.appendChild(element);

      expect(element.disabled).toBe(false);
    });

    it('should render content in place when disabled', async () => {
      container.innerHTML = `
        <wc-portal disabled>
          <div>In-place content</div>
        </wc-portal>
      `;

      await new Promise((resolve) => setTimeout(resolve, 50));

      const portal = container.querySelector('wc-portal') as PortalElement;
      const content = portal.querySelector('div');
      expect(content).toBeDefined();
      expect(content?.textContent).toBe('In-place content');
    });

    it('should have container property', () => {
      const element = document.createElement('wc-portal') as PortalElement;
      element.container = '#my-portal';
      container.appendChild(element);

      expect(element.container).toBe('#my-portal');
    });
  });

  describe('AccessibleIcon', () => {
    it('should render accessible icon element', () => {
      container.innerHTML = `
        <wc-accessible-icon label="Close">
          <svg></svg>
        </wc-accessible-icon>
      `;

      const element = container.querySelector('wc-accessible-icon') as AccessibleIconElement;
      expect(element).toBeDefined();
      expect(element.tagName.toLowerCase()).toBe('wc-accessible-icon');
    });

    it('should have label property', () => {
      const element = document.createElement('wc-accessible-icon') as AccessibleIconElement;
      element.label = 'Close';
      container.appendChild(element);

      expect(element.label).toBe('Close');
    });

    it('should render visually hidden label', async () => {
      container.innerHTML = `
        <wc-accessible-icon label="Close">
          <svg></svg>
        </wc-accessible-icon>
      `;

      await new Promise((resolve) => setTimeout(resolve, 50));

      const element = container.querySelector('wc-accessible-icon') as AccessibleIconElement;
      const labelSpan = element.querySelector('span');
      
      expect(labelSpan).toBeDefined();
      expect(labelSpan?.textContent).toBe('Close');
    });

    it('should mark icon as aria-hidden', async () => {
      container.innerHTML = `
        <wc-accessible-icon label="Close">
          <svg></svg>
        </wc-accessible-icon>
      `;

      await new Promise((resolve) => setTimeout(resolve, 100));

      const svg = container.querySelector('svg');
      expect(svg?.getAttribute('aria-hidden')).toBe('true');
      expect(svg?.getAttribute('focusable')).toBe('false');
    });
  });

  describe('DirectionProvider', () => {
    it('should render direction provider element', () => {
      container.innerHTML = `
        <wc-direction-provider>
          <div>Content</div>
        </wc-direction-provider>
      `;

      const element = container.querySelector('wc-direction-provider') as DirectionProviderElement;
      expect(element).toBeDefined();
      expect(element.tagName.toLowerCase()).toBe('wc-direction-provider');
    });

    it('should have dir property default to ltr', () => {
      const element = document.createElement('wc-direction-provider') as DirectionProviderElement;
      container.appendChild(element);

      expect(element.dir).toBe('ltr');
    });

    it('should set dir attribute', async () => {
      container.innerHTML = `
        <wc-direction-provider dir="rtl">
          <div>Content</div>
        </wc-direction-provider>
      `;

      await new Promise((resolve) => setTimeout(resolve, 50));

      const element = container.querySelector('wc-direction-provider') as DirectionProviderElement;
      expect(element.getAttribute('dir')).toBe('rtl');
    });

    it('should return correct direction from getDirection method', async () => {
      container.innerHTML = `
        <wc-direction-provider dir="rtl">
          <div>Content</div>
        </wc-direction-provider>
      `;

      await new Promise((resolve) => setTimeout(resolve, 50));

      const element = container.querySelector('wc-direction-provider') as DirectionProviderElement;
      expect(element.getDirection()).toBe('rtl');
    });

    it('should get direction from nearest provider', async () => {
      container.innerHTML = `
        <wc-direction-provider dir="rtl">
          <div id="child">Content</div>
        </wc-direction-provider>
      `;

      await new Promise((resolve) => setTimeout(resolve, 50));

      const child = container.querySelector('#child') as HTMLElement;
      expect(getDirection(child)).toBe('rtl');
    });

    it('should default to ltr when no provider found', () => {
      container.innerHTML = `
        <div id="child">Content</div>
      `;

      const child = container.querySelector('#child') as HTMLElement;
      expect(getDirection(child)).toBe('ltr');
    });
  });
});
