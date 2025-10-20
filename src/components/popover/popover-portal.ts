import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { PopoverElement } from './popover.js';

/**
 * Popover Portal Component
 * 
 * Portals the content to a different part of the DOM (typically document.body).
 * This ensures the popover appears above other content with proper stacking context.
 * 
 * @slot - Default slot for popover content
 * 
 * @example
 * ```html
 * <wc-popover-portal>
 *   <wc-popover-content>...</wc-popover-content>
 * </wc-popover-portal>
 * ```
 */
@customElement('wc-popover-portal')
export class PopoverPortalElement extends PrimitiveElement {
  private _popover: PopoverElement | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this._popover = this.closest('wc-popover');
    this._updateVisibility();
  }

  override updated() {
    this._updateVisibility();
  }

  private _updateVisibility() {
    if (!this._popover) return;

    // Show/hide the portal based on popover state
    if (this._popover.open) {
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
    'wc-popover-portal': PopoverPortalElement;
  }
}
