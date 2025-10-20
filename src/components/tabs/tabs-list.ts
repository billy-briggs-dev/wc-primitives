import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Tabs List Component
 * 
 * Contains the triggers for the tabs.
 * 
 * @slot - Default slot for tabs triggers
 * 
 * @example
 * ```html
 * <wc-tabs-list>
 *   <wc-tabs-trigger value="tab1">Tab 1</wc-tabs-trigger>
 *   <wc-tabs-trigger value="tab2">Tab 2</wc-tabs-trigger>
 * </wc-tabs-list>
 * ```
 */
@customElement('wc-tabs-list')
export class TabsListElement extends PrimitiveElement {
  private _tabs: any = null;

  override connectedCallback() {
    super.connectedCallback();
    this._tabs = this.closest('wc-tabs');

    this.setAttribute('role', 'tablist');
    
    if (this._tabs) {
      this.setAttribute('aria-orientation', this._tabs.orientation);
    }

    // Add keyboard navigation
    this.addEventListener('keydown', this._handleKeydown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleKeydown);
  }

  private _handleKeydown = (e: KeyboardEvent) => {
    if (!this._tabs) return;

    const triggers = Array.from(
      this.querySelectorAll('wc-tabs-trigger')
    ) as HTMLElement[];
    const currentIndex = triggers.findIndex(
      (trigger) => trigger === document.activeElement
    );

    if (currentIndex === -1) return;

    let nextIndex = currentIndex;
    const isHorizontal = this._tabs.orientation === 'horizontal';

    if (
      (isHorizontal && e.key === 'ArrowRight') ||
      (!isHorizontal && e.key === 'ArrowDown')
    ) {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % triggers.length;
    } else if (
      (isHorizontal && e.key === 'ArrowLeft') ||
      (!isHorizontal && e.key === 'ArrowUp')
    ) {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = triggers.length - 1;
    }

    if (nextIndex !== currentIndex) {
      triggers[nextIndex].focus();
      triggers[nextIndex].click();
    }
  };

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-tabs-list': TabsListElement;
  }
}
