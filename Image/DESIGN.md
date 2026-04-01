```markdown
# Design System Document

## 1. Overview & Creative North Star: "The Culinary Gallerist"

This design system is built to transform a standard utility—finding a recipe—into an editorial, high-end experience. Our Creative North Star is **"The Culinary Gallerist."** We treat food photography like fine art and the interface as the pristine, airy gallery space that hosts it. 

To move beyond the "template" look, this system rejects rigid, boxed grids in favor of **Intentional Asymmetry**. We utilize overlapping elements (e.g., a high-quality PNG of an ingredient breaking the bounds of a glass card) and a dramatic typographic scale to create a sense of movement. The goal is a "Fresh & Vibrant" atmosphere that feels high-velocity yet sophisticated.

---

## 2. Colors

The palette is anchored by the tension between the energetic `primary` (#AB3500/Orange) and the stabilizing `secondary` (#27657C/Teal). 

- **Primary (#AB3500):** Used for "Action Heat." It draws the eye to conversion points.
- **Secondary (#27657C):** Used for "Intellectual Depth." This is our anchor for navigation and secondary interactive elements.
- **Surface & Background (#F9F9F9):** Our "Soft Cream" canvas. It is warm, inviting, and prevents the "clinical" feel of pure white.

### The "No-Line" Rule
**Explicit Instruction:** 1px solid borders are prohibited for sectioning. We do not "box" content. Boundaries must be defined solely through background color shifts. For example, a recipe category section using `surface-container-low` should sit directly on a `surface` background. The change in tone is the divider.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of "Fine Paper" and "Frosted Glass." 
- **Base:** `surface`
- **Sectioning:** `surface-container-low` (#F3F3F3)
- **Interactive Cards:** `surface-container-lowest` (#FFFFFF) to create a soft, natural lift.

### The "Glass & Gradient" Rule
To achieve the "Fresh" aesthetic, use Glassmorphism for floating navigation bars or "Quick View" recipe overlays. Use `surface-container-lowest` at 70% opacity with a `backdrop-blur` of 12px. Main CTAs should utilize a subtle linear gradient from `primary` (#AB3500) to `primary-container` (#FF6B35) at a 135-degree angle to add "soul" and dimension.

---

## 3. Typography

Our typography balances the modern authority of **Plus Jakarta Sans** with the classic, editorial warmth of **Newsreader**.

- **Display & Headlines (Plus Jakarta Sans):** These are the "Voice" of the brand. Use `display-lg` (3.5rem) for hero titles with tight letter-spacing (-0.02em) to feel "cool" and modern.
- **Body & Titles (Newsreader):** The "Narrative." We use a serif font here to mimic high-end cookbooks. It signals quality and readability. `body-lg` (1rem) should be the default for recipe instructions to ensure an easy reading flow.
- **Labels (Plus Jakarta Sans):** Used for metadata (prep time, calorie count). These are kept small (`label-md`) and uppercase with increased tracking (+0.05em) for a functional, "pro-kitchen" feel.

---

## 4. Elevation & Depth

We avoid the "pasted-on" look of traditional material design by using **Tonal Layering**.

- **The Layering Principle:** Depth is achieved by stacking. Place a `surface-container-lowest` card on a `surface-container-low` section. This creates "soft lift" without visual clutter.
- **Ambient Shadows:** For "floating" elements like a FAB (Floating Action Button) or a Modal, use a shadow with a 24px blur and only 6% opacity. The shadow color must be a tinted version of `on-surface` (a deep, warm grey) rather than pure black.
- **The "Ghost Border" Fallback:** If a container requires more definition against a busy photograph, use a "Ghost Border": the `outline-variant` token at 15% opacity. Never use 100% opaque borders.
- **Glassmorphism:** Use `surface-variant` at 40% opacity with high blur for "Ingredient Tags" that sit directly on top of food photography.

---

## 5. Components

### Buttons
- **Primary:** Gradient (`primary` to `primary-container`), `xl` (1.5rem) rounded corners. Bold Plus Jakarta Sans text.
- **Secondary:** `surface-container-highest` background with `on-surface` text. No border.
- **Micro-interaction:** On hover, buttons should scale 1.02x with a "spring" easing.

### Cards (The Recipe Card)
- **Structure:** Forbid divider lines. Use `spacing-6` (2rem) of vertical whitespace to separate the image from the title. 
- **Style:** `surface-container-lowest` background, `lg` (1rem) rounded corners, and a 4% ambient shadow.
- **Image:** High-quality food photography should occupy the top 60% of the card, with a subtle inner-glow to prevent "flatness."

### Chips (Dietary Tags)
- Use `secondary-container` (#A8E2FD) with `on-secondary-container` (#28667D). 
- **Shape:** `full` (pill-shaped) to contrast against the `lg` cards.

### Input Fields
- **Search Bar:** Large, `surface-container-highest` background, `xl` roundedness. The cursor should be the `primary` color to provide a "pop" of energy.

### Relevant App Component: The "Chef’s Tray"
A persistent, bottom-docked glassmorphic bar (70% `surface`, blur 16px) where users can "drop" recipes they want to cook later. This uses `surface-container-lowest` icons with `primary` notifications.

---

## 6. Do’s and Don’ts

### Do:
- **Use "White Space" as a Tool:** Use `spacing-12` (4rem) between major sections to let the photography breathe.
- **Embrace Asymmetry:** Align text to the left while placing a featured ingredient image overlapping the right margin.
- **Keep it Soft:** Use the `lg` and `xl` roundedness tokens to maintain the "Inviting" persona.

### Don’t:
- **No Hard Lines:** Never use a solid 1px line to separate "Ingredients" from "Instructions." Use a subtle background shift to `surface-container-low`.
- **No Pure Black:** Always use `on-surface` (#1A1C1C) for text to keep the "Creamy" editorial feel.
- **No Crowding:** Do not place text directly over the "focal point" of a food image. Use a glassmorphic scrim if necessary.

---
**Director’s Note:** Remember, we are not just building a tool; we are building an appetite. Every interaction should feel as smooth and premium as a well-plated meal.```