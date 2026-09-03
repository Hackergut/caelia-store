# Motion tokens (Emil Kowalski philosophy)

All motion in CAELIA follows Emil Kowalski''s animation framework. Tokens live in `src/app/globals.css`; never invent new curves.

## Curves

| Token | Curve | When |
| --- | --- | --- |
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | Entrances, press release, color, opacity |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | On-screen morph, panning |
| `--ease-drawer` | `cubic-bezier(0.32, 0.72, 0, 1)` | Cart drawer, sheets, modals |
| `--ease-spring-out` | `cubic-bezier(0.16, 1.08, 0.38, 1)` | Toasts, marketing moments (mild overshoot) |

Built-in CSS easings are too weak — never use `ease`, `ease-in`, `ease-in-out` or `linear` for UI.

## Durations

UI stays under 300ms.

| Token | Duration | Use |
| --- | --- | --- |
| `--dur-instant` | 100ms | Color, opacity, micro hover |
| `--dur-fast` | 160ms | Button press, checkbox |
| `--dur-base` | 220ms | Buttons, small popovers |
| `--dur-medium` | 320ms | Dropdowns, drawers (exit), tooltips |
| `--dur-slow` | 480ms | Modals, drawers (entry), reveals |

## Utility classes

| Class | What it does |
| --- | --- |
| `.btn-press` | Press feedback `transform: scale(0.97)` on `:active`, instant. Touch devices use opacity instead. |
| `.lift` | Hover lift `translateY(-2px)` (gated). |
| `.lift-strong` | Hover lift `translateY(-4px)` (gated). |
| `.media-zoom` | Inner image scales `1.04` on parent hover (gated). |
| `.chip` | Border lift on hover (gated). |
| `.reveal` | Mount fade-in with stagger. Author with `style={{ "--i": index }}`. |
| `.drawer-enter[-active]` / `.drawer-exit-active` | Cart drawer iOS-style. |
| `.modal-enter[-active]` / `.modal-exit-active` | Centered modal scale from 0.97. |
| `.toast-enter[-active]` | Toast slide + fade from bottom with `--ease-spring-out`. |
| `.nav-link` | Underline scale-X on hover, `--ease-out`, gated. |

## Hard rules

1. **No `transition: all`** — name exact properties.
2. **No `transform: scale(0)`** for entrances — use `0.95–0.97` + opacity.
3. **No `ease-in` on UI** — only ease-out or a strong curve.
4. **No animating `width`/`height`/`margin`/`padding`/`top`/`left`** — use `transform` / `opacity` only.
5. **No ungated `:hover` motion** — wrap in `@media (hover: hover) and (pointer: fine)`.
6. **Reduced motion is gentler, not zero** — keep color/opacity feedback, drop motion-based reveals.
7. **Transitions (not keyframes) for toasts/toggles/rapidly-fired elements** — retarget from current value.

## Apple-style response rules

- Press feedback fires on `:active`, not on release.
- Drawers enter and exit on the same path (iOS Ionic curve).
- No locking input during transitions.
- Stagger grids at 60ms per item — never reveal everything together.

## Where the principles came from

- `emil-design-eng/SKILL.md` — philosophy, review format, decision framework.
- `animate/SKILL.md` — the build sequence (frequency → purpose → tool → props → curve → duration).
- `apple-design/SKILL.md` — response, direct manipulation, interruptibility, springs.