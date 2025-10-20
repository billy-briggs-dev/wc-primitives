import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { MenubarMenuElement } from './menubar-menu.js';

/**
 * Menubar Trigger Component
 * 
 * The button that toggles the menu open/closed.
 * 
 * @slot - Default slot for trigger content
 * 
 * @example
 * ```html
 * <wc-menubar-trigger>File</wc-menubar-trigger>
 * ```
 */
@customElement('wc-menubar-trigger')
export class MenubarTriggerElement extends PrimitiveElement {
  private _contentId = '';

  override connectedCallback() {
    super.connectedCallback();
    this._contentId = this.generateId('menubar-content');

    this.setAttribute('role', 'menuitem');
    this.setAttribute('aria-haspopup', 'true');
    this.setAttribute('tabindex', '0');

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

  private _handleClick = () => {
    const menu = this.closest('wc-menubar-menu') as MenubarMenuElement | null;
    if (menu && !menu.disabled) {
      menu.toggleMenu();
    }
  };

  private _handleKeydown = (e: KeyboardEvent) => {
    const menu = this.closest('wc-menubar-menu') as MenubarMenuElement | null;
    if (!menu || menu.disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        menu.toggleMenu();
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!menu.open) {
          menu.openMenu();
        }
        // Focus first item
        setTimeout(() => menu.navigateItems('first'), 0);
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!menu.open) {
          menu.openMenu();
        }
        // Focus last item
        setTimeout(() => menu.navigateItems('last'), 0);
        break;
    }
  };

  private _handleMouseEnter = () => {
    // Open menu on hover if another menu in the menubar is already open
    const menubar = this.closest('wc-menubar');
    if (!menubar) return;

    const openMenus = menubar.querySelectorAll('wc-menubar-menu[open]');
    if (openMenus.length > 0) {
      // Close other menus
      openMenus.forEach((m) => {
        if (m !== this.closest('wc-menubar-menu')) {
          (m as MenubarMenuElement).closeMenu();
        }
      });

      // Open this menu
      const menu = this.closest('wc-menubar-menu') as MenubarMenuElement | null;
      if (menu && !menu.disabled) {
        menu.openMenu();
      }
    }
  };

  private _updateState() {
    const menu = this.closest('wc-menubar-menu') as MenubarMenuElement | null;
    if (!menu) return;

    this.setAttribute('data-state', menu.open ? 'open' : 'closed');
    this.setAttribute('aria-expanded', menu.open ? 'true' : 'false');
    this.setAttribute('aria-controls', this._contentId);

    if (menu.disabled) {
      this.setAttribute('data-disabled', '');
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.removeAttribute('data-disabled');
      this.removeAttribute('aria-disabled');
    }

    // Update the content with the ID
    const content = menu.querySelector('wc-menubar-content');
    if (content) {
      content.setAttribute('id', this._contentId);
    }
  }

  override updated() {
    this._updateState();
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-menubar-trigger': MenubarTriggerElement;
  }
}
