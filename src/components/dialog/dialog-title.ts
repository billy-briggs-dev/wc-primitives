import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Dialog Title Component
 * 
 * An accessible title for the dialog.
 * 
 * @slot - Default slot for title content
 * 
 * @example
 * ```html
 * <wc-dialog-title>Dialog Title</wc-dialog-title>
 * ```
 */
@customElement('wc-dialog-title')
export class DialogTitleElement extends PrimitiveElement {
  override connectedCallback() {
    super.connectedCallback();
    // ID is set by the parent dialog-content component
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-dialog-title': DialogTitleElement;
  }
}
