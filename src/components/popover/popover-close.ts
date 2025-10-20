import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { PopoverElement } from './popover.js';

/**
 * Popover Close Component
 * 
 * A button that closes the popover when clicked.
 * 
 * @slot - Default slot for close button content
 * 
 * @example
 * ```html
 * <wc-popover-close>Close</wc-popover-close>
 * ```
 */
@customElement('wc-popover-close')
export class PopoverCloseElement extends PrimitiveElement {
  private _popover: PopoverElement | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this._popover = this.closest('wc-popover');

    this.setAttribute('role', 'button');
    this.setAttribute('tabindex', '0');
    this.setAttribute('type', 'button');

    // Add click handler
    this.addEventListener('click', this._handleClick);
    this.addEventListener('keydown', this._handleKeydown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeydown);
  }

  private _handleClick = () => {
    if (this._popover) {
      this._popover.closePopover();
    }
  };

  private _handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (this._popover) {
        this._popover.closePopover();
      }
    }
  };

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-popover-close': PopoverCloseElement;
  }
}
