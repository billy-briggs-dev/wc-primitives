import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { PopoverElement } from './popover.js';

/**
 * Popover Trigger Component
 * 
 * The button that toggles the popover.
 * 
 * @slot - Default slot for trigger content
 * 
 * @example
 * ```html
 * <wc-popover-trigger>Open Popover</wc-popover-trigger>
 * ```
 */
@customElement('wc-popover-trigger')
export class PopoverTriggerElement extends PrimitiveElement {
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

    // Update initial state
    this._updateState();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeydown);
  }

  private _handleClick = (e: MouseEvent) => {
    e.stopPropagation(); // Prevent triggering outside click handler
    if (this._popover && !this._popover.disabled) {
      this._popover.toggleOpen();
    }
  };

  private _handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (this._popover && !this._popover.disabled) {
        this._popover.toggleOpen();
      }
    }
  };

  private _updateState() {
    if (!this._popover) return;

    this.setAttribute('data-state', this._popover.open ? 'open' : 'closed');
    this.setAttribute('aria-expanded', this._popover.open ? 'true' : 'false');
    this.setAttribute('aria-haspopup', 'dialog');

    if (this._popover.disabled) {
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
    'wc-popover-trigger': PopoverTriggerElement;
  }
}
