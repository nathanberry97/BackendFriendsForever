# BFF Architecture

## What is a Backend-for-Frontend?

A Backend-for-Frontend (BFF) is a dedicated backend service that sits between the frontend (web, iOS, or Android) and downstream APIs. Rather than the client calling multiple services directly and assembling data itself, the BFF orchestrates those calls, aggregates the results, and returns a single tailored response.

This project uses the BFF pattern to demonstrate how a GOV.UK-style account home page can pull data from multiple government department APIs (HMRC, DVLA, DWP) without the client needing to know anything about those departments or their APIs.

## Why This Matters for Mobile

This PoC uses a React web frontend to illustrate the pattern, but the architecture is designed with **native mobile apps (iOS and Android) as the primary beneficiary**. The same BFF endpoint that drives this web demo would serve your native apps identically — a single JSON response describing what to render, with all orchestration and business logic kept server-side.

For mobile teams, this pattern is especially powerful because:

- **No app store release required** when departments change — the BFF controls what appears on screen
- **Reduced client complexity** — your Swift/Kotlin code becomes a rendering layer, not an orchestration layer
- **Consistent behaviour across platforms** — iOS, Android, and web all receive the same server-driven UI payload, rendered with platform-native components
- **Offline-friendly** — the single-response payload is easy to cache as a whole, rather than caching N separate API calls

## System Architecture

```
┌─────────────────┐
│  iOS App        │──┐
│ (Swift/UIKit)   │  │
└─────────────────┘  │
                     │      ┌──────────────────┐         ┌─────────────────┐
┌─────────────────┐  ├─────▶│   bff-service    │────────▶│ Department APIs │
│  Android App    │──┤single│  (Express BFF)   │ parallel│  (HMRC, DVLA,   │
│ (Kotlin/Jetpack)│  │ req  │  port 4000       │  fetch  │   DWP, etc.)    │
└─────────────────┘  │      └──────────────────┘         └─────────────────┘
                     │               │
┌─────────────────┐  │               ▼
│  web-frontend   │──┘      Assembles server-driven
│  (React/Vite)   │         UI component payload
└─────────────────┘
```

Each client — whether iOS, Android, or web — makes **one request** to the BFF. The BFF fetches the user's profile, determines which departments they have linked, calls each department API in parallel, and returns a **server-driven UI payload** describing what to render.

> **Note for mobile devs:** This PoC implements the web client in React to keep the demo self-contained and easy to run locally. The React frontend plays the exact same role your native app would: receive the component list, map types to native views, and render. The BFF response is platform-agnostic JSON — no web-specific concepts leak into it.

## Server-Driven UI

The core idea is that the BFF doesn't return raw data for the frontend to interpret. Instead, it returns a **declarative list of UI components** with their props already populated:

```json
{
  "user": { "citizenId": "cit-001", "name": "Alice Thompson" },
  "components": [
    { "type": "GOV_HEADER", "props": { "name": "Alice Thompson" } },
    { "type": "HMRC_TAX_CARD", "props": { "incomeTax": { ... }, "taxCodes": [...] } },
    { "type": "DVLA_VEHICLE_CARD", "props": { "vehicles": [...], "licence": { ... } } },
    { "type": "LINK_PROMPT_BANNER", "props": { "department": "DWP", "message": "..." } }
  ]
}
```

The client app is a **dumb renderer**. It iterates the `components` array, maps each `type` to a platform-native view, and populates it with the `props`. It has no business logic about which departments exist or what data they provide.

The same pattern applies across all platforms:

**React (this PoC):**
```tsx
const COMPONENT_MAP = {
  GOV_HEADER: GovHeader,
  HMRC_TAX_CARD: HmrcTaxCard,
  DVLA_VEHICLE_CARD: DvlaVehicleCard,
};

components.map(comp => {
  const Component = COMPONENT_MAP[comp.type];
  if (!Component) return null;
  return <Component {...comp.props} />;
});
```

