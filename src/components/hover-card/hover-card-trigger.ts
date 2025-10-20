import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { HoverCardElement } from './hover-card.js';

/**
 * Hover Card Trigger Component
 * 
 * The element that triggers the hover card on hover or focus.
 * 
 * @slot - Default slot for trigger content
 * 
 * @example
 * ```html
 * <wc-hover-card-trigger>Hover me</wc-hover-card-trigger>
 * ```
 */
@customElement('wc-hover-card-trigger')
export class HoverCardTriggerElement extends PrimitiveElement {
  private _contentId = '';

  override connectedCallback() {
    super.connectedCallback();
    this._contentId = this.generateId('hover-card-content');

    this.setAttribute('tabindex', '0');

    // Add event listeners
    this.addEventListener('mouseenter', this._handleMouseEnter);
    this.addEventListener('mouseleave', this._handleMouseLeave);
    this.addEventListener('focus', this._handleFocus);
    this.addEventListener('blur', this._handleBlur);

    this._updateState();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('mouseenter', this._handleMouseEnter);
    this.removeEventListener('mouseleave', this._handleMouseLeave);
    this.removeEventListener('focus', this._handleFocus);
    this.removeEventListener('blur', this._handleBlur);
  }

  private _handleMouseEnter = () => {
    const hoverCard = this.closest('wc-hover-card') as HoverCardElement | null;
    if (hoverCard && !hoverCard.disabled) {
      hoverCard.openHoverCard();
    }
  };

  private _handleMouseLeave = () => {
    const hoverCard = this.closest('wc-hover-card') as HoverCardElement | null;
    if (hoverCard && !hoverCard.disabled) {
      hoverCard.closeHoverCard();
    }
  };

  private _handleFocus = () => {
    const hoverCard = this.closest('wc-hover-card') as HoverCardElement | null;
    if (hoverCard && !hoverCard.disabled) {
      hoverCard.openHoverCard(0); // No delay on focus
    }
  };

  private _handleBlur = () => {
    const hoverCard = this.closest('wc-hover-card') as HoverCardElement | null;
    if (hoverCard && !hoverCard.disabled) {
      hoverCard.closeHoverCard();
    }
  };

  private _updateState() {
    const hoverCard = this.closest('wc-hover-card') as HoverCardElement | null;
    if (!hoverCard) return;

    this.setAttribute('data-state', hoverCard.open ? 'open' : 'closed');
    this.setAttribute('aria-expanded', hoverCard.open ? 'true' : 'false');
    this.setAttribute('aria-controls', this._contentId);

    if (hoverCard.disabled) {
      this.setAttribute('data-disabled', '');
    } else {
      this.removeAttribute('data-disabled');
    }

    // Update the content with the ID
    const content = hoverCard.querySelector('wc-hover-card-content');
    if (content) {
      content.setAttribute('id', this._contentId);
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
    'wc-hover-card-trigger': HoverCardTriggerElement;
  }
}
