import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Dropdown Menu Separator Component
 * 
 * A visual separator between menu items.
 * 
 * @example
 * ```html
 * <wc-dropdown-menu-separator></wc-dropdown-menu-separator>
 * ```
 */
@customElement('wc-dropdown-menu-separator')
export class DropdownMenuSeparatorElement extends PrimitiveElement {
  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'separator');
    this.setAttribute('aria-orientation', 'horizontal');
  }

  override render() {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-dropdown-menu-separator': DropdownMenuSeparatorElement;
  }
}
