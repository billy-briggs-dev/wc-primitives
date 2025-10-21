import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Select Group Component
 * 
 * Groups related select items together with an optional label.
 * 
 * @slot - Default slot for select items
 * 
 * @example
 * ```html
 * <wc-select-group>
 *   <wc-select-label>Fruits</wc-select-label>
 *   <wc-select-item value="apple">Apple</wc-select-item>
 *   <wc-select-item value="banana">Banana</wc-select-item>
 * </wc-select-group>
 * ```
 */
@customElement('wc-select-group')
export class SelectGroupElement extends PrimitiveElement {
  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'group');
    this.setAttribute('data-select-group', '');
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-select-group': SelectGroupElement;
  }
}
