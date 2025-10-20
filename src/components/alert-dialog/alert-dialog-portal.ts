import { html, PropertyValues } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { AlertDialogElement } from './alert-dialog.js';

/**
 * Alert Dialog Portal Component
 * 
 * Renders alert dialog content into the document body portal.
 * This ensures the dialog appears above other content with proper z-index stacking.
 * 
 * @slot - Default slot for overlay and content
 * 
 * @example
 * ```html
 * <wc-alert-dialog-portal>
 *   <wc-alert-dialog-overlay />
 *   <wc-alert-dialog-content>
 *     <!-- content -->
 *   </wc-alert-dialog-content>
 * </wc-alert-dialog-portal>
 * ```
 */
@customElement('wc-alert-dialog-portal')
export class AlertDialogPortalElement extends PrimitiveElement {
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
    
    // Control visibility based on open state
    if (this._dialog.open) {
      this.style.display = '';
    } else {
      this.style.display = 'none';
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-alert-dialog-portal': AlertDialogPortalElement;
  }
}
