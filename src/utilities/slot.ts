import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../primitive-element.js';

/**
 * Slot Component
 * 
 * Merges its props onto its immediate child element.
 * Useful for creating components that can accept a custom element as a child
 * while still being able to pass props to it.
 * 
 * @slot - Default slot for the child element that will receive merged props
 * 
 * @example
 * ```html
 * <wc-slot>
 *   <button>Click me</button>
 * </wc-slot>
 * ```
 */
@customElement('wc-slot')
export class SlotElement extends PrimitiveElement {
  /**
   * When true, prevents merging props and just renders the child as-is
   */
  @property({ type: Boolean })
  asChild = false;

  private _childElement: Element | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this._setupSlot();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanupSlot();
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    
    if (changedProperties.has('asChild')) {
      this._mergePropsToChild();
    }
  }

  private _setupSlot() {
    // Listen for slot changes
    this.addEventListener('slotchange', this._handleSlotChange);
  }

  private _cleanupSlot() {
    this.removeEventListener('slotchange', this._handleSlotChange);
  }

  private _handleSlotChange = () => {
    this._mergePropsToChild();
  };

  private _mergePropsToChild() {
    if (!this.asChild) return;

    // Get the slotted child element
    const slot = this.querySelector('slot');
    if (!slot) return;

    const assignedElements = slot.assignedElements();
    if (assignedElements.length === 0) return;

    this._childElement = assignedElements[0];

    // Merge data attributes from this element to the child
    Array.from(this.attributes).forEach((attr) => {
      if (attr.name.startsWith('data-') && this._childElement) {
        this._childElement.setAttribute(attr.name, attr.value);
      }
    });

    // Merge ARIA attributes
    Array.from(this.attributes).forEach((attr) => {
      if (attr.name.startsWith('aria-') && this._childElement) {
        this._childElement.setAttribute(attr.name, attr.value);
      }
    });

    // Merge class names
    if (this.className && this._childElement) {
      const existingClasses = this._childElement.className;
      const newClasses = this.className;
      this._childElement.className = `${existingClasses} ${newClasses}`.trim();
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-slot': SlotElement;
  }
}
