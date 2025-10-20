import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { AccordionElement } from './accordion.js';

/**
 * Accordion Item Component
 * 
 * Contains the parts of a collapsible section.
 * 
 * @slot - Default slot for trigger and content
 */
@customElement('wc-accordion-item')
export class AccordionItemElement extends PrimitiveElement {
  /**
   * A unique value for the item.
   */
  @property({ type: String })
  value = '';

  /**
   * When true, prevents the user from interacting with the item.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  private _accordion: AccordionElement | null = null;

  override connectedCallback() {
    super.connectedCallback();
    
    // Find parent accordion
    this._accordion = this.closest('wc-accordion');
    
    if (!this.value) {
      this.value = this.generateId('accordion-item');
    }
    
    this.setAttribute('data-state', this._getState());
    
    if (this.disabled || this._accordion?.disabled) {
      this.setAttribute('data-disabled', '');
    } else {
      this.removeAttribute('data-disabled');
    }
    
    // Listen for value changes on the accordion
    this._accordion?.addEventListener('value-change', this._handleAccordionChange);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._accordion?.removeEventListener('value-change', this._handleAccordionChange);
  }

  private _handleAccordionChange = () => {
    this.requestUpdate();
  };

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    
    if (changedProperties.has('disabled')) {
      if (this.disabled || this._accordion?.disabled) {
        this.setAttribute('data-disabled', '');
      } else {
        this.removeAttribute('data-disabled');
      }
    }
    
    // Update state attribute
    this.setAttribute('data-state', this._getState());
  }

  private _getState(): 'open' | 'closed' {
    return this._accordion?.isItemOpen(this.value) ? 'open' : 'closed';
  }

  /**
   * Check if this item is currently open
   */
  get isOpen(): boolean {
    return this._accordion?.isItemOpen(this.value) ?? false;
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-accordion-item': AccordionItemElement;
  }
}
