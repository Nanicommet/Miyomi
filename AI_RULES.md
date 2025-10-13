# AI Rules and Tech Stack Guidelines

This document outlines the core technologies and best practices for developing and modifying the Miyomi application.

## Tech Stack Overview

*   **Framework:** Vue.js (used for interactive components within the static site).
*   **Static Site Generator:** Vitepress (for building the documentation and website).
*   **Language:** TypeScript (for type safety across the codebase).
*   **Styling:** Tailwind CSS, implemented via UnoCSS (for utility-first CSS).
*   **UI Components:** Custom Vue Single File Components (`.vue` files) and `@fmhy/components`.
*   **Icons:** UnoCSS icon presets (e.g., `i-mdi-`, `i-lucide:`) sourced from various Iconify JSON packs.
*   **State Management (Local):** `@vueuse/core` for reactive utilities and browser API integrations (e.g., local storage).
*   **Markdown Processing:** `markdown-it` with several plugins for enhanced content rendering (e.g., tabs, figures, image lazy loading).
*   **OpenGraph Image Generation:** `x-satori/vue` for dynamic generation of OpenGraph images.

## Library Usage Rules

To maintain consistency and leverage existing capabilities, please adhere to the following guidelines when making changes or adding new features:

*   **Vue.js:** All new interactive UI elements and components should be developed as Vue Single File Components (`.vue`).
*   **Vitepress:** Utilize Vitepress's features for content organization, routing, and static site generation. Content should primarily reside in Markdown files within the `docs/` directory.
*   **TypeScript:** Always use TypeScript for new `.ts` and `.vue` files to ensure type safety, improve code readability, and enhance maintainability.
*   **UnoCSS/Tailwind CSS:** Apply styling using UnoCSS utility classes directly in your templates. For more complex or reusable styles, use `@apply` directives within `<style scoped>` blocks in Vue components. Avoid writing raw CSS where Tailwind equivalents are available.
*   **UI Components:** Before creating new components, check if existing components in `docs/.vitepress/theme/components` or `@fmhy/components` can be reused or adapted. If a new component is necessary, create it in a new `.vue` file following existing patterns.
*   **Icons:** Use UnoCSS icon presets (e.g., `<span class="i-lucide:icon-name"></span>`) for all icons. If an icon from a new set is required, ensure its Iconify JSON pack is imported and configured in `docs/.vitepress/configs/emoji.ts`.
*   **State Management:** For client-side reactive state, especially when interacting with browser APIs like local storage, prefer utilities provided by `@vueuse/core`.
*   **Markdown Enhancements:** Leverage the `markdown-it` plugins configured in `docs/.vitepress/configs/shared.ts` for specific Markdown features (e.g., tabs, figures, image lazy loading, text alignment).
*   **OpenGraph Images:** If dynamic OpenGraph images are needed for new pages, ensure they integrate with the `x-satori/vue` setup defined in `docs/.vitepress/hooks/opengraph.ts`.