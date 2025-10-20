import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Alert Dialog Description Component
 * 
 * The description of the alert dialog. This is used for accessibility purposes
 * and is linked to the content via aria-describedby.
 * 
 * @slot - Default slot for description text
 * 
 * @example
 * ```html
 * <wc-alert-dialog-description>
 *   This action cannot be undone.
 * </wc-alert-dialog-description>
 * ```
 */
@customElement('wc-alert-dialog-description')
export class AlertDialogDescriptionElement extends PrimitiveElement {
  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-alert-dialog-description': AlertDialogDescriptionElement;
  }
}
