import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../primitive-element.js';

/**
 * Portal Component
 * 
 * Renders content in a different part of the DOM tree.
 * Useful for modals, popovers, and tooltips that need to break out of their container.
 * 
 * @slot - Default slot for content to be portaled
 * 
 * @example
 * ```html
 * <wc-portal container="#portal-root">
 *   <div>Content rendered elsewhere</div>
 * </wc-portal>
 * ```
 */
@customElement('wc-portal')
export class PortalElement extends PrimitiveElement {
  /**
   * CSS selector for the container element where content should be portaled.
   * Defaults to document.body
   */
  @property({ type: String })
  container = '';

  /**
   * When true, disables the portal and renders content in place
   */
  @property({ type: Boolean })
  disabled = false;

  private _portalContainer: HTMLElement | null = null;
  private _portalContent: HTMLElement | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this._setupPortal();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanupPortal();
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    
    if (changedProperties.has('container') || changedProperties.has('disabled')) {
      this._updatePortal();
    }
  }

  private _setupPortal() {
    this._updatePortal();
    this.addEventListener('slotchange', this._handleSlotChange);
  }

  private _cleanupPortal() {
    this.removeEventListener('slotchange', this._handleSlotChange);
    this._removePortalContent();
  }

  private _handleSlotChange = () => {
    this._updatePortal();
  };

  private _getPortalContainer(): HTMLElement {
    if (this.container) {
      const element = document.querySelector(this.container);
      if (element instanceof HTMLElement) {
        return element;
      }
    }
    return document.body;
  }

  private _updatePortal() {
    // If disabled, remove portal content and render in place
    if (this.disabled) {
      this._removePortalContent();
      return;
    }

    // Get or create portal container
    this._portalContainer = this._getPortalContainer();

    // Create portal content container if it doesn't exist
    if (!this._portalContent) {
      this._portalContent = document.createElement('div');
      this._portalContent.setAttribute('data-wc-portal', '');
    }

    // Get slotted content
    const slot = this.querySelector('slot');
    if (slot) {
      const assignedNodes = slot.assignedNodes();
      
      // Move slotted content to portal container
      assignedNodes.forEach((node) => {
        if (this._portalContent && node.nodeType === Node.ELEMENT_NODE) {
          this._portalContent.appendChild(node.cloneNode(true));
        }
      });

      // Append portal content to portal container
      if (this._portalContainer && this._portalContent) {
        this._portalContainer.appendChild(this._portalContent);
      }
    }
  }

  private _removePortalContent() {
    if (this._portalContent && this._portalContent.parentNode) {
      this._portalContent.parentNode.removeChild(this._portalContent);
    }
  }

  override render() {
    // If disabled, render content in place
    if (this.disabled) {
      return html`<slot></slot>`;
    }
    // Otherwise, don't render anything (content is portaled)
    return html`<slot style="display: none;"></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-portal': PortalElement;
  }
}
