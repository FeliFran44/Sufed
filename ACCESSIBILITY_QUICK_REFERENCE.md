# SUFED Website - Accessibility Quick Reference

## Quick Checklist for Content Editors

### ✅ When Adding Images
```html
<!-- ✅ GOOD: Descriptive alt text -->
<img src="event.jpg" alt="Webinar sobre manejo del dolor crónico">

<!-- ❌ BAD: Missing or generic alt text -->
<img src="event.jpg" alt="image">
<img src="event.jpg">
```

### ✅ When Adding Headings
```html
<!-- ✅ GOOD: Proper hierarchy -->
<h2>Educación</h2>
  <h3>Guías de Práctica Clínica</h3>
    <h4>NICE Guidelines</h4>

<!-- ❌ BAD: Skipping levels -->
<h2>Educación</h2>
  <h4>NICE Guidelines</h4>  <!-- Skipped H3 -->
```

### ✅ When Adding Links
```html
<!-- ✅ GOOD: Descriptive link text -->
<a href="guias.pdf">Descargar guías NICE sobre dolor lumbar</a>

<!-- ❌ BAD: Generic link text -->
<a href="guias.pdf">Haz clic aquí</a>
<a href="guias.pdf">Leer más</a>
```

### ✅ When Adding Buttons
```html
<!-- ✅ GOOD: Clear purpose -->
<button aria-label="Descargar guías NICE">
  <svg aria-hidden="true">...</svg>
  Descargar
</button>

<!-- ❌ BAD: Icon-only without label -->
<button>
  <svg>...</svg>
</button>
```

### ✅ When Adding Forms
```html
<!-- ✅ GOOD: Proper labels and ARIA -->
<label for="email">Correo electrónico *</label>
<input type="email" 
       id="email" 
       required
       aria-required="true"
       aria-describedby="email-error">
<span id="email-error" role="alert" aria-live="polite"></span>

<!-- ❌ BAD: Missing label -->
<input type="email" placeholder="Email">
```

---

## Keyboard Navigation Guide

### Essential Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Move to next interactive element |
| `Shift + Tab` | Move to previous interactive element |
| `Enter` | Activate link or button |
| `Space` | Activate button or checkbox |
| `Escape` | Close modal or dropdown |
| `Arrow Keys` | Navigate within dropdown menus |

### Testing Your Changes

1. **Keyboard Test:** Can you reach everything with Tab?
2. **Focus Test:** Is the focus indicator clearly visible?
3. **Screen Reader Test:** Does it make sense when read aloud?
4. **Zoom Test:** Does it work at 200% zoom?

---

## Color Contrast Requirements

### Minimum Contrast Ratios (WCAG AA)

- **Normal text:** 4.5:1
- **Large text (18pt+):** 3:1
- **UI components:** 3:1

### Approved Color Combinations

✅ **Safe to use:**
- Dark text (#212121) on white background
- White text on primary blue (#1976D2)
- White text on accent teal (#009688)
- Primary blue (#2196F3) on white background

❌ **Avoid:**
- Light gray text on white background
- Yellow text on white background
- Light blue on white background

### Check Your Colors
Use: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## Common Accessibility Mistakes to Avoid

### ❌ Don't Do This

1. **Using color alone to convey information**
   ```html
   <!-- BAD: Only color indicates error -->
   <span style="color: red;">Error</span>
   
   <!-- GOOD: Icon + text + color -->
   <span class="error">
     <svg aria-hidden="true">❌</svg>
     Error: Campo requerido
   </span>
   ```

2. **Empty links or buttons**
   ```html
   <!-- BAD -->
   <a href="#"></a>
   <button></button>
   
   <!-- GOOD -->
   <a href="#section">Ver más información</a>
   <button aria-label="Cerrar">×</button>
   ```

3. **Placeholder as label**
   ```html
   <!-- BAD -->
   <input type="text" placeholder="Nombre">
   
   <!-- GOOD -->
   <label for="name">Nombre</label>
   <input type="text" id="name" placeholder="Ej: Juan Pérez">
   ```

4. **Opening links in new tab without warning**
   ```html
   <!-- BAD -->
   <a href="external.com" target="_blank">Link</a>
   
   <!-- GOOD -->
   <a href="external.com" target="_blank" rel="noopener">
     Link externo (abre en nueva pestaña)
   </a>
   ```

---

## ARIA Attributes Quick Reference

### Common ARIA Attributes

| Attribute | Use Case | Example |
|-----------|----------|---------|
| `aria-label` | Label for elements without visible text | `<button aria-label="Cerrar">×</button>` |
| `aria-labelledby` | Reference to element that labels this one | `<div aria-labelledby="title">` |
| `aria-describedby` | Reference to element that describes this one | `<input aria-describedby="hint">` |
| `aria-hidden` | Hide decorative elements from screen readers | `<svg aria-hidden="true">` |
| `aria-expanded` | Indicates if element is expanded | `<button aria-expanded="false">` |
| `aria-live` | Announces dynamic content changes | `<div aria-live="polite">` |
| `aria-required` | Indicates required form field | `<input aria-required="true">` |

### When to Use ARIA

✅ **Use ARIA when:**
- Adding labels to icon-only buttons
- Indicating required form fields
- Announcing dynamic content changes
- Hiding decorative images from screen readers

❌ **Don't use ARIA when:**
- Native HTML element exists (use `<button>` not `<div role="button">`)
- Element already has visible label
- You're not sure what it does (ask first!)

---

## Testing Tools

### Browser Extensions
- **axe DevTools** - Automated accessibility testing
- **WAVE** - Visual accessibility evaluation
- **Lighthouse** - Built into Chrome DevTools

### Screen Readers
- **NVDA** (Windows) - Free
- **JAWS** (Windows) - Commercial
- **VoiceOver** (Mac) - Built-in

### Quick Test Commands

```bash
# Run Lighthouse accessibility audit
# Chrome DevTools > Lighthouse > Accessibility

# Check HTML validity
# https://validator.w3.org/

# Check contrast ratios
# https://webaim.org/resources/contrastchecker/
```

---

## Need Help?

### Questions?
- Check `ACCESSIBILITY_COMPLIANCE.md` for detailed documentation
- Review existing code for examples
- Ask the development team

### Found an Issue?
1. Document the issue (what, where, how to reproduce)
2. Check if it affects keyboard or screen reader users
3. Report to development team with priority level

---

## Resources

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Articles](https://webaim.org/articles/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

---

**Remember:** Accessibility benefits everyone, not just users with disabilities. Clear labels, good contrast, and keyboard navigation make the site better for all users!
