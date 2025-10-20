import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Select Content Component
 * 
 * The dropdown content that contains the select options.
 * 
 * @slot - Default slot for select viewport and items
 * 
 * @example
 * ```html
 * <wc-select-content>
 *   <wc-select-viewport>
 *     <wc-select-item value="1">Option 1</wc-select-item>
 *   </wc-select-viewport>
 * </wc-select-content>
 * ```
 */
@customElement('wc-select-content')
export class SelectContentElement extends PrimitiveElement {
  /**
   * The preferred side of the trigger to render against when open.
   */
  @property({ type: String })
  side: 'top' | 'right' | 'bottom' | 'left' = 'bottom';

  /**
   * The preferred alignment against the trigger.
   */
  @property({ type: String })
  align: 'start' | 'center' | 'end' = 'start';

  override connectedCallback() {
    super.connectedCallback();
    
    this.setAttribute('role', 'listbox');
    this.setAttribute('data-select-content', '');
    
    const select = this.closest('wc-select');
    if (select) {
      this.setAttribute('data-state', select.open ? 'open' : 'closed');
    }
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('side')) {
      this.setAttribute('data-side', this.side);
    }

    if (changedProperties.has('align')) {
      this.setAttribute('data-align', this.align);
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-select-content': SelectContentElement;
  }
}
