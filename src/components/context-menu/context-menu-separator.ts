import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Context Menu Separator Component
 * 
 * A visual separator between menu items.
 * 
 * @example
 * ```html
 * <wc-context-menu-separator></wc-context-menu-separator>
 * ```
 */
@customElement('wc-context-menu-separator')
export class ContextMenuSeparatorElement extends PrimitiveElement {
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
    'wc-context-menu-separator': ContextMenuSeparatorElement;
  }
}
