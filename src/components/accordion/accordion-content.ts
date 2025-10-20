import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { AccordionItemElement } from './accordion-item.js';

/**
 * Accordion Content Component
 * 
 * Contains the collapsible content for an item.
 * 
 * @slot - Default slot for content
 */
@customElement('wc-accordion-content')
export class AccordionContentElement extends PrimitiveElement {
  @property({ type: String })
  private _contentId = '';

  private _item: AccordionItemElement | null = null;

  override connectedCallback() {
    super.connectedCallback();
    
    this._item = this.closest('wc-accordion-item');
    const accordion = this.closest('wc-accordion');
    
    this._contentId = `${this._item?.value}-content`;
    
    // Set ARIA attributes
    this.setAttribute('role', 'region');
    this.setAttribute('id', this._contentId);
    this.setAttribute('aria-labelledby', this._getTriggerId());
    this.setAttribute('data-state', this._item?.isOpen ? 'open' : 'closed');
    
    // Hide content if not open
    if (!this._item?.isOpen) {
      this.style.display = 'none';
    }
    
    // Listen for value changes on the accordion
    accordion?.addEventListener('value-change', this._handleAccordionChange);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    const accordion = this.closest('wc-accordion');
    accordion?.removeEventListener('value-change', this._handleAccordionChange);
  }

  private _handleAccordionChange = () => {
    this.requestUpdate();
  };

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    
    const isOpen = this._item?.isOpen ?? false;
    this.setAttribute('data-state', isOpen ? 'open' : 'closed');
    
    // Toggle display based on open state
    // This is a minimal approach; consumers can override with CSS
    if (isOpen) {
      this.style.display = '';
    } else {
      this.style.display = 'none';
    }
  }

  private _getTriggerId(): string {
    const trigger = this._item?.querySelector('wc-accordion-trigger');
    return trigger?.id || '';
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-accordion-content': AccordionContentElement;
  }
}
