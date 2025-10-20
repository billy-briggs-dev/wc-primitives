import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { DropdownMenuElement } from './dropdown-menu.js';

/**
 * Dropdown Menu Content Component
 * 
 * The component that contains the menu items.
 * 
 * @slot - Default slot for menu items
 * 
 * @example
 * ```html
 * <wc-dropdown-menu-content>
 *   <wc-dropdown-menu-item>Item 1</wc-dropdown-menu-item>
 *   <wc-dropdown-menu-item>Item 2</wc-dropdown-menu-item>
 * </wc-dropdown-menu-content>
 * ```
 */
@customElement('wc-dropdown-menu-content')
export class DropdownMenuContentElement extends PrimitiveElement {
  @property({ type: String })
  ariaLabel = 'Menu';

  @property({ type: String })
  side: 'top' | 'right' | 'bottom' | 'left' = 'bottom';

  @property({ type: String })
  align: 'start' | 'center' | 'end' = 'start';

  private _menu: DropdownMenuElement | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this._menu = this.closest('wc-dropdown-menu');

    this.setAttribute('role', 'menu');
    this.setAttribute('tabindex', '-1');

    // Add keyboard handler
    this.addEventListener('keydown', this._handleKeydown);
    this.addEventListener('click', this._handleClick);

    this._updateAttributes();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleKeydown);
    this.removeEventListener('click', this._handleClick);
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (
      changedProperties.has('ariaLabel') ||
      changedProperties.has('side') ||
      changedProperties.has('align')
    ) {
      this._updateAttributes();
    }
  }

  private _handleClick = (e: MouseEvent) => {
    // Stop propagation to prevent triggering outside click handler
    e.stopPropagation();
  };

  private _handleKeydown = (e: KeyboardEvent) => {
    // Escape closes the menu
    if (e.key === 'Escape' && this._menu) {
      e.preventDefault();
      this._menu.closeMenu();
      return;
    }

    // Arrow navigation
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      this._handleArrowNavigation(e.key === 'ArrowDown');
    }
  };

  private _handleArrowNavigation(isDown: boolean) {
    const items = Array.from(
      this.querySelectorAll('wc-dropdown-menu-item:not([data-disabled])')
    ) as HTMLElement[];

    if (items.length === 0) return;

    const currentIndex = items.findIndex((item) => item === document.activeElement);

    let nextIndex: number;
    if (currentIndex === -1) {
      // No item focused, focus first or last
      nextIndex = isDown ? 0 : items.length - 1;
    } else {
      // Navigate to next/previous
      nextIndex = isDown
        ? (currentIndex + 1) % items.length
        : (currentIndex - 1 + items.length) % items.length;
    }

    items[nextIndex]?.focus();
  }

  private _updateAttributes() {
    if (this.ariaLabel) {
      this.setAttribute('aria-label', this.ariaLabel);
    }

    this.setAttribute('data-side', this.side);
    this.setAttribute('data-align', this.align);

    if (this._menu) {
      this.setAttribute('data-state', this._menu.open ? 'open' : 'closed');

      // Hide content if menu is not open
      if (this._menu.open) {
        this.style.display = '';
      } else {
        this.style.display = 'none';
      }
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-dropdown-menu-content': DropdownMenuContentElement;
  }
}
