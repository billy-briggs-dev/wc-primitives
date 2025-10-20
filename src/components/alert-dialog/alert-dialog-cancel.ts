import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { AlertDialogElement } from './alert-dialog.js';

/**
 * Alert Dialog Cancel Component
 * 
 * A button that cancels the action and closes the alert dialog.
 * This is the safe exit option for users who don't want to proceed.
 * 
 * @slot - Default slot for button content
 * 
 * @example
 * ```html
 * <wc-alert-dialog-cancel>Cancel</wc-alert-dialog-cancel>
 * ```
 */
@customElement('wc-alert-dialog-cancel')
export class AlertDialogCancelElement extends PrimitiveElement {
  private _dialog: AlertDialogElement | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this._dialog = this.closest('wc-alert-dialog');

    this.setAttribute('role', 'button');
    this.setAttribute('tabindex', '0');
    this.setAttribute('type', 'button');

    // Add click handler
    this.addEventListener('click', this._handleClick);
    this.addEventListener('keydown', this._handleKeydown);

    this._updateState();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeydown);
  }

  private _handleClick = () => {
    if (this._dialog && !this._dialog.disabled) {
      this._dialog.closeDialog();
    }
  };

  private _handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (this._dialog && !this._dialog.disabled) {
        this._dialog.closeDialog();
      }
    }
  };

  private _updateState() {
    if (!this._dialog) return;

    this.setAttribute('data-state', this._dialog.open ? 'open' : 'closed');

    if (this._dialog.disabled) {
      this.setAttribute('data-disabled', '');
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.removeAttribute('data-disabled');
      this.removeAttribute('aria-disabled');
    }
  }

  override updated() {
    this._updateState();
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-alert-dialog-cancel': AlertDialogCancelElement;
  }
}