**Swift (iOS equivalent):**
```swift
func view(for component: UIComponent) -> some View {
    switch component.type {
    case "GOV_HEADER":       GovHeaderView(props: component.props)
    case "HMRC_TAX_CARD":    HmrcTaxCardView(props: component.props)
    case "DVLA_VEHICLE_CARD": DvlaVehicleCardView(props: component.props)
    default:                  EmptyView() // unknown types silently skipped
    }
}
```

**Kotlin (Android equivalent):**
```kotlin
@Composable
fun ComponentRenderer(component: UIComponent) {
    when (component.type) {
        "GOV_HEADER"        -> GovHeader(component.props)
        "HMRC_TAX_CARD"     -> HmrcTaxCard(component.props)
        "DVLA_VEHICLE_CARD" -> DvlaVehicleCard(component.props)
        else                -> {} // unknown types silently skipped
    }
}
```

The implementation language changes, but the pattern is identical: a type-to-view lookup with a no-op fallback for unrecognised types.

## How This Enables Multi-Department Scaling

The critical design property: **departments can be added without changing the client's logic or pushing an app store update** (beyond registering a new presentational view).

### The Problem Without a BFF

In a traditional client-driven architecture — especially on mobile — adding a new department means:

1. The app needs a new API client for the department
2. The app needs conditional logic to decide when to show/hide the department section
3. The app needs to understand the department's data format and transform it for display
4. Every department team's changes require coordinating a mobile release
5. **An app store submission and review cycle** blocks every backend change from reaching users
6. The app becomes a bottleneck and grows increasingly complex with each new department

For mobile teams this is particularly painful: a server-side change that should be invisible to the client (e.g. HMRC adds a new field) can force a coordinated iOS + Android release just to update parsing logic.

### How the BFF Solves This

With the BFF + server-driven UI approach:

| Concern | Who Owns It |
|---------|-------------|
| Which departments to call | BFF |
| Whether a user has linked a department | BFF (via user profile) |
| What order components appear in | BFF |
| What data goes into each component | BFF |
| Conditional logic (show card vs. link prompt) | BFF |
| Rendering a component given a type and props | Client (iOS / Android / Web) |

The mobile app is reduced to a **rendering engine**. All orchestration, business rules, and composition decisions live in the BFF — and can be updated without an app release.

### Adding a New Department

Suppose a new department (e.g. NHS) wants to appear on the account home page.

**Backend changes (owned by the platform/department team — no app release needed):**

1. **Department API** — The NHS team builds and hosts their own API
2. **Shared types** — Add `'NHS'` to the `Department` type and `'NHS_HEALTH_CARD'` to `UIComponentType`
3. **BFF api-client** — Add a `fetchNHS()` function
4. **BFF assembly** — Add NHS to the department loop: push an `NHS_HEALTH_CARD` component when linked, or a `LINK_PROMPT_BANNER` when not

**Mobile app changes (minimal, mechanical — one small release):**

5. **Native view** — Create `NhsHealthCardView` (a pure display component in SwiftUI / Jetpack Compose)
6. **Component map** — Add one entry: `"NHS_HEALTH_CARD" -> NhsHealthCardView`

**What does NOT change:**

- The app's networking layer — still makes one BFF call and passes components through
- The renderer logic — still iterates whatever the BFF sends
- Any existing department views — completely untouched
- The data-fetching pattern — still a single endpoint

**The key insight for mobile:** Steps 1–4 go live the moment they're deployed server-side. If the mobile app doesn't yet recognise `NHS_HEALTH_CARD`, it simply skips it (graceful degradation). When the app update with step 5–6 ships, the NHS card appears — no coordinated "big bang" release required.

### Independent Team Delivery

This separation means:

