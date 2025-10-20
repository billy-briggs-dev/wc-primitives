import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Menubar Separator Component
 * 
 * A visual separator between menu items.
 * 
 * @example
 * ```html
 * <wc-menubar-separator></wc-menubar-separator>
 * ```
 */
@customElement('wc-menubar-separator')
export class MenubarSeparatorElement extends PrimitiveElement {
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
    'wc-menubar-separator': MenubarSeparatorElement;
  }
}
