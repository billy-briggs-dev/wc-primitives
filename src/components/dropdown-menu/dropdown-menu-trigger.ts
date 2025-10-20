import { html, PropertyValues } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { DropdownMenuElement } from './dropdown-menu.js';

/**
 * Dropdown Menu Trigger Component
 * 
 * The button that toggles the dropdown menu.
 * 
 * @slot - Default slot for trigger content
 * 
 * @example
 * ```html
 * <wc-dropdown-menu-trigger>
 *   Open Menu
 * </wc-dropdown-menu-trigger>
 * ```
 */
@customElement('wc-dropdown-menu-trigger')
export class DropdownMenuTriggerElement extends PrimitiveElement {
  private _menu: DropdownMenuElement | null = null;
  private _triggerId = '';

  override connectedCallback() {
    super.connectedCallback();

    this._menu = this.closest('wc-dropdown-menu');
    this._triggerId = this.generateId('dropdown-menu-trigger');

    // Set ARIA attributes
    this.setAttribute('role', 'button');
    this.setAttribute('type', 'button');
    this.setAttribute('id', this._triggerId);
    this.setAttribute('aria-haspopup', 'menu');
    this.setAttribute('aria-expanded', this._menu?.open ? 'true' : 'false');
    this.setAttribute('data-state', this._menu?.open ? 'open' : 'closed');

    const disabled = this._menu?.disabled;
    if (disabled) {
      this.setAttribute('data-disabled', '');
      this.setAttribute('disabled', '');
    } else {
      this.setAttribute('tabindex', '0');
    }

    this.addEventListener('click', this._handleClick);
    this.addEventListener('keydown', this._handleKeyDown);

    // Listen for open changes
    this._menu?.addEventListener('open-change', this._handleOpenChange);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeyDown);
    this._menu?.removeEventListener('open-change', this._handleOpenChange);
  }

  private _handleOpenChange = () => {
    this.requestUpdate();
  };

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    // Update ARIA and data attributes based on state
    const isOpen = this._menu?.open ?? false;
    this.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    this.setAttribute('data-state', isOpen ? 'open' : 'closed');

    const disabled = this._menu?.disabled;
    if (disabled) {
      this.setAttribute('data-disabled', '');
      this.setAttribute('disabled', '');
      this.removeAttribute('tabindex');
    } else {
      this.removeAttribute('data-disabled');
      this.removeAttribute('disabled');
      this.setAttribute('tabindex', '0');
    }
  }

  private _handleClick = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    if (this._menu?.disabled) {
      return;
    }

    this._menu?.toggleOpen();
  };

  private _handleKeyDown = (event: KeyboardEvent) => {
    if (this._menu?.disabled) {
      return;
    }

    // Open menu on Space, Enter, or ArrowDown
    if (event.key === ' ' || event.key === 'Enter' || event.key === 'ArrowDown') {
      event.preventDefault();
      if (!this._menu?.open) {
        this._menu?.openMenu();
        // Focus first menu item after opening
        setTimeout(() => {
          const firstItem = this._menu?.querySelector('wc-dropdown-menu-item');
          if (firstItem && 'focus' in firstItem) {
            (firstItem as HTMLElement).focus();
          }
        }, 0);
      }
    }

    // Open menu on ArrowUp and focus last item
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!this._menu?.open) {
        this._menu?.openMenu();
        setTimeout(() => {
          const items = this._menu?.querySelectorAll('wc-dropdown-menu-item');
          if (items && items.length > 0) {
            const lastItem = items[items.length - 1];
            if ('focus' in lastItem) {
              (lastItem as HTMLElement).focus();
            }
          }
        }, 0);
      }
    }
  };

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-dropdown-menu-trigger': DropdownMenuTriggerElement;
  }
}
