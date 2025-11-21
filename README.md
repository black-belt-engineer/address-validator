# Address Validator API

A backend service built with **NestJS** and **TypeScript** that validates and standardizes US property addresses via the **Smarty US Street API**.

The service exposes a single endpoint:

```
POST /addresses/validate
```

It accepts a free-form address string and returns a validation status: `VALID` (address is correct and deliverable), `CORRECTED` (input was auto-corrected), or `UNVERIFIED` (address cannot be confirmed).

---

## How to Run

### Prerequisites
- Docker

### Setup

1. Clone and install:
```bash
git clone https://github.com/black-belt-engineer/address-validator
cd address-validator
```

2. Create `.env`:
```env
SMARTY_AUTH_ID=your_auth_id
SMARTY_AUTH_TOKEN=your_auth_token
```

3. Start:
```bash
docker compose up
```

---

## Architectural Decisions

Initially, I explored a two-tier approach: use a local parser (node-postal/libpostal) for quick parsing, then verify with Smarty. The logic seemed sound — parse fast locally, then validate externally. However, this approach had a critical flaw: **local parsing is inherently unreliable and cannot verify correctness**.

Local parsers can misidentify components (house number, street, city), fail on typos, and cannot confirm if an address actually exists. This meant the parsed output was often inaccurate before even reaching Smarty. The extra complexity of a two-tier system added code, potential failure points, and maintenance burden without gaining reliability.

**Conclusion**: Skip the local parser entirely. Use Smarty's API directly — it handles parsing, standardization, and validation in one authoritative call. Simpler, more reliable, fewer moving parts.

### Why Smarty Over Google Places or AWS Location?

- **Google Places**: Designed for geographic locations, not postal addresses. No deliverability checking.
- **AWS Location**: Has geocoding but lacks USPS-level validation and address correction.
- **Smarty**: Purpose-built for USPS-certified address validation. Handles typos, returns standardized USPS components (street, city, state, ZIP+4), and provides deliverability confirmation.

For US addresses, Smarty is the most accurate and reliable choice.

### Code Architecture

Services follow clean separation of concerns:

- **AddressController**: HTTP layer
- **AddressService**: Orchestration and status determination
- **AddressVerificationService**: Business logic for interpreting Smarty responses
- **SmartyClient**: Isolated vendor integration (easy to swap providers in the future)

All methods have explicit return types. No `any` is used. DTOs enforce type safety.

### Why This Design is Future-Proof

The modular architecture allows easy extensions:
- **Swap providers**: Change only `SmartyClient`
- **Add caching**: Reduce API calls without touching business logic
- **Internationalize**: Add support for other regions by extending services
- **Add rate limiting or logging**: Apply at controller or service level without refactoring

---

## AI Usage

AI was used as a brainstorming and acceleration tool

- **Explored alternatives**: Evaluated two-tier parsing, libpostal, Smarty, Google, AWS approaches
- **Evaluated trade-offs**: Compared providers based on features and accuracy
- **Refined patterns**: Improved service structure based on suggestions
- **Accelerated boilerplate**: Generated DTOs and interfaces


---

## Tech Stack

- **NestJS**: Modular backend framework
- **TypeScript**: Type safety
- **Axios**: HTTP client
- **@nestjs/config**: Environment management
- **Smarty US Street API**: Address validation