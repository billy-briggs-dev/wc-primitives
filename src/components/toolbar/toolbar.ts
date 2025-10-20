import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Toolbar Root Component
 * 
 * A container for grouping a set of controls, such as buttons, toggle buttons, or dropdown menus.
 * 
 * @slot - Default slot for toolbar content (buttons, toggles, separators)
 * 
 * @example
 * ```html
 * <wc-toolbar>
 *   <wc-toolbar-button>Cut</wc-toolbar-button>
 *   <wc-toolbar-button>Copy</wc-toolbar-button>
 *   <wc-toolbar-button>Paste</wc-toolbar-button>
 * </wc-toolbar>
 * ```
 */
@customElement('wc-toolbar')
export class ToolbarElement extends PrimitiveElement {
  /**
   * The orientation of the toolbar.
   */
  @property({ type: String })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * When true, prevents the user from interacting with the toolbar.
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * Whether to enable roving tab index for keyboard navigation.
   * When true, only one item in the toolbar has tabindex="0" at a time.
   */
  @property({ type: Boolean, attribute: 'roving-tabindex' })
  rovingTabindex = true;

  override connectedCallback() {
    super.connectedCallback();
    
    this.setAttribute('role', 'toolbar');
    this.setAttribute('data-orientation', this.orientation);
    
    if (this.orientation === 'vertical') {
      this.setAttribute('aria-orientation', 'vertical');
    }

    // Add keyboard navigation
    this.addEventListener('keydown', this._handleKeydown);
    this.addEventListener('focusin', this._handleFocusIn);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleKeydown);
    this.removeEventListener('focusin', this._handleFocusIn);
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('orientation')) {
      this.setAttribute('data-orientation', this.orientation);
      if (this.orientation === 'vertical') {
        this.setAttribute('aria-orientation', 'vertical');
      } else {
        this.removeAttribute('aria-orientation');
      }
    }

    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('data-disabled', '');
        this.setAttribute('aria-disabled', 'true');
      } else {
        this.removeAttribute('data-disabled');
        this.removeAttribute('aria-disabled');
      }
    }

    if (changedProperties.has('rovingTabindex')) {
      this._updateTabIndices();
    }
  }

  private _getFocusableElements(): HTMLElement[] {
    const selector = [
      'wc-toolbar-button',
      'wc-toolbar-toggle-item',
      'button',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');
    
    return Array.from(this.querySelectorAll(selector)).filter(
      (el) => !el.hasAttribute('disabled') && !el.hasAttribute('data-disabled')
    ) as HTMLElement[];
  }

  private _updateTabIndices() {
    if (!this.rovingTabindex) return;

    const elements = this._getFocusableElements();
    if (elements.length === 0) return;

    // Find the currently focused element or the first one
    const focusedIndex = elements.findIndex((el) => el === document.activeElement);
    const activeIndex = focusedIndex >= 0 ? focusedIndex : 0;

    elements.forEach((el, index) => {
      if (index === activeIndex) {
        el.setAttribute('tabindex', '0');
      } else {
        el.setAttribute('tabindex', '-1');
      }
    });
  }

  private _handleKeydown = (e: KeyboardEvent) => {
    if (this.disabled) return;

    const elements = this._getFocusableElements();
    if (elements.length === 0) return;

    const currentIndex = elements.findIndex((el) => el === e.target);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;
    let handled = false;

    const isHorizontal = this.orientation === 'horizontal';
    const isVertical = this.orientation === 'vertical';

    switch (e.key) {
      case 'ArrowRight':
        if (isHorizontal) {
          nextIndex = (currentIndex + 1) % elements.length;
          handled = true;
        }
        break;
      case 'ArrowLeft':
        if (isHorizontal) {
          nextIndex = (currentIndex - 1 + elements.length) % elements.length;
          handled = true;
        }
        break;
      case 'ArrowDown':
        if (isVertical) {
          nextIndex = (currentIndex + 1) % elements.length;
          handled = true;
        }
        break;
      case 'ArrowUp':
        if (isVertical) {
          nextIndex = (currentIndex - 1 + elements.length) % elements.length;
          handled = true;
        }
        break;
      case 'Home':
        nextIndex = 0;
        handled = true;
        break;
      case 'End':
        nextIndex = elements.length - 1;
        handled = true;
        break;
    }

    if (handled) {
      e.preventDefault();
      if (this.rovingTabindex) {
        elements.forEach((el, i) => {
          el.setAttribute('tabindex', i === nextIndex ? '0' : '-1');
        });
      }
      elements[nextIndex].focus();
    }
  };

  private _handleFocusIn = () => {
    if (this.rovingTabindex) {
      this._updateTabIndices();
    }
  };

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-toolbar': ToolbarElement;
  }
}
