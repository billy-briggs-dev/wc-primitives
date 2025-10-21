import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Select Label Component
 * 
 * A label for a group of select items.
 * 
 * @slot - Default slot for label text
 * 
 * @example
 * ```html
 * <wc-select-label>Fruits</wc-select-label>
 * ```
 */
@customElement('wc-select-label')
export class SelectLabelElement extends PrimitiveElement {
  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('data-select-label', '');
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-select-label': SelectLabelElement;
  }
}
