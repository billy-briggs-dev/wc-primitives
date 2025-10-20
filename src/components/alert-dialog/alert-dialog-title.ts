import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Alert Dialog Title Component
 * 
 * The title of the alert dialog. This is used for accessibility purposes
 * and is linked to the content via aria-labelledby.
 * 
 * @slot - Default slot for title text
 * 
 * @example
 * ```html
 * <wc-alert-dialog-title>Are you sure?</wc-alert-dialog-title>
 * ```
 */
@customElement('wc-alert-dialog-title')
export class AlertDialogTitleElement extends PrimitiveElement {
  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-alert-dialog-title': AlertDialogTitleElement;
  }
}
