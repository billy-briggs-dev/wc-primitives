import { html, PropertyValues } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { AlertDialogElement } from './alert-dialog.js';

/**
 * Alert Dialog Overlay Component
 * 
 * A backdrop layer that covers the page when the alert dialog is open.
 * Unlike regular dialogs, clicking the overlay does NOT close the alert dialog
 * as alert dialogs require explicit user action.
 * 
 * @slot - Default slot (typically not used)
 * 
 * @example
 * ```html
 * <wc-alert-dialog-overlay />
 * ```
 */
@customElement('wc-alert-dialog-overlay')
export class AlertDialogOverlayElement extends PrimitiveElement {
  private _dialog: AlertDialogElement | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this._dialog = this.closest('wc-alert-dialog');
    this._updateState();
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    this._updateState();
  }

  private _updateState() {
    if (!this._dialog) return;

    this.setAttribute('data-state', this._dialog.open ? 'open' : 'closed');
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-alert-dialog-overlay': AlertDialogOverlayElement;
  }
}
