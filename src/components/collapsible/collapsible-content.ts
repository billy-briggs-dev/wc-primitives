import { html, PropertyValues } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { CollapsibleElement } from './collapsible.js';

/**
 * Collapsible Content Component
 * 
 * Contains the collapsible content.
 * 
 * @slot - Default slot for content
 * 
 * @example
 * ```html
 * <wc-collapsible-content>
 *   <p>This content can be collapsed</p>
 * </wc-collapsible-content>
 * ```
 */
@customElement('wc-collapsible-content')
export class CollapsibleContentElement extends PrimitiveElement {
  private _collapsible: CollapsibleElement | null = null;
  private _contentId = '';

  override connectedCallback() {
    super.connectedCallback();

    this._collapsible = this.closest('wc-collapsible');
    this._contentId = this.generateId('collapsible-content');

    // Set ARIA attributes
    this.setAttribute('role', 'region');
    this.setAttribute('id', this._contentId);
    this.setAttribute('data-state', this._collapsible?.open ? 'open' : 'closed');

    // Hide content if not open
    if (!this._collapsible?.open) {
      this.style.display = 'none';
    }

    // Listen for open changes
    this._collapsible?.addEventListener('open-change', this._handleOpenChange);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._collapsible?.removeEventListener('open-change', this._handleOpenChange);
  }

  private _handleOpenChange = () => {
    this.requestUpdate();
  };

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    const isOpen = this._collapsible?.open ?? false;
    this.setAttribute('data-state', isOpen ? 'open' : 'closed');

    // Toggle display based on open state
    // This is a minimal approach; consumers can override with CSS
    if (isOpen) {
      this.style.display = '';
    } else {
      this.style.display = 'none';
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-collapsible-content': CollapsibleContentElement;
  }
}
