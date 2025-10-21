import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Select Viewport Component
 * 
 * The scrollable viewport containing select items.
 * 
 * @slot - Default slot for select items
 * 
 * @example
 * ```html
 * <wc-select-viewport>
 *   <wc-select-item value="1">Option 1</wc-select-item>
 *   <wc-select-item value="2">Option 2</wc-select-item>
 * </wc-select-viewport>
 * ```
 */
@customElement('wc-select-viewport')
export class SelectViewportElement extends PrimitiveElement {
  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('data-select-viewport', '');
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-select-viewport': SelectViewportElement;
  }
}
