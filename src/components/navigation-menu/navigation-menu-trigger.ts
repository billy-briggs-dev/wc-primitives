import { html, PropertyValues } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { NavigationMenuItemElement } from './navigation-menu-item.js';

/**
 * Navigation Menu Trigger Component
 * 
 * A button that triggers the navigation menu content.
 * Must be used within a wc-navigation-menu-item.
 * 
 * @slot - Default slot for trigger content
 * 
 * @example
 * ```html
 * <wc-navigation-menu-item>
 *   <wc-navigation-menu-trigger>Getting Started</wc-navigation-menu-trigger>
 *   <wc-navigation-menu-content>...</wc-navigation-menu-content>
 * </wc-navigation-menu-item>
 * ```
 */
@customElement('wc-navigation-menu-trigger')
export class NavigationMenuTriggerElement extends PrimitiveElement {
  private _menuItem: NavigationMenuItemElement | null = null;
  private _contentId = '';

  override connectedCallback() {
    super.connectedCallback();
    this._menuItem = this.closest('wc-navigation-menu-item') as NavigationMenuItemElement;
    this._contentId = this.generateId('navigation-menu-content');

    this.setAttribute('role', 'button');
    this.setAttribute('type', 'button');

    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }

    // Add event listeners
    this.addEventListener('click', this._handleClick);
    this.addEventListener('keydown', this._handleKeydown);
    this.addEventListener('mouseenter', this._handleMouseEnter);

    this._updateState();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeydown);
    this.removeEventListener('mouseenter', this._handleMouseEnter);
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    this._updateState();
  }

  private _handleClick = () => {
    this._menuItem?.toggle();
  };

  private _handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._menuItem?.toggle();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this._menuItem?.toggle();
    }
  };

  private _handleMouseEnter = () => {
    // Open on hover (common navigation menu behavior)
    if (!this._menuItem?.isOpen()) {
      this._menuItem?.toggle();
    }
  };

  private _updateState() {
    const isOpen = this._menuItem?.isOpen() ?? false;
    const isDisabled = this._menuItem?.disabled ?? false;

    this.setAttribute('data-state', isOpen ? 'open' : 'closed');
    this.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    this.setAttribute('aria-controls', this._contentId);

    if (isDisabled) {
      this.setAttribute('data-disabled', '');
      this.setAttribute('aria-disabled', 'true');
      this.setAttribute('tabindex', '-1');
    } else {
      this.removeAttribute('data-disabled');
      this.removeAttribute('aria-disabled');
      this.setAttribute('tabindex', '0');
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-navigation-menu-trigger': NavigationMenuTriggerElement;
  }
}
