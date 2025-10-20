import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { HoverCardElement } from './hover-card.js';

/**
 * Hover Card Content Component
 * 
 * The content displayed when the hover card is open.
 * Allows interaction with content without immediately closing.
 * 
 * @slot - Default slot for hover card content
 * 
 * @example
 * ```html
 * <wc-hover-card-content>
 *   <h3>User Profile</h3>
 *   <p>Detailed information here</p>
 * </wc-hover-card-content>
 * ```
 */
@customElement('wc-hover-card-content')
export class HoverCardContentElement extends PrimitiveElement {
  @property({ type: String })
  ariaLabel = '';

  override connectedCallback() {
    super.connectedCallback();

    this.setAttribute('role', 'dialog');

    // Prevent hover card from closing when hovering over content
    this.addEventListener('mouseenter', this._handleMouseEnter);
    this.addEventListener('mouseleave', this._handleMouseLeave);

    this._updateAttributes();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('mouseenter', this._handleMouseEnter);
    this.removeEventListener('mouseleave', this._handleMouseLeave);
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('ariaLabel')) {
      this._updateAttributes();
    }
  }

  private _handleMouseEnter = () => {
    // Keep hover card open when hovering over content
    const hoverCard = this.closest('wc-hover-card') as HoverCardElement | null;
    if (hoverCard && !hoverCard.disabled) {
      // Cancel any pending close timeout
      hoverCard.openHoverCard(0);
    }
  };

  private _handleMouseLeave = () => {
    const hoverCard = this.closest('wc-hover-card') as HoverCardElement | null;
    if (hoverCard && !hoverCard.disabled) {
      hoverCard.closeHoverCard();
    }
  };

  private _updateAttributes() {
    if (this.ariaLabel) {
      this.setAttribute('aria-label', this.ariaLabel);
    }

    const hoverCard = this.closest('wc-hover-card') as HoverCardElement | null;
    if (hoverCard) {
      this.setAttribute('data-state', hoverCard.open ? 'open' : 'closed');
      
      // Hide content when hover card is closed
      if (!hoverCard.open) {
        this.style.display = 'none';
        this.style.pointerEvents = 'none';
      } else {
        this.style.display = '';
        this.style.pointerEvents = 'auto';
      }
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-hover-card-content': HoverCardContentElement;
  }
}
