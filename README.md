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
