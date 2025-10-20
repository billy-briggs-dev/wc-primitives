import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Collapsible Root Component
 * 
 * An interactive component which can be expanded/collapsed to show/hide content.
 * 
 * @fires open-change - Fires when the open state changes
 * 
 * @slot - Default slot for trigger and content
 * 
 * @example
 * ```html
 * <wc-collapsible>
 *   <wc-collapsible-trigger>Toggle</wc-collapsible-trigger>
 *   <wc-collapsible-content>
 *     Hidden content that can be revealed
 *   </wc-collapsible-content>
 * </wc-collapsible>
 * ```
 */
@customElement('wc-collapsible')
export class CollapsibleElement extends PrimitiveElement {
  /**
   * The controlled open state of the collapsible.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * When true, prevents the user from interacting with the collapsible.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('data-state', this.open ? 'open' : 'closed');
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('open')) {
      this.setAttribute('data-state', this.open ? 'open' : 'closed');
      this._notifyChange();
      this._updateChildComponents();
    }

    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('data-disabled', '');
      } else {
        this.removeAttribute('data-disabled');
      }
    }
  }

  /**
   * Toggle the collapsible's open state
   */
  toggle() {
    if (this.disabled) return;
    this.open = !this.open;
  }

  private _updateChildComponents() {
    // Force child components to update
    const children = this.querySelectorAll(
      'wc-collapsible-trigger, wc-collapsible-content'
    );
    children.forEach((child) => {
      if ('requestUpdate' in child && typeof child.requestUpdate === 'function') {
        child.requestUpdate();
      }
    });
  }

  private _notifyChange() {
    this.dispatchCustomEvent('open-change', { open: this.open });
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-collapsible': CollapsibleElement;
  }
}
