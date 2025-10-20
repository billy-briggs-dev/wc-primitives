import { html, PropertyValues } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { NavigationMenuItemElement } from './navigation-menu-item.js';

/**
 * Navigation Menu Content Component
 * 
 * The content area that appears when a navigation menu item is triggered.
 * Must be used within a wc-navigation-menu-item.
 * 
 * @slot - Default slot for content
 * 
 * @example
 * ```html
 * <wc-navigation-menu-item>
 *   <wc-navigation-menu-trigger>Getting Started</wc-navigation-menu-trigger>
 *   <wc-navigation-menu-content>
 *     <a href="#">Link 1</a>
 *     <a href="#">Link 2</a>
 *   </wc-navigation-menu-content>
 * </wc-navigation-menu-item>
 * ```
 */
@customElement('wc-navigation-menu-content')
export class NavigationMenuContentElement extends PrimitiveElement {
  private _menuItem: NavigationMenuItemElement | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this._menuItem = this.closest('wc-navigation-menu-item') as NavigationMenuItemElement;

    this.setAttribute('role', 'region');
    this._updateState();
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    this._updateState();
  }

  private _updateState() {
    const isOpen = this._menuItem?.isOpen() ?? false;

    this.setAttribute('data-state', isOpen ? 'open' : 'closed');

    if (!isOpen) {
      this.setAttribute('hidden', '');
    } else {
      this.removeAttribute('hidden');
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-navigation-menu-content': NavigationMenuContentElement;
  }
}
