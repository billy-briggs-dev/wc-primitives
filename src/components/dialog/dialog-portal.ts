import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Dialog Portal Component
 * 
 * Portals the overlay and content to a different part of the DOM (typically document.body).
 * This ensures the dialog appears above other content with proper stacking context.
 * 
 * @slot - Default slot for overlay and content
 * 
 * @example
 * ```html
 * <wc-dialog-portal>
 *   <wc-dialog-overlay />
 *   <wc-dialog-content>...</wc-dialog-content>
 * </wc-dialog-portal>
 * ```
 */
@customElement('wc-dialog-portal')
export class DialogPortalElement extends PrimitiveElement {
  private _dialog: any = null;

  override connectedCallback() {
    super.connectedCallback();
    this._dialog = this.closest('wc-dialog');
    this._updateVisibility();
  }

  override updated() {
    this._updateVisibility();
  }

  private _updateVisibility() {
    if (!this._dialog) return;

    // Show/hide the portal based on dialog state
    if (this._dialog.open) {
      this.style.display = '';
      this.setAttribute('data-state', 'open');
    } else {
      this.style.display = 'none';
      this.setAttribute('data-state', 'closed');
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-dialog-portal': DialogPortalElement;
  }
}
