import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Dropdown Menu Root Component
 * 
 * Displays a menu to the user—such as a set of actions or functions—triggered by a button.
 * 
 * @fires open-change - Fires when the open state changes
 * 
 * @slot - Default slot for trigger and content
 * 
 * @example
 * ```html
 * <wc-dropdown-menu>
 *   <wc-dropdown-menu-trigger>Open Menu</wc-dropdown-menu-trigger>
 *   <wc-dropdown-menu-content>
 *     <wc-dropdown-menu-item>Item 1</wc-dropdown-menu-item>
 *     <wc-dropdown-menu-item>Item 2</wc-dropdown-menu-item>
 *   </wc-dropdown-menu-content>
 * </wc-dropdown-menu>
 * ```
 */
@customElement('wc-dropdown-menu')
export class DropdownMenuElement extends PrimitiveElement {
  /**
   * The controlled open state of the dropdown menu.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * When true, prevents the user from interacting with the dropdown menu.
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * When true, clicking outside will close the menu.
   */
  @property({ type: Boolean })
  modal = true;

  private _previousFocus: Element | null = null;

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
   * Open the dropdown menu
   */
  openMenu() {
    if (this.disabled) return;
    this.open = true;
  }

  /**
   * Close the dropdown menu
   */
  closeMenu() {
    if (this.disabled) return;
    this.open = false;
  }

  /**
   * Toggle the dropdown menu's open state
   */
  toggleOpen() {
    if (this.disabled) return;
    this.open = !this.open;
  }

  private _handleMenuOpen() {
    // Store the element that triggered the menu for focus return
    if (document.activeElement) {
      this._previousFocus = document.activeElement;
    }

    // Setup outside click handler for modal menus
    if (this.modal) {
      setTimeout(() => {
        document.addEventListener('click', this._handleOutsideClick);
      }, 0);
    }
  }

  private _handleMenuClose() {
    // Return focus to the trigger element
    const previousFocus = this._previousFocus;
    if (previousFocus && typeof (previousFocus as HTMLElement).focus === 'function') {
      (previousFocus as HTMLElement).focus();
    }
    this._previousFocus = null;

    // Remove outside click handler
    document.removeEventListener('click', this._handleOutsideClick);
  }

  private _handleOutsideClick = (e: MouseEvent) => {
    const content = this.querySelector('wc-dropdown-menu-content');
    const trigger = this.querySelector('wc-dropdown-menu-trigger');
    const target = e.target as Node;

    // Check if click is outside content and trigger
    if (
      content &&
      !content.contains(target) &&
      trigger &&
      !trigger.contains(target)
    ) {
      this.closeMenu();
    }
  };

  private _updateChildComponents() {
    // Force child components to update
    const children = this.querySelectorAll(
      'wc-dropdown-menu-trigger, wc-dropdown-menu-content, wc-dropdown-menu-item'
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
    'wc-dropdown-menu': DropdownMenuElement;
  }
}
