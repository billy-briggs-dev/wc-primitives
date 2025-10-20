import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { MenubarMenuElement } from './menubar-menu.js';

/**
 * Menubar Content Component
 * 
 * The dropdown menu content that contains menu items.
 * 
 * @slot - Default slot for menu items
 * 
 * @example
 * ```html
 * <wc-menubar-content>
 *   <wc-menubar-item>New</wc-menubar-item>
 *   <wc-menubar-item>Open</wc-menubar-item>
 * </wc-menubar-content>
 * ```
 */
@customElement('wc-menubar-content')
export class MenubarContentElement extends PrimitiveElement {
  override connectedCallback() {
    super.connectedCallback();

    this.setAttribute('role', 'menu');
    this.setAttribute('tabindex', '-1');

    // Add event listeners
    this.addEventListener('keydown', this._handleKeydown);

    // Close menu when clicking outside
    document.addEventListener('click', this._handleOutsideClick);

    this._updateAttributes();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleKeydown);
    document.removeEventListener('click', this._handleOutsideClick);
  }

  private _handleKeydown = (e: KeyboardEvent) => {
    const menu = this.closest('wc-menubar-menu') as MenubarMenuElement | null;
    if (!menu || menu.disabled) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        menu.navigateItems('next');
        break;
      case 'ArrowUp':
        e.preventDefault();
        menu.navigateItems('prev');
        break;
      case 'Home':
        e.preventDefault();
        menu.navigateItems('first');
        break;
      case 'End':
        e.preventDefault();
        menu.navigateItems('last');
        break;
      case 'Escape':
        e.preventDefault();
        menu.closeMenu();
        // Return focus to trigger
        const trigger = menu.querySelector('wc-menubar-trigger') as HTMLElement;
        if (trigger) {
          trigger.focus();
        }
        break;
      case 'Tab':
        e.preventDefault();
        menu.closeMenu();
        break;
    }
  };

  private _handleOutsideClick = (e: Event) => {
    const menu = this.closest('wc-menubar-menu') as MenubarMenuElement | null;
    if (!menu) return;

    const target = e.target as Node;
    if (!menu.contains(target)) {
      menu.closeMenu();
    }
  };

  private _updateAttributes() {
    const menu = this.closest('wc-menubar-menu') as MenubarMenuElement | null;
    if (menu) {
      this.setAttribute('data-state', menu.open ? 'open' : 'closed');
      
      // Hide content when menu is closed
      if (!menu.open) {
        this.style.display = 'none';
        this.style.pointerEvents = 'none';
      } else {
        this.style.display = '';
        this.style.pointerEvents = 'auto';
      }
    }
  }

  override updated() {
    this._updateAttributes();
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-menubar-content': MenubarContentElement;
  }
}
