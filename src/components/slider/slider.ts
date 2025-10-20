import { html, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Slider Root Component
 * 
 * A control for selecting a value from a range.
 * 
 * @fires value-change - Fires when the value changes
 * 
 * @slot - Default slot for slider parts (track, range, thumb)
 * 
 * @example
 * ```html
 * <wc-slider value="50" min="0" max="100" step="1">
 *   <wc-slider-track>
 *     <wc-slider-range></wc-slider-range>
 *   </wc-slider-track>
 *   <wc-slider-thumb></wc-slider-thumb>
 * </wc-slider>
 * ```
 */
@customElement('wc-slider')
export class SliderElement extends PrimitiveElement {
  /**
   * The controlled value of the slider.
   */
  @property({ type: Number })
  value = 50;

  /**
   * The minimum value of the slider.
   */
  @property({ type: Number })
  min = 0;

  /**
   * The maximum value of the slider.
   */
  @property({ type: Number })
  max = 100;

  /**
   * The step increment for the slider.
   */
  @property({ type: Number })
  step = 1;

  /**
   * When true, prevents the user from interacting with the slider.
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * The orientation of the slider.
   */
  @property({ type: String })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * When true, the slider is inverted (for RTL or bottom-to-top).
   */
  @property({ type: Boolean })
  inverted = false;

  @state()
  private _isDragging = false;

  override connectedCallback() {
    super.connectedCallback();
    
    this.setAttribute('role', 'slider');
    
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }

    // Add event listeners
    this.addEventListener('keydown', this._handleKeydown);
    this.addEventListener('pointerdown', this._handlePointerDown);

    this._updateState();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleKeydown);
    this.removeEventListener('pointerdown', this._handlePointerDown);
    this._removePointerListeners();
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (
      changedProperties.has('value') ||
      changedProperties.has('min') ||
      changedProperties.has('max') ||
      changedProperties.has('disabled') ||
      changedProperties.has('orientation')
    ) {
      this._updateState();
      if (changedProperties.has('value')) {
        this._notifyChange();
        this._updateChildComponents();
      }
    }
  }

  /**
   * Get the percentage value (0-100)
   */
  getPercentage(): number {
    const range = this.max - this.min;
    if (range === 0) return 0;
    return ((this.value - this.min) / range) * 100;
  }

  /**
   * Set value from percentage (0-100)
   */
  setValueFromPercentage(percentage: number) {
    if (this.disabled) return;
    
    const clampedPercentage = Math.max(0, Math.min(100, percentage));
    const range = this.max - this.min;
    let newValue = this.min + (range * clampedPercentage) / 100;
    
    // Round to step
    if (this.step > 0) {
      newValue = Math.round(newValue / this.step) * this.step;
    }
    
    // Clamp to min/max
    newValue = Math.max(this.min, Math.min(this.max, newValue));
    
    this.value = newValue;
  }

  private _handleKeydown = (e: KeyboardEvent) => {
    if (this.disabled) return;

    let handled = false;
    const isHorizontal = this.orientation === 'horizontal';
    const increase = isHorizontal && !this.inverted ? 1 : -1;

    switch (e.key) {
      case 'ArrowRight':
        if (isHorizontal) {
          this._incrementValue(increase);
          handled = true;
        }
        break;
      case 'ArrowLeft':
        if (isHorizontal) {
          this._incrementValue(-increase);
          handled = true;
        }
        break;
      case 'ArrowUp':
        if (!isHorizontal) {
          this._incrementValue(increase);
          handled = true;
        }
        break;
      case 'ArrowDown':
        if (!isHorizontal) {
          this._incrementValue(-increase);
          handled = true;
        }
        break;
      case 'Home':
        this.value = this.min;
        handled = true;
        break;
      case 'End':
        this.value = this.max;
        handled = true;
        break;
      case 'PageUp':
        this._incrementValue(10);
        handled = true;
        break;
      case 'PageDown':
        this._incrementValue(-10);
        handled = true;
        break;
    }

    if (handled) {
      e.preventDefault();
    }
  };

  private _incrementValue(direction: number) {
    const newValue = this.value + direction * this.step;
    this.value = Math.max(this.min, Math.min(this.max, newValue));
  }

  private _handlePointerDown = (e: PointerEvent) => {
    if (this.disabled) return;

    this._isDragging = true;
    this.setPointerCapture(e.pointerId);
    
    this._updateValueFromPointer(e);
    
    document.addEventListener('pointermove', this._handlePointerMove);
    document.addEventListener('pointerup', this._handlePointerUp);
  };

  private _handlePointerMove = (e: PointerEvent) => {
    if (!this._isDragging) return;
    this._updateValueFromPointer(e);
  };

  private _handlePointerUp = (e: PointerEvent) => {
    if (!this._isDragging) return;
    
    this._isDragging = false;
    this._removePointerListeners();
    
    try {
      this.releasePointerCapture(e.pointerId);
    } catch (err) {
      // Ignore errors if pointer capture was already released
    }
  };

  private _removePointerListeners() {
    document.removeEventListener('pointermove', this._handlePointerMove);
    document.removeEventListener('pointerup', this._handlePointerUp);
  }

  private _updateValueFromPointer(e: PointerEvent) {
    const rect = this.getBoundingClientRect();
    const isHorizontal = this.orientation === 'horizontal';
    
    let percentage: number;
    if (isHorizontal) {
      const position = e.clientX - rect.left;
      percentage = (position / rect.width) * 100;
      if (this.inverted) {
        percentage = 100 - percentage;
      }
    } else {
      const position = e.clientY - rect.top;
      percentage = (position / rect.height) * 100;
      if (!this.inverted) {
        percentage = 100 - percentage;
      }
    }
    
    this.setValueFromPercentage(percentage);
  }

  private _updateState() {
    this.setAttribute('data-orientation', this.orientation);
    this.setAttribute('aria-valuenow', String(this.value));
    this.setAttribute('aria-valuemin', String(this.min));
    this.setAttribute('aria-valuemax', String(this.max));

    if (this.disabled) {
      this.setAttribute('data-disabled', '');
      this.setAttribute('aria-disabled', 'true');
      this.setAttribute('tabindex', '-1');
    } else {
      this.removeAttribute('data-disabled');
      this.removeAttribute('aria-disabled');
      this.setAttribute('tabindex', '0');
    }
  }

  private _notifyChange() {
    this.dispatchCustomEvent('value-change', { value: this.value });
  }

  private _updateChildComponents() {
    // Notify child components about value change
    const event = new CustomEvent('slider-value-change', {
      detail: { value: this.value, percentage: this.getPercentage() },
      bubbles: false,
      composed: false,
    });
    this.dispatchEvent(event);
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-slider': SliderElement;
  }
}
