import { html, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Menubar Menu Component
 * 
 * A single menu in the menubar containing a trigger and dropdown content.
 * 
 * @fires open-change - Fires when the open state changes
 * 
 * @slot - Default slot for trigger and content
 * 
 * @example
 * ```html
 * <wc-menubar-menu>
 *   <wc-menubar-trigger>File</wc-menubar-trigger>
 *   <wc-menubar-content>
 *     <wc-menubar-item>New</wc-menubar-item>
 *   </wc-menubar-content>
 * </wc-menubar-menu>
 * ```
 */
@customElement('wc-menubar-menu')
export class MenubarMenuElement extends PrimitiveElement {
  /**
   * The controlled open state of the menu.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * When true, prevents the user from interacting with the menu.
   */
  @property({ type: Boolean })
  disabled = false;

  @state()
  private _activeItemIndex = -1;

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'none');
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('open')) {
      this.setAttribute('data-state', this.open ? 'open' : 'closed');
      this._notifyChange();
      this._updateChildComponents();
      
      if (this.open) {
        this._activeItemIndex = -1;
      }
    }

    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('data-disabled', '');
        this.closeMenu();
      } else {
        this.removeAttribute('data-disabled');
      }
    }
  }

  /**
   * Open the menu
   */
  openMenu() {
    if (this.disabled) return;
    this.open = true;
  }

  /**
   * Close the menu
   */
  closeMenu() {
    if (this.disabled) return;
    this.open = false;
  }

  /**
   * Toggle the menu open state
   */
  toggleMenu() {
    if (this.open) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  /**
   * Get menu items
   */
  getMenuItems(): HTMLElement[] {
    const content = this.querySelector('wc-menubar-content');
    if (!content) return [];
    
    return Array.from(content.querySelectorAll('wc-menubar-item')).filter(
      (el) => !el.hasAttribute('disabled') && !el.hasAttribute('data-disabled')
    ) as HTMLElement[];
  }

  /**
   * Navigate to next/previous item
   */
  navigateItems(direction: 'next' | 'prev' | 'first' | 'last') {
    const items = this.getMenuItems();
    if (items.length === 0) return;

    let nextIndex: number;

    switch (direction) {
      case 'next':
        nextIndex = (this._activeItemIndex + 1) % items.length;
        break;
      case 'prev':
        nextIndex = (this._activeItemIndex - 1 + items.length) % items.length;
        break;
      case 'first':
        nextIndex = 0;
        break;
      case 'last':
        nextIndex = items.length - 1;
        break;
    }

    this._activeItemIndex = nextIndex;
    items[nextIndex].focus();
  }

  private _updateChildComponents() {
    // Force child components to update
    const children = this.querySelectorAll(
      'wc-menubar-trigger, wc-menubar-content, wc-menubar-item'
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

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-menubar-menu': MenubarMenuElement;
  }
}
