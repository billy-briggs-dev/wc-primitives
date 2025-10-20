import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Label Component
 * 
 * Renders an accessible label that is associated with controls.
 * 
 * @slot - Default slot for label content
 * 
 * @example
 * ```html
 * <wc-label for="username">Username</wc-label>
 * <input id="username" type="text" />
 * ```
 */
@customElement('wc-label')
export class LabelElement extends PrimitiveElement {
  /**
   * The id of the element this label is associated with.
   */
  @property({ type: String })
  for = '';

  override connectedCallback() {
    super.connectedCallback();
    
    this.setAttribute('role', 'label');
    
    // Add click handler to focus associated element
    this.addEventListener('click', this._handleClick);
    
    this._updateAttributes();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
  }

  override updated() {
    this._updateAttributes();
  }

  private _handleClick = (e: Event) => {
    if (!this.for) return;

    // Prevent default label click behavior if we handle it
    e.preventDefault();

    // Find the associated element
    const root = this.getRootNode() as Document | ShadowRoot;
    const element = root.getElementById(this.for);
    
    if (element) {
      // Focus the associated element
      if ('focus' in element && typeof element.focus === 'function') {
        element.focus();
      }
      
      // Trigger click for checkboxes and radios
      if (
        element instanceof HTMLInputElement &&
        (element.type === 'checkbox' || element.type === 'radio')
      ) {
        element.click();
      }
    }
  };

  private _updateAttributes() {
    if (this.for) {
      this.setAttribute('for', this.for);
    } else {
      this.removeAttribute('for');
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-label': LabelElement;
  }
}
