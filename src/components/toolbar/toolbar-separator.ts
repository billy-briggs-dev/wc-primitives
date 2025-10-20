import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Toolbar Separator Component
 * 
 * A visual separator between toolbar items.
 * 
 * @example
 * ```html
 * <wc-toolbar>
 *   <wc-toolbar-button>Cut</wc-toolbar-button>
 *   <wc-toolbar-separator></wc-toolbar-separator>
 *   <wc-toolbar-button>Copy</wc-toolbar-button>
 * </wc-toolbar>
 * ```
 */
@customElement('wc-toolbar-separator')
export class ToolbarSeparatorElement extends PrimitiveElement {
  /**
   * The orientation of the separator.
   * By default, it will match the toolbar's orientation.
   */
  @property({ type: String })
  orientation?: 'horizontal' | 'vertical';

  override connectedCallback() {
    super.connectedCallback();
    
    this.setAttribute('role', 'separator');
    
    // Determine orientation from parent toolbar if not explicitly set
    if (!this.orientation) {
      const toolbar = this.closest('wc-toolbar');
      if (toolbar) {
        const toolbarOrientation = toolbar.getAttribute('data-orientation') || 'horizontal';
        this.orientation = toolbarOrientation === 'vertical' ? 'horizontal' : 'vertical';
      }
    }
    
    this._updateOrientation();
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    this._updateOrientation();
  }

  private _updateOrientation() {
    if (this.orientation === 'vertical') {
      this.setAttribute('aria-orientation', 'vertical');
      this.setAttribute('data-orientation', 'vertical');
    } else {
      this.removeAttribute('aria-orientation');
      this.setAttribute('data-orientation', 'horizontal');
    }
  }

  override render() {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-toolbar-separator': ToolbarSeparatorElement;
  }
}
