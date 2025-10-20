import { html, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { NavigationMenuElement } from './navigation-menu.js';

/**
 * Navigation Menu Item Component
 * 
 * An individual item in a navigation menu that can contain a trigger and content.
 * 
 * @slot - Default slot for trigger and content
 * 
 * @example
 * ```html
 * <wc-navigation-menu-item value="getting-started">
 *   <wc-navigation-menu-trigger>Getting Started</wc-navigation-menu-trigger>
 *   <wc-navigation-menu-content>...</wc-navigation-menu-content>
 * </wc-navigation-menu-item>
 * ```
 */
@customElement('wc-navigation-menu-item')
export class NavigationMenuItemElement extends PrimitiveElement {
  /**
   * The value of this navigation menu item.
   */
  @property({ type: String })
  value = '';

  /**
   * When true, prevents the user from interacting with the item.
   */
  @property({ type: Boolean })
  disabled = false;

  @state()
  private _isOpen = false;

  private _navigationMenu: NavigationMenuElement | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this._navigationMenu = this.closest('wc-navigation-menu') as NavigationMenuElement;
    this._updateState();
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('disabled') || changedProperties.has('value')) {
      this._updateState();
    }

    // Check if parent changed the active item
    this._updateState();
  }

  /**
   * Check if this item is open
   */
  isOpen(): boolean {
    return this._isOpen;
  }

  /**
   * Toggle this item's open state
   */
  toggle() {
    if (this.disabled || !this._navigationMenu || this._navigationMenu.disabled) return;
    
    if (this._isOpen) {
      this._navigationMenu.closeActiveItem();
    } else {
      this._navigationMenu.setActiveItem(this.value);
    }
  }

  private _updateState() {
    this._isOpen = this._navigationMenu?.isItemActive(this.value) ?? false;

    this.setAttribute('data-state', this._isOpen ? 'open' : 'closed');

    if (this.disabled) {
      this.setAttribute('data-disabled', '');
    } else {
      this.removeAttribute('data-disabled');
    }

    // Update child components
    this._updateChildComponents();
  }

  private _updateChildComponents() {
    const triggers = this.querySelectorAll('wc-navigation-menu-trigger');
    const contents = this.querySelectorAll('wc-navigation-menu-content');

    triggers.forEach((trigger) => {
      if ('requestUpdate' in trigger && typeof trigger.requestUpdate === 'function') {
        trigger.requestUpdate();
      }
    });

    contents.forEach((content) => {
      if ('requestUpdate' in content && typeof content.requestUpdate === 'function') {
        content.requestUpdate();
      }
    });
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-navigation-menu-item': NavigationMenuItemElement;
  }
}
