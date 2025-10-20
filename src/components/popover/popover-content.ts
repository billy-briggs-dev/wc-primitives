import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { PopoverElement } from './popover.js';

/**
 * Popover Content Component
 * 
 * Contains the popover content and handles accessibility attributes.
 * 
 * @slot - Default slot for popover content
 * 
 * @example
 * ```html
 * <wc-popover-content>
 *   <p>Popover content here</p>
 *   <wc-popover-close>Close</wc-popover-close>
 * </wc-popover-content>
 * ```
 */
@customElement('wc-popover-content')
export class PopoverContentElement extends PrimitiveElement {
  @property({ type: String })
  ariaLabel = '';

  @property({ type: String })
  side: 'top' | 'right' | 'bottom' | 'left' = 'bottom';

  @property({ type: String })
  align: 'start' | 'center' | 'end' = 'center';

  private _popover: PopoverElement | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this._popover = this.closest('wc-popover');

    this.setAttribute('role', 'dialog');
    this.setAttribute('tabindex', '-1');

    // Add escape key handler
    this.addEventListener('keydown', this._handleKeydown);
    this.addEventListener('click', this._handleClick);

    this._updateAttributes();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleKeydown);
    this.removeEventListener('click', this._handleClick);
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('ariaLabel') || changedProperties.has('side') || changedProperties.has('align')) {
      this._updateAttributes();
    }
  }

  private _handleClick = (e: MouseEvent) => {
    // Stop propagation to prevent triggering outside click handler
    e.stopPropagation();
  };

  private _handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this._popover) {
      e.preventDefault();
      this._popover.closePopover();
    }
  };

  private _updateAttributes() {
    if (this.ariaLabel) {
      this.setAttribute('aria-label', this.ariaLabel);
    }

    this.setAttribute('data-side', this.side);
    this.setAttribute('data-align', this.align);

    if (this._popover) {
      this.setAttribute('data-state', this._popover.open ? 'open' : 'closed');
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-popover-content': PopoverContentElement;
  }
}
