import { html, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Accordion Root Component
 * 
 * A vertically stacked set of interactive headings that each reveal an associated section of content.
 * 
 * @fires value-change - Fires when the open items change
 * 
 * @slot - Default slot for accordion items
 * 
 * @example
 * ```html
 * <wc-accordion type="single" collapsible>
 *   <wc-accordion-item value="item-1">
 *     <wc-accordion-trigger>Item 1</wc-accordion-trigger>
 *     <wc-accordion-content>Content 1</wc-accordion-content>
 *   </wc-accordion-item>
 * </wc-accordion>
 * ```
 */
@customElement('wc-accordion')
export class AccordionElement extends PrimitiveElement {
  /**
   * Determines whether one or multiple items can be opened at the same time.
   */
  @property({ type: String })
  type: 'single' | 'multiple' = 'single';

  /**
   * When type is "single", allows closing content when clicking trigger for an open item.
   */
  @property({ type: Boolean })
  collapsible = false;

  /**
   * The controlled open item(s). Single type expects string, multiple expects array.
   */
  @property({ type: String })
  value = '';

  /**
   * When true, prevents the user from interacting with the accordion and all its items.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The orientation of the accordion.
   */
  @property({ type: String })
  orientation: 'horizontal' | 'vertical' = 'vertical';

  @state()
  private _openItems = new Set<string>();

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'region');
    this.setAttribute('data-orientation', this.orientation);
    
    if (this.value) {
      if (this.type === 'multiple') {
        this._openItems = new Set(this.value.split(',').map(v => v.trim()));
      } else {
        this._openItems = new Set([this.value]);
      }
    }
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    
    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('data-disabled', '');
      } else {
        this.removeAttribute('data-disabled');
      }
    }
    
    if (changedProperties.has('orientation')) {
      this.setAttribute('data-orientation', this.orientation);
    }
  }

  /**
   * Toggle an accordion item's open state
   */
  toggleItem(itemValue: string) {
    if (this.disabled) return;

    const isOpen = this._openItems.has(itemValue);

    if (this.type === 'single') {
      if (isOpen && this.collapsible) {
        this._openItems.clear();
      } else if (!isOpen) {
        this._openItems.clear();
        this._openItems.add(itemValue);
      }
    } else {
      // multiple
      if (isOpen) {
        this._openItems.delete(itemValue);
      } else {
        this._openItems.add(itemValue);
      }
    }

    this.requestUpdate();
    this._notifyChange();
    this._updateChildComponents();
  }

  /**
   * Check if an item is open
   */
  isItemOpen(itemValue: string): boolean {
    return this._openItems.has(itemValue);
  }

  private _updateChildComponents() {
    // Force child components to update
    const items = this.querySelectorAll('wc-accordion-item');
    items.forEach(item => item.requestUpdate());
  }

  private _notifyChange() {
    const value =
      this.type === 'single'
        ? Array.from(this._openItems)[0] || ''
        : Array.from(this._openItems).join(',');

    this.value = value;
    this.dispatchCustomEvent('value-change', { value });
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-accordion': AccordionElement;
  }
}
