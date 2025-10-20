import { html, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Context Menu Root Component
 * 
 * Displays a menu to the user at the location of the right-click or long-press.
 * 
 * @fires open-change - Fires when the open state changes
 * 
 * @slot - Default slot for trigger and content
 * 
 * @example
 * ```html
 * <wc-context-menu>
 *   <wc-context-menu-trigger>
 *     <div>Right-click me</div>
 *   </wc-context-menu-trigger>
 *   <wc-context-menu-content>
 *     <wc-context-menu-item>Cut</wc-context-menu-item>
 *     <wc-context-menu-item>Copy</wc-context-menu-item>
 *     <wc-context-menu-item>Paste</wc-context-menu-item>
 *   </wc-context-menu-content>
 * </wc-context-menu>
 * ```
 */
@customElement('wc-context-menu')
export class ContextMenuElement extends PrimitiveElement {
  /**
   * The controlled open state of the context menu.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * When true, prevents the user from interacting with the context menu.
   */
  @property({ type: Boolean })
  disabled = false;

  @state()
  private _x = 0;

  @state()
  private _y = 0;

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'group');
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('open')) {
      this.setAttribute('data-state', this.open ? 'open' : 'closed');
      this._notifyChange();
      this._updateChildComponents();

      if (this.open) {
        this._handleMenuOpen();
      } else {
        this._handleMenuClose();
      }
    }

    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('data-disabled', '');
      } else {
        this.removeAttribute('data-disabled');
      }
    }
  }

  /**
   * Open the context menu at specific coordinates
   */
  openMenuAt(x: number, y: number) {
    if (this.disabled) return;
    this._x = x;
    this._y = y;
    this.open = true;
  }

  /**
   * Close the context menu
   */
  closeMenu() {
    if (this.disabled) return;
    this.open = false;
  }

  /**
   * Get the current menu position
   */
  getPosition(): { x: number; y: number } {
    return { x: this._x, y: this._y };
  }

  private _handleMenuOpen() {
    // Setup outside click handler
    setTimeout(() => {
      document.addEventListener('click', this._handleOutsideClick);
    }, 0);
  }

  private _handleMenuClose() {
    // Remove outside click handler
    document.removeEventListener('click', this._handleOutsideClick);
  }

  private _handleOutsideClick = (e: MouseEvent) => {
    const content = this.querySelector('wc-context-menu-content');
    const target = e.target as Node;

    // Check if click is outside content
    if (content && !content.contains(target)) {
      this.closeMenu();
    }
  };

  private _updateChildComponents() {
    // Force child components to update
    const children = this.querySelectorAll(
      'wc-context-menu-trigger, wc-context-menu-content, wc-context-menu-item'
    );
    children.forEach((child) => {
      if ('requestUpdate' in child && typeof child.requestUpdate === 'function') {
        child.requestUpdate();
      }
    });
  }

  private _notifyChange() {
    this.dispatchCustomEvent('open-change', { open: this.open });
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleOutsideClick);
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-context-menu': ContextMenuElement;
  }
}
