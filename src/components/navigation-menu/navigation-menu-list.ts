import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Navigation Menu List Component
 * 
 * Contains navigation menu items.
 * 
 * @slot - Default slot for navigation menu items
 * 
 * @example
 * ```html
 * <wc-navigation-menu>
 *   <wc-navigation-menu-list>
 *     <wc-navigation-menu-item>...</wc-navigation-menu-item>
 *   </wc-navigation-menu-list>
 * </wc-navigation-menu>
 * ```
 */
@customElement('wc-navigation-menu-list')
export class NavigationMenuListElement extends PrimitiveElement {
  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'menubar');
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-navigation-menu-list': NavigationMenuListElement;
  }
}
