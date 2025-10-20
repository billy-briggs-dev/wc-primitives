import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Aspect Ratio Component
 * 
 * Displays content within a desired ratio.
 * 
 * @slot - Default slot for content
 * 
 * @example
 * ```html
 * <wc-aspect-ratio ratio="16/9">
 *   <img src="..." alt="..." />
 * </wc-aspect-ratio>
 * ```
 */
@customElement('wc-aspect-ratio')
export class AspectRatioElement extends PrimitiveElement {
  /**
   * The desired aspect ratio (e.g., "16/9", "4/3", "1/1").
   */
  @property({ type: String })
  ratio = '1/1';

  override connectedCallback() {
    super.connectedCallback();
    this.style.position = 'relative';
    this.style.width = '100%';
  }

  private get paddingBottom(): string {
    const parts = this.ratio.split('/');
    if (parts.length === 2) {
      const width = parseFloat(parts[0]);
      const height = parseFloat(parts[1]);
      if (!isNaN(width) && !isNaN(height) && width > 0) {
        return `${(height / width) * 100}%`;
      }
    }
    return '100%'; // Default to square if invalid ratio
  }

  override render() {
    const containerStyles = {
      position: 'relative' as const,
      width: '100%',
      paddingBottom: this.paddingBottom,
    };

    const contentStyles = {
      position: 'absolute' as const,
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
    };

    return html`
      <div style=${styleMap(containerStyles)}>
        <div style=${styleMap(contentStyles)}>
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-aspect-ratio': AspectRatioElement;
  }
}
