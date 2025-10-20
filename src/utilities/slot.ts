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
 * <wc-slot asChild data-custom="value">
 *   <button>Click me</button>
 * </wc-slot>
 * ```
 */
@customElement('wc-slot')
export class SlotElement extends PrimitiveElement {
  /**
   * When true, enables merging props to the child element
   */
  @property({ type: Boolean })
  asChild = false;

  private _childElement: Element | null = null;
  private _observer: MutationObserver | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this._setupObserver();
    this._mergePropsToChild();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanupObserver();
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    
    if (changedProperties.has('asChild')) {
      this._mergePropsToChild();
    }
  }

  private _setupObserver() {
    // Use MutationObserver to detect changes to child elements in light DOM
    this._observer = new MutationObserver(() => {
      this._mergePropsToChild();
    });

    this._observer.observe(this, {
      childList: true,
      subtree: true,
    });
  }

  private _cleanupObserver() {
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
  }

  private _mergePropsToChild() {
    if (!this.asChild) return;

    // Get the first child element (in light DOM, children are direct children)
    const children = Array.from(this.children).filter(
      (child) => child.tagName.toLowerCase() !== 'slot'
    );
    
    if (children.length === 0) return;

    this._childElement = children[0];

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
