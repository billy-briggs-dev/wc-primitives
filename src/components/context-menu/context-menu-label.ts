import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Context Menu Label Component
 * 
 * A label for a group of menu items.
 * 
 * @slot - Default slot for label content
 * 
 * @example
 * ```html
 * <wc-context-menu-label>Actions</wc-context-menu-label>
 * ```
 */
@customElement('wc-context-menu-label')
export class ContextMenuLabelElement extends PrimitiveElement {
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
    'wc-context-menu-label': ContextMenuLabelElement;
  }
}
