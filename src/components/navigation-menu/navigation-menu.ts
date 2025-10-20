import { html, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Navigation Menu Component
 * 
 * A collection of links for navigating websites.
 * 
 * @fires value-change - Fires when the active item changes
 * 
 * @slot - Default slot for navigation menu list
 * 
 * @example
 * ```html
 * <wc-navigation-menu>
 *   <wc-navigation-menu-list>
 *     <wc-navigation-menu-item value="getting-started">
 *       <wc-navigation-menu-trigger>Getting Started</wc-navigation-menu-trigger>
 *       <wc-navigation-menu-content>...</wc-navigation-menu-content>
 *     </wc-navigation-menu-item>
 *   </wc-navigation-menu-list>
 * </wc-navigation-menu>
 * ```
 */
@customElement('wc-navigation-menu')
export class NavigationMenuElement extends PrimitiveElement {
  /**
   * The controlled active item value.
   */
  @property({ type: String })
  value = '';

  /**
   * When true, prevents the user from interacting with the navigation menu.
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * The orientation of the navigation menu.
   */
  @property({ type: String })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  @state()
  private _activeItem = '';

  override connectedCallback() {
    super.connectedCallback();
    this._activeItem = this.value;
    this.setAttribute('data-orientation', this.orientation);
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('value')) {
      this._activeItem = this.value;
      this._updateChildComponents();
    }

    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('data-disabled', '');
      } else {
        this.removeAttribute('data-disabled');
      }
    }

    if (changedProperties.has('orientation')) {
      this.setAttribute('data-orientation', this.orientation);
    }
  }

  /**
   * Set the active item
   */
  setActiveItem(itemValue: string) {
    if (this.disabled) return;
    this._activeItem = itemValue;
    this.value = itemValue;
    this.requestUpdate();
    this._notifyChange();
    this._updateChildComponents();
  }

  /**
   * Check if an item is active
   */
  isItemActive(itemValue: string): boolean {
    return this._activeItem === itemValue;
  }

  /**
   * Close the active item
   */
  closeActiveItem() {
    this._activeItem = '';
    this.value = '';
    this.requestUpdate();
    this._notifyChange();
    this._updateChildComponents();
  }

  private _updateChildComponents() {
    const items = this.querySelectorAll('wc-navigation-menu-item');
    items.forEach((item) => {
      if ('requestUpdate' in item && typeof item.requestUpdate === 'function') {
        item.requestUpdate();
      }
    });
  }

  private _notifyChange() {
    this.dispatchCustomEvent('value-change', { value: this.value });
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-navigation-menu': NavigationMenuElement;
  }
}
