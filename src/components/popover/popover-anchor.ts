import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { PopoverElement } from './popover.js';

/**
 * Popover Anchor Component
 * 
 * An optional element to position the popover relative to.
 * If not provided, the popover will be positioned relative to the trigger.
 * 
 * @slot - Default slot for anchor content
 * 
 * @example
 * ```html
 * <wc-popover-anchor>
 *   <div>Content to anchor to</div>
 * </wc-popover-anchor>
 * ```
 */
@customElement('wc-popover-anchor')
export class PopoverAnchorElement extends PrimitiveElement {
  private _popover: PopoverElement | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this._popover = this.closest('wc-popover');
    this._updateState();
  }

  private _updateState() {
    if (!this._popover) return;
    this.setAttribute('data-state', this._popover.open ? 'open' : 'closed');
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
    'wc-popover-anchor': PopoverAnchorElement;
  }
}
