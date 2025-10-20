# Radix Primitives Utilities Implementation

## Overview
This implementation adds five essential Radix-style utility components to the WC Primitives library. These utilities provide foundational building blocks for creating accessible, composable UI primitives.

## Utilities Implemented

### 1. Visually Hidden (`wc-visually-hidden`)
**Purpose**: Hides content visually while keeping it accessible to screen readers.

**Key Features**:
- Uses modern CSS techniques (`clip-path` instead of deprecated `clip`)
- Applied styles directly to element for maximum efficiency
- Perfect for skip links and additional screen reader context

**Use Cases**:
```html
<button>
  <span>Close</span>
  <wc-visually-hidden>dialog</wc-visually-hidden>
</button>
```

### 2. Accessible Icon (`wc-accessible-icon`)
**Purpose**: Makes icon-only buttons accessible by providing labels for screen readers.

**Key Features**:
- Automatically marks icons as `aria-hidden="true"` and `focusable="false"`
- Provides visually hidden label for screen readers
- Optimized to only setup once on first render
- Works with any icon format (SVG, font icons, etc.)

**Use Cases**:
```html
<button>
  <wc-accessible-icon label="Close dialog">
    <svg>...</svg>
  </wc-accessible-icon>
</button>
```

### 3. Direction Provider (`wc-direction-provider`)
**Purpose**: Provides text direction context (LTR/RTL) to descendant components.

**Key Features**:
- Supports both LTR and RTL text directions
- Uses Lit's `reflect: true` for efficient attribute syncing
- Includes helper function `getDirection(element)` to query direction from any element
- Dispatches `direction-change` events for reactive updates

**Use Cases**:
```html
<wc-direction-provider dir="rtl">
  <div>محتوى باللغة العربية</div>
</wc-direction-provider>
```

### 4. Portal (`wc-portal`)
**Purpose**: Renders content in a different part of the DOM tree.

**Key Features**:
- Moves actual DOM nodes (not clones) to preserve event handlers and state
- Supports custom container via CSS selector (defaults to `document.body`)
- Can be disabled to render content in place
- Properly restores content when disabled or disconnected
- Works correctly with light DOM architecture

**Use Cases**:
```html
<wc-portal container="#portal-root">
  <div>Modal content</div>
</wc-portal>
```

**Common Applications**:
- Modals and dialogs that need to escape overflow containers
- Popovers and tooltips positioned relative to viewport
- Full-screen overlays

### 5. Slot (`wc-slot`)
**Purpose**: Merges props from parent to immediate child element.

**Key Features**:
- Uses MutationObserver for light DOM compatibility
- Merges data attributes, ARIA attributes, and class names
- Controlled by `asChild` property
- Enables polymorphic component patterns

**Use Cases**:
```html
<wc-slot asChild data-custom="value" class="merged-class">
  <button>Custom button</button>
</wc-slot>
```

## Technical Implementation Details

### Light DOM Architecture
All utilities follow the established pattern of using light DOM (no shadow DOM) by returning `this` from `createRenderRoot()`. This provides:
- Full styling control for consumers
- Better compatibility with frameworks
- Easier debugging and inspection
- No shadow DOM piercing needed

### Code Review Improvements
The implementation went through a thorough code review process, resulting in several important fixes:

1. **Visually Hidden**: Changed from deprecated `clip` to modern `clip-path: inset(50%)`
2. **Direction Provider**: Removed redundant `setAttribute` call since `reflect: true` handles it
3. **Accessible Icon**: Optimized to only run setup once on `firstUpdated` instead of every `updated`
4. **Slot**: Fixed to work with light DOM using MutationObserver instead of shadow DOM's `slotchange` event
5. **Portal**: Fixed to move nodes instead of cloning them, preserving event handlers and state

### Testing
Comprehensive test suite with 20 tests covering:
- Component rendering and initialization
- Style application (Visually Hidden)
- Accessibility attributes (Accessible Icon)
- Direction detection and propagation (Direction Provider)
- Portal rendering and container targeting (Portal)
- Prop merging behavior (Slot)
- Property defaults and configurations

All tests pass with 100% success rate.

### Security
CodeQL security scan completed with **0 vulnerabilities** found. The implementation follows secure coding practices:
- No use of `innerHTML` or `eval`
- Proper event handling
- No deprecated APIs
- TypeScript strict mode enabled
- Proper null/undefined handling

## File Structure

```
src/utilities/
├── index.ts                    # Module exports
├── visually-hidden.ts          # Visually Hidden component
├── accessible-icon.ts          # Accessible Icon component
├── direction-provider.ts       # Direction Provider component + helper
├── portal.ts                   # Portal component
├── slot.ts                     # Slot component
└── utilities.spec.ts           # Test suite (20 tests)

demo/
└── utilities.html              # Interactive demo page

dist/utilities/                 # Build output
├── *.js                        # Compiled JavaScript
├── *.d.ts                      # TypeScript declarations
└── *.js.map                    # Source maps
```

## Package Exports
Added new export path to package.json:
```json
"./utilities": {
  "types": "./dist/utilities/index.d.ts",
  "default": "./dist/utilities/index.js"
}
```

## Usage Examples

### Import all utilities
```javascript
import '@wc-primitives/core/utilities';
```

### Import specific utilities
```javascript
import { VisuallyHiddenElement } from '@wc-primitives/core';
import { getDirection } from '@wc-primitives/core';
```

### Framework examples

**React:**
```jsx
import '@wc-primitives/core/utilities';

function App() {
  return (
    <button>
      <wc-accessible-icon label="Close">
        <XIcon />
      </wc-accessible-icon>
    </button>
  );
}
```

**Vue:**
```vue
<template>
  <wc-direction-provider dir="rtl">
    <p>{{ content }}</p>
  </wc-direction-provider>
</template>

<script setup>
import '@wc-primitives/core/utilities';
</script>
```

## Documentation Updates
- Updated README.md with utilities documentation
- Updated IMPLEMENTATION_SUMMARY.md with complete implementation details
- Created interactive demo page (demo/utilities.html)
- All components include comprehensive JSDoc comments

## Build Output
Total utilities size (minified + gzipped): ~4KB
- visually-hidden: ~0.5KB
- accessible-icon: ~0.7KB  
- direction-provider: ~0.7KB
- portal: ~0.9KB
- slot: ~0.8KB

## Future Enhancements
These utilities provide a solid foundation for building more complex Radix-style primitives like:
- Dialog/Modal (using Portal)
- Dropdown Menu (using Portal and Direction Provider)
- Tooltip (using Portal and Visually Hidden)
- Select (using Accessible Icon and Slot)
- And more...

## Conclusion
All five Radix primitives utilities have been successfully implemented with:
✅ Clean, maintainable code following established patterns
✅ Comprehensive test coverage (20 tests)
✅ Full documentation
✅ Interactive demo page
✅ Zero security vulnerabilities
✅ Code review feedback addressed
✅ Light DOM compatibility
✅ Framework-agnostic design
✅ TypeScript type definitions
✅ Production-ready build output
