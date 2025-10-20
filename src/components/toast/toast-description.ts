import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Toast Description Component
 * 
 * The description of the toast notification.
 * 
 * @slot - Default slot for description content
 * 
 * @example
 * ```html
 * <wc-toast-description>Your changes have been saved.</wc-toast-description>
 * ```
 */
@customElement('wc-toast-description')
export class ToastDescriptionElement extends PrimitiveElement {
  private _descriptionId = '';

  override connectedCallback() {
    super.connectedCallback();
    this._descriptionId = this.generateId('toast-description');
    this.setAttribute('id', this._descriptionId);
    this.setAttribute('data-toast-description', '');

    // Notify parent toast about this description
    this._notifyParent();
  }

  private _notifyParent() {
    const toast = this.closest('wc-toast');
    if (toast) {
      toast.setAttribute('aria-describedby', this._descriptionId);
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-toast-description': ToastDescriptionElement;
  }
}
