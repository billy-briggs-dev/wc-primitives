import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Dialog Description Component
 * 
 * An accessible description for the dialog.
 * 
 * @slot - Default slot for description content
 * 
 * @example
 * ```html
 * <wc-dialog-description>This is the dialog description</wc-dialog-description>
 * ```
 */
@customElement('wc-dialog-description')
export class DialogDescriptionElement extends PrimitiveElement {
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
    'wc-dialog-description': DialogDescriptionElement;
  }
}
