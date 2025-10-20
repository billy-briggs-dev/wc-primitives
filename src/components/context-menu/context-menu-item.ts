import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { ContextMenuElement } from './context-menu.js';

/**
 * Context Menu Item Component
 * 
 * A single item in the context menu.
 * 
 * @fires select - Fires when the item is selected
 * 
 * @slot - Default slot for item content
 * 
 * @example
 * ```html
 * <wc-context-menu-item>
 *   Cut
 * </wc-context-menu-item>
 * ```
 */
@customElement('wc-context-menu-item')
export class ContextMenuItemElement extends PrimitiveElement {
  @property({ type: Boolean, reflect: true })
  disabled = false;

  private _menu: ContextMenuElement | null = null;

  override connectedCallback() {
    super.connectedCallback();

    this._menu = this.closest('wc-context-menu');

    this.setAttribute('role', 'menuitem');
    this.setAttribute('tabindex', this.disabled ? '-1' : '0');

    if (this.disabled) {
      this.setAttribute('data-disabled', '');
      this.setAttribute('aria-disabled', 'true');
    }

    this.addEventListener('click', this._handleClick);
    this.addEventListener('keydown', this._handleKeyDown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeyDown);
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('disabled')) {
      this.setAttribute('tabindex', this.disabled ? '-1' : '0');

      if (this.disabled) {
        this.setAttribute('data-disabled', '');
        this.setAttribute('aria-disabled', 'true');
      } else {
        this.removeAttribute('data-disabled');
        this.removeAttribute('aria-disabled');
      }
    }
  }

  private _handleClick = (event: Event) => {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    this.dispatchCustomEvent('select');

    // Close the menu after selection
    if (this._menu) {
      this._menu.closeMenu();
    }
  };

  private _handleKeyDown = (event: KeyboardEvent) => {
    if (this.disabled) {
      return;
    }

    // Activate on Enter or Space
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.dispatchCustomEvent('select');

      // Close the menu after selection
      if (this._menu) {
        this._menu.closeMenu();
      }
    }
  };

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-context-menu-item': ContextMenuItemElement;
  }
}
