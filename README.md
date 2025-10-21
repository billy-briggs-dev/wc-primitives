# WC Primitives

A collection of headless Web Component Primitives built with Lit 3, inspired by Radix UI. Framework-agnostic, accessible, and fully customizable.

📚 **[View Documentation & Examples](https://billy-briggs-dev.github.io/wc-primitives/)**

## Features

- 🎨 **Headless** - No default styles, complete styling control
- ⚡ **Lit 3** - Built on modern web standards with Lit
- 🔧 **Framework Agnostic** - Works with React, Vue, Angular, Svelte, or vanilla JS
- ♿ **Accessible** - WAI-ARIA compliant with keyboard navigation
- 🪶 **Lightweight** - Minimal dependencies, tree-shakeable
- 🛠️ **Modern Tooling** - Vite, Vitest, TypeScript, ESLint

## Installation

```bash
npm install @wc-primitives/core
```

## Quick Start

### Using in HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <script type="module">
      import '@wc-primitives/core/accordion';
    </script>
  </head>
  <body>
    <wc-accordion type="single" collapsible>
      <wc-accordion-item value="item-1">
        <wc-accordion-trigger>Is it accessible?</wc-accordion-trigger>
        <wc-accordion-content>
          Yes! It adheres to WAI-ARIA design patterns.
        </wc-accordion-content>
      </wc-accordion-item>
    </wc-accordion>
  </body>
</html>
```

### Using in React

```jsx
import '@wc-primitives/core/accordion';

function App() {
  return (
    <wc-accordion type="single" collapsible>
      <wc-accordion-item value="item-1">
        <wc-accordion-trigger>Is it accessible?</wc-accordion-trigger>
        <wc-accordion-content>
          Yes! It adheres to WAI-ARIA design patterns.
        </wc-accordion-content>
      </wc-accordion-item>
    </wc-accordion>
  );
}
```

### Using in Vue

```vue
<template>
  <wc-accordion type="single" collapsible>
    <wc-accordion-item value="item-1">
      <wc-accordion-trigger>Is it accessible?</wc-accordion-trigger>
      <wc-accordion-content>
        Yes! It adheres to WAI-ARIA design patterns.
      </wc-accordion-content>
    </wc-accordion-item>
  </wc-accordion>
</template>

<script setup>
import '@wc-primitives/core/accordion';
</script>
```

## Components

### Accordion

A vertically stacked set of interactive headings that each reveal an associated section of content.

#### API Reference

**wc-accordion**
- `type`: `'single' | 'multiple'` - Whether one or multiple items can be open
- `collapsible`: `boolean` - Allow closing the open item in single mode
- `value`: `string` - Controlled open item(s)
- `disabled`: `boolean` - Disable the entire accordion
- `orientation`: `'horizontal' | 'vertical'` - Orientation of the accordion

**Events**
- `value-change` - Fires when open items change

## Utilities

Radix-style utility components for building accessible UI primitives.

### Visually Hidden

Hides content visually while keeping it accessible to screen readers.

```html
<button>
  <span>Close</span>
  <wc-visually-hidden>dialog</wc-visually-hidden>
</button>
```

**Use Cases:**
- Adding context for screen readers
- Skip links
- Accessible labels without visual clutter

### Accessible Icon

Makes icon-only buttons accessible by providing labels for screen readers.

```html
<button>
  <wc-accessible-icon label="Close dialog">
    <svg>...</svg>
  </wc-accessible-icon>
</button>
```

**Features:**
- Icons marked as `aria-hidden="true"`
- Label is visually hidden but accessible
- Proper focus management

### Direction Provider

Provides text direction context (LTR/RTL) to descendant components.

```html
<wc-direction-provider dir="rtl">
  <div>محتوى باللغة العربية</div>
</wc-direction-provider>
```

**API:**
- `dir`: `'ltr' | 'rtl'` - Text direction
- Helper function `getDirection(element)` to query direction from any element

### Portal

Renders content in a different part of the DOM tree.

```html
<wc-portal container="#portal-root">
  <div>Content rendered elsewhere</div>
</wc-portal>
```

**Use Cases:**
- Modals that need to escape overflow containers
- Popovers and tooltips
- Full-screen overlays

**API:**
- `container`: CSS selector for portal destination (defaults to `document.body`)
- `disabled`: Render content in place when true

### Slot

Merges props onto its immediate child element.

```html
<wc-slot asChild data-custom="value" class="merged-class">
  <button>Custom button</button>
</wc-slot>
```

**API:**
- `asChild`: Enable prop merging when true
- Merges data attributes, ARIA attributes, and classes to child

### Dialog

A modal dialog that overlays content and traps focus within it.

#### API Reference

**wc-dialog**
- `open`: `boolean` - The controlled open state of the dialog
- `modal`: `boolean` - When true (default), clicking outside or pressing escape closes the dialog
- `disabled`: `boolean` - Disable the dialog

**Events**
- `open-change` - Fires when the open state changes

### Alert Dialog

A modal dialog that interrupts the user with important content and expects a response. Unlike regular dialogs, alert dialogs cannot be dismissed by clicking outside or pressing Escape, requiring explicit user action.

#### API Reference

**wc-alert-dialog**
- `open`: `boolean` - The controlled open state of the alert dialog
- `disabled`: `boolean` - Disable the alert dialog

**Events**
- `open-change` - Fires when the open state changes

**Components**
- `wc-alert-dialog-trigger` - Button that opens the alert dialog
- `wc-alert-dialog-portal` - Portal for rendering overlay and content
- `wc-alert-dialog-overlay` - Backdrop layer (clicking does not close)
- `wc-alert-dialog-content` - Content container with focus trap
- `wc-alert-dialog-title` - Title element (used for aria-labelledby)
- `wc-alert-dialog-description` - Description element (used for aria-describedby)
- `wc-alert-dialog-action` - Primary action button (e.g., "Delete", "Confirm")
- `wc-alert-dialog-cancel` - Cancel button

### Tabs

A set of layered sections of content (tab panels) that are displayed one at a time.

#### API Reference

**wc-tabs**
- `value`: `string` - The controlled active tab value
- `disabled`: `boolean` - Disable the entire tabs component
- `orientation`: `'horizontal' | 'vertical'` - Orientation of the tabs

**Events**
- `value-change` - Fires when the active tab changes

### Toggle

A two-state button that can be toggled on or off.

#### API Reference

**wc-toggle**
- `pressed`: `boolean` - The pressed state of the toggle
- `disabled`: `boolean` - Disable the toggle

**Events**
- `pressed-change` - Fires when the pressed state changes

### Tooltip

A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.

#### API Reference

**wc-tooltip**
- `open`: `boolean` - The controlled open state of the tooltip
- `disabled`: `boolean` - Disable the tooltip
- `delayDuration`: `number` - The delay in milliseconds before showing the tooltip (default: 700)

### Popover

A non-modal dialog that floats near a trigger element, allowing interaction with the rest of the page.

#### API Reference

**wc-popover**
- `open`: `boolean` - The controlled open state of the popover
- `modal`: `boolean` - When true, clicking outside closes the popover
- `disabled`: `boolean` - Disable the entire popover

**wc-popover-content**
- `side`: `'top' | 'right' | 'bottom' | 'left'` - Position relative to trigger (default: 'bottom')
- `align`: `'start' | 'center' | 'end'` - Alignment relative to trigger (default: 'center')

**Events**
- `open-change` - Fires when the open state changes


### Toolbar

A container for grouping a set of controls, such as buttons, toggle buttons, or dropdown menus.

#### API Reference

**wc-toolbar**
- `orientation`: `'horizontal' | 'vertical'` - The orientation of the toolbar
- `disabled`: `boolean` - Disable the entire toolbar
- `roving-tabindex`: `boolean` - Enable roving tab index for keyboard navigation (default: true)

**wc-toolbar-button**
- A button element within a toolbar
- `disabled`: `boolean` - Disable the button

**wc-toolbar-separator**
- A visual separator between toolbar items
- `orientation`: `'horizontal' | 'vertical'` - The orientation of the separator

**wc-toolbar-toggle-group**
- A set of toggle buttons within a toolbar
- `type`: `'single' | 'multiple'` - Whether one or multiple items can be active
- `value`: `string` - The controlled value(s) of the toggle group
- `disabled`: `boolean` - Disable the toggle group

**wc-toolbar-toggle-item**
- An individual toggle button within a toolbar toggle group
- `value`: `string` - The value of this toggle item
- `disabled`: `boolean` - Disable the toggle item

**Events**
- `value-change` - Fires when the active toggle item(s) change (on wc-toolbar-toggle-group)

### Separator

A visual or semantic separator between content sections.

#### API Reference

**wc-separator**
- `orientation`: `'horizontal' | 'vertical'` - The orientation of the separator (default: 'horizontal')
- `decorative`: `boolean` - Whether the separator is purely decorative (default: false)

**Example:**
```html
<div>Section 1</div>
<wc-separator></wc-separator>
<div>Section 2</div>
```

### Scroll Area

A scrollable area with custom styled scrollbars.

#### API Reference

**wc-scroll-area**
- `type`: `'auto' | 'always' | 'scroll' | 'hover'` - When to show scrollbars (default: 'hover')
- `scroll-hide-delay`: `number` - Delay in ms before hiding scrollbars (default: 600)

**wc-scroll-area-viewport**
- Contains the scrollable content

**wc-scroll-area-scrollbar**
- `orientation`: `'horizontal' | 'vertical'` - Scrollbar orientation (default: 'vertical')

**wc-scroll-area-thumb**
- The draggable thumb of the scrollbar

**wc-scroll-area-corner**
- Corner element between horizontal and vertical scrollbars

**Events**
- `scroll` - Fires when the viewport is scrolled

**Example:**
```html
<wc-scroll-area>
  <wc-scroll-area-viewport>
    <div>Long scrollable content...</div>
  </wc-scroll-area-viewport>
  <wc-scroll-area-scrollbar orientation="vertical">
    <wc-scroll-area-thumb></wc-scroll-area-thumb>
  </wc-scroll-area-scrollbar>
  <wc-scroll-area-scrollbar orientation="horizontal">
    <wc-scroll-area-thumb></wc-scroll-area-thumb>
  </wc-scroll-area-scrollbar>
  <wc-scroll-area-corner></wc-scroll-area-corner>
</wc-scroll-area>
```

### Select

A dropdown select component for choosing from a list of options.

#### API Reference

**wc-select**
- `value`: `string` - The selected value
- `open`: `boolean` - The open state of the dropdown
- `disabled`: `boolean` - Disable the select
- `required`: `boolean` - Whether selection is required
- `name`: `string` - Name for form submission

**wc-select-trigger**
- The button that opens the select

**wc-select-value**
- `placeholder`: `string` - Placeholder text when no value selected

**wc-select-icon**
- Optional icon (typically a chevron)

**wc-select-content**
- `side`: `'top' | 'right' | 'bottom' | 'left'` - Preferred side (default: 'bottom')
- `align`: `'start' | 'center' | 'end'` - Alignment (default: 'start')

**wc-select-viewport**
- Scrollable container for items

**wc-select-item**
- `value`: `string` - The item value
- `disabled`: `boolean` - Disable the item

**wc-select-group**
- Groups related items

**wc-select-label**
- Label for a group

**Events**
- `value-change` - Fires when selected value changes
- `open-change` - Fires when open state changes

**Example:**
```html
<wc-select value="apple">
  <wc-select-trigger>
    <wc-select-value placeholder="Select a fruit..."></wc-select-value>
  </wc-select-trigger>
  <wc-select-portal>
    <wc-select-content>
      <wc-select-viewport>
        <wc-select-item value="apple">Apple</wc-select-item>
        <wc-select-item value="banana">Banana</wc-select-item>
        <wc-select-item value="orange">Orange</wc-select-item>
      </wc-select-viewport>
    </wc-select-content>
  </wc-select-portal>
</wc-select>
```

## Styling

All components are headless and come with no default styles. You have complete control over the appearance using CSS:

```css
wc-accordion {
  border: 1px solid #e5e5e5;
  border-radius: 8px;
}

wc-accordion-trigger {
  padding: 1rem;
  cursor: pointer;
}

wc-accordion-trigger:hover {
  background: #f5f5f5;
}

wc-accordion-content {
  padding: 1rem;
}
```

Use data attributes for state-based styling:

```css
wc-accordion-trigger[data-state='open'] {
  /* Styles for open state */
}

wc-accordion-trigger[data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Lint code
npm run lint

# Type check
npm run typecheck

# Start Storybook
npm run storybook

# Build Storybook for deployment
npm run build-storybook
```

## Architecture

- **Headless Design**: Components provide behavior and accessibility without styles
- **Lit 3**: Leverages Lit's reactive properties and lifecycle
- **No Shadow DOM**: Uses light DOM for easier styling
- **Composable**: Components work together to create complex patterns
- **Accessible**: Follows WAI-ARIA patterns with proper ARIA attributes and keyboard support

## Browser Support

Works in all modern browsers that support:
- ES2021
- Custom Elements v1
- ES Modules

## License

MIT

## Credits

Inspired by [Radix UI](https://www.radix-ui.com/)
