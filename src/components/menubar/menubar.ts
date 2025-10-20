import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Menubar Root Component
 * 
 * A visually persistent menu common in desktop applications that provides quick access to a set of dropdown menus.
 * 
 * @slot - Default slot for menubar menus
 * 
 * @example
 * ```html
 * <wc-menubar>
 *   <wc-menubar-menu>
 *     <wc-menubar-trigger>File</wc-menubar-trigger>
 *     <wc-menubar-content>
 *       <wc-menubar-item>New</wc-menubar-item>
 *       <wc-menubar-item>Open</wc-menubar-item>
 *     </wc-menubar-content>
 *   </wc-menubar-menu>
 * </wc-menubar>
 * ```
 */
@customElement('wc-menubar')
export class MenubarElement extends PrimitiveElement {
  /**
   * When true, prevents the user from interacting with the menubar.
   */
  @property({ type: Boolean })
  disabled = false;

  override connectedCallback() {
    super.connectedCallback();
    
    this.setAttribute('role', 'menubar');
    this.setAttribute('data-orientation', 'horizontal');

    // Add keyboard navigation
    this.addEventListener('keydown', this._handleKeydown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleKeydown);
  }

  override updated() {
    if (this.disabled) {
      this.setAttribute('data-disabled', '');
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.removeAttribute('data-disabled');
      this.removeAttribute('aria-disabled');
    }
  }

  private _getMenuTriggers(): HTMLElement[] {
    return Array.from(this.querySelectorAll('wc-menubar-trigger')).filter(
      (el) => !el.hasAttribute('disabled') && !el.hasAttribute('data-disabled')
    ) as HTMLElement[];
  }

  private _handleKeydown = (e: KeyboardEvent) => {
    if (this.disabled) return;

    const triggers = this._getMenuTriggers();
    if (triggers.length === 0) return;

    const currentTrigger = e.target as HTMLElement;
    const currentIndex = triggers.indexOf(currentTrigger);
    
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;
    let handled = false;

    switch (e.key) {
      case 'ArrowRight':
        nextIndex = (currentIndex + 1) % triggers.length;
        handled = true;
        break;
      case 'ArrowLeft':
        nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
        handled = true;
        break;
      case 'Home':
        nextIndex = 0;
        handled = true;
        break;
      case 'End':
        nextIndex = triggers.length - 1;
        handled = true;
        break;
    }

    if (handled) {
      e.preventDefault();
      triggers[nextIndex].focus();
    }
  };

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-menubar': MenubarElement;
  }
}
