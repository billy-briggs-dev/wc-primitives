import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Dropdown Menu Label Component
 * 
 * A label for a group of menu items.
 * 
 * @slot - Default slot for label content
 * 
 * @example
 * ```html
 * <wc-dropdown-menu-label>Actions</wc-dropdown-menu-label>
 * ```
 */
@customElement('wc-dropdown-menu-label')
export class DropdownMenuLabelElement extends PrimitiveElement {
  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'presentation');
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-dropdown-menu-label': DropdownMenuLabelElement;
  }
}
