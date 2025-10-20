import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { DialogElement } from './dialog.js';

/**
 * Dialog Overlay Component
 * 
 * A layer that covers the inert portion of the view when the dialog is open.
 * 
 * @example
 * ```html
 * <wc-dialog-overlay />
 * ```
 */
@customElement('wc-dialog-overlay')
export class DialogOverlayElement extends PrimitiveElement {
  private _dialog: DialogElement | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this._dialog = this.closest('wc-dialog');

    this.setAttribute('role', 'presentation');
    this.setAttribute('data-state', this._dialog?.open ? 'open' : 'closed');

    // Add click handler if modal
    if (this._dialog?.modal) {
      this.addEventListener('click', this._handleClick);
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
  }

  private _handleClick = () => {
    if (this._dialog && this._dialog.modal && this._dialog.open) {
      this._dialog.closeDialog();
    }
  };

  override updated() {
    if (this._dialog) {
      this.setAttribute('data-state', this._dialog.open ? 'open' : 'closed');
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-dialog-overlay': DialogOverlayElement;
  }
}