- **Department teams** can develop their API independently. As long as they provide data in the shape the BFF expects, they don't need to coordinate with the mobile teams.
- **The BFF team** can onboard new departments by wiring in API calls and assembly rules. They control the screen composition without touching the apps.
- **The iOS and Android teams** only need to build new native views when a genuinely new visual pattern is needed. They don't need to understand department business rules.
- **Deployment independence** — The BFF can start including a new department's card in its response as soon as the department API is ready. The mobile apps only need an update if the component type is brand new and not yet registered — and even then, existing users on older versions simply won't see the new card (not a crash).

### How This Compares to What Mobile Devs Already Know

If you've worked with server-driven UI patterns before, this will feel familiar:

| Pattern | Where you've seen it |
|---------|---------------------|
| Server returns a list of typed components | Spotify home feed, Airbnb Lona, Shopify's server-driven UI |
| Client maps type strings to native views | SwiftUI's `ViewBuilder` pattern, Jetpack Compose `when` blocks |
| Unknown types are no-ops | Feature flags without client-side flag logic |
| Single API call returns everything for a screen | GraphQL BFF, Apollo Federation |

The BFF is doing what your app currently does in the networking/viewmodel layer — but server-side, where changes deploy instantly without app review cycles.

## Forward Compatibility

Every client returns a no-op for unknown component types:

```swift
default: EmptyView()  // iOS
```
```kotlin
else -> {}  // Android
```
```tsx
if (!Component) return null;  // Web
```

This means:

- A newer BFF can send component types that an older app version doesn't recognise yet — they're silently skipped rather than crashing
- The BFF and mobile apps can be deployed on completely different cadences without breaking each other
- Feature flags and gradual rollouts become a BFF concern (just stop including the component in the response), not a client concern — no need to ship flag logic in the app binary
- **Version skew is safe by default** — users who haven't updated their app simply see fewer cards, never a broken screen

## Contract

The formal contract between the BFF and any client (iOS, Android, or web) is the `BFFLayoutResponse` — a simple JSON structure defined in `packages/shared-types`:

```typescript
interface UIComponent {
  type: UIComponentType;
  props: Record<string, any>;
}

interface BFFLayoutResponse {
  user: { citizenId: string; name: string };
  components: UIComponent[];
}
```

This contract is intentionally thin and platform-agnostic. The `type` field is the discriminator. The `props` shape is an implicit contract between each specific component type and its corresponding native view. This keeps the shared schema simple while allowing each department to define its own data shape.

For mobile teams, this means you'd model the same structure in your platform's idioms:

```swift
// iOS
struct UIComponent: Decodable {
    let type: String
    let props: [String: AnyCodable]
}

struct BFFLayoutResponse: Decodable {
    let user: User
    let components: [UIComponent]
}
```

```kotlin
// Android
@Serializable
data class UIComponent(val type: String, val props: JsonObject)

@Serializable
data class BFFLayoutResponse(val user: User, val components: List<UIComponent>)
```

## Summary

The BFF architecture turns iOS and Android apps into declarative rendering layers and centralises orchestration in the backend. This means:

- **One request** from the app instead of many
- **Server-driven composition** — the backend decides what to show, changeable without an app release
- **Department isolation** — new departments don't destabilise existing ones
- **Deployment independence** — backend teams ship without waiting for app store review
- **Graceful degradation** — unknown components are skipped, failed department calls don't crash the app
- **Platform consistency** — iOS, Android, and web all receive the same payload and behave identically

The result is an architecture where the number of departments can grow without the mobile apps becoming a coordination bottleneck, a source of cross-team merge conflicts, or the reason a backend change takes two weeks to reach users.

---

## About This PoC

This proof of concept uses a React web frontend because it's quick to demo locally without Xcode or Android Studio. The web frontend is a stand-in for what would be native SwiftUI and Jetpack Compose screens in production. The BFF service and mock APIs are the real focus — they demonstrate the orchestration pattern, the server-driven UI payload, and the scaling properties that benefit mobile teams most.
