import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { AccordionElement } from './accordion.js';
import type { AccordionItemElement } from './accordion-item.js';

/**
 * Accordion Trigger Component
 * 
 * Toggles the collapsed state of its associated item. It should be nested inside of an AccordionItem.
 * 
 * @slot - Default slot for trigger content
 */
@customElement('wc-accordion-trigger')
export class AccordionTriggerElement extends PrimitiveElement {
  @property({ type: String })
  private _triggerId = '';

  private _accordion: AccordionElement | null = null;
  private _item: AccordionItemElement | null = null;

  override connectedCallback() {
    super.connectedCallback();
    
    this._accordion = this.closest('wc-accordion');
    this._item = this.closest('wc-accordion-item');
    
    this._triggerId = this.generateId('accordion-trigger');
    
    // Set ARIA attributes
    this.setAttribute('role', 'button');
    this.setAttribute('type', 'button');
    this.setAttribute('aria-expanded', this._item?.isOpen ? 'true' : 'false');
    this.setAttribute('aria-controls', `${this._item?.value}-content`);
    this.setAttribute('id', this._triggerId);
    this.setAttribute('data-state', this._item?.isOpen ? 'open' : 'closed');
    
    const disabled = this._item?.disabled || this._accordion?.disabled;
    if (disabled) {
      this.setAttribute('data-disabled', '');
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('data-disabled');
      this.removeAttribute('disabled');
    }
    
    if (!disabled) {
      this.setAttribute('tabindex', '0');
    }
    
    this.addEventListener('click', this._handleClick);
    this.addEventListener('keydown', this._handleKeyDown);
    
    // Listen for value changes on the accordion
    this._accordion?.addEventListener('value-change', this._handleAccordionChange);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeyDown);
    this._accordion?.removeEventListener('value-change', this._handleAccordionChange);
  }

  private _handleAccordionChange = () => {
    this.requestUpdate();
  };

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    
    // Update ARIA and data attributes based on state
    const isOpen = this._item?.isOpen ?? false;
    this.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    this.setAttribute('data-state', isOpen ? 'open' : 'closed');
    
    const disabled = this._item?.disabled || this._accordion?.disabled;
    if (disabled) {
      this.setAttribute('data-disabled', '');
      this.setAttribute('disabled', '');
      this.removeAttribute('tabindex');
    } else {
      this.removeAttribute('data-disabled');
      this.removeAttribute('disabled');
      this.setAttribute('tabindex', '0');
    }
  }

  private _handleClick = (event: Event) => {
    event.preventDefault();
    
    if (this._item?.disabled || this._accordion?.disabled) {
      return;
    }
    
    if (this._accordion && this._item) {
      this._accordion.toggleItem(this._item.value);
    }
  };

  private _handleKeyDown = (event: KeyboardEvent) => {
    if (this._item?.disabled || this._accordion?.disabled) {
      return;
    }
    
    // Trigger on Space or Enter
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      if (this._accordion && this._item) {
        this._accordion.toggleItem(this._item.value);
      }
    }
    
    // Arrow key navigation
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      this._handleArrowNavigation(event.key === 'ArrowDown');
    }
  };

  private _handleArrowNavigation(isDown: boolean) {
    if (!this._accordion) return;
    
    const triggers = Array.from(
      this._accordion.querySelectorAll('wc-accordion-trigger')
    ) as AccordionTriggerElement[];
    
    const currentIndex = triggers.indexOf(this);
    if (currentIndex === -1) return;
    
    const nextIndex = isDown
      ? (currentIndex + 1) % triggers.length
      : (currentIndex - 1 + triggers.length) % triggers.length;
    
    triggers[nextIndex]?.focus();
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-accordion-trigger': AccordionTriggerElement;
  }
}
