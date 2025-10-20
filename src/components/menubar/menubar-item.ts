import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { MenubarMenuElement } from './menubar-menu.js';

/**
 * Menubar Item Component
 * 
 * An individual item in the menu dropdown.
 * 
 * @fires select - Fires when the item is selected
 * 
 * @slot - Default slot for item content
 * 
 * @example
 * ```html
 * <wc-menubar-item>New File</wc-menubar-item>
 * ```
 */
@customElement('wc-menubar-item')
export class MenubarItemElement extends PrimitiveElement {
  /**
   * When true, prevents the user from interacting with the item.
   */
  @property({ type: Boolean })
  disabled = false;

  override connectedCallback() {
    super.connectedCallback();

    this.setAttribute('role', 'menuitem');
    this.setAttribute('tabindex', '-1');

    // Add event listeners
    this.addEventListener('click', this._handleClick);
    this.addEventListener('keydown', this._handleKeydown);

    this._updateState();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeydown);
  }

  override updated() {
    this._updateState();
  }

  private _handleClick = () => {
    if (this.disabled) return;

    this.dispatchCustomEvent('select', { value: this.textContent?.trim() || '' });

    // Close the menu
    const menu = this.closest('wc-menubar-menu') as MenubarMenuElement | null;
    if (menu) {
      menu.closeMenu();
      
      // Return focus to trigger
      const trigger = menu.querySelector('wc-menubar-trigger') as HTMLElement;
      if (trigger) {
        trigger.focus();
      }
    }
  };

  private _handleKeydown = (e: KeyboardEvent) => {
    if (this.disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.click();
    }
  };

  private _updateState() {
    if (this.disabled) {
      this.setAttribute('data-disabled', '');
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.removeAttribute('data-disabled');
      this.removeAttribute('aria-disabled');
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-menubar-item': MenubarItemElement;
  }
}
