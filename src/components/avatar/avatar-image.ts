import { html, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Avatar Image Component
 * 
 * The image to display. By default it will hide itself if the image fails to load.
 * 
 * @fires load - Fires when the image loads successfully
 * @fires error - Fires when the image fails to load
 * 
 * @example
 * ```html
 * <wc-avatar>
 *   <wc-avatar-image src="..." alt="..." />
 *   <wc-avatar-fallback>AB</wc-avatar-fallback>
 * </wc-avatar>
 * ```
 */
@customElement('wc-avatar-image')
export class AvatarImageElement extends PrimitiveElement {
  /**
   * The source URL of the image.
   */
  @property({ type: String })
  src = '';

  /**
   * Alt text for the image.
   */
  @property({ type: String })
  alt = '';

  @state()
  private _imageLoadingStatus: 'idle' | 'loading' | 'loaded' | 'error' = 'idle';

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('data-component', 'avatar-image');
    
    // Start loading image if src is already set
    if (this.src) {
      this._loadImage();
    }
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('src') && this.src) {
      this._loadImage();
    }
  }

  private _loadImage() {
    this._imageLoadingStatus = 'loading';
    
    const img = new Image();
    img.onload = () => {
      this._imageLoadingStatus = 'loaded';
      this.dispatchCustomEvent('load');
    };
    img.onerror = () => {
      this._imageLoadingStatus = 'error';
      this.dispatchCustomEvent('error');
    };
    img.src = this.src;
  }

  override render() {
    // Only render the image if it loaded successfully
    if (this._imageLoadingStatus === 'loaded') {
      return html`
        <img
          src="${this.src}"
          alt="${this.alt}"
          style="width: 100%; height: 100%; object-fit: cover;"
        />
      `;
    }
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-avatar-image': AvatarImageElement;
  }
}
