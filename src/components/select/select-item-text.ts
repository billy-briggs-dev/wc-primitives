import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Select Item Text Component
 * 
 * The textual content of a select item.
 * 
 * @slot - Default slot for text content
 * 
 * @example
 * ```html
 * <wc-select-item-text>Apple</wc-select-item-text>
 * ```
 */
@customElement('wc-select-item-text')
export class SelectItemTextElement extends PrimitiveElement {
  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-select-item-text': SelectItemTextElement;
  }
}
