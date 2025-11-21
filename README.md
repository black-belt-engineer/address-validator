# Address Validator API

This project is a backend API built with **NestJS** that validates and standardizes US property addresses. It exposes a single endpoint: **POST /validate-address**

The API accepts a free-form address string and returns a structured, standardized address along with a validation status:

- `VALID` – The address exists and is deliverable.
- `CORRECTED` – The input had minor errors, and the API suggests a corrected address.
- `UNVERIFIED` – The address could not be verified due to nonexistence or ambiguity.

The service is designed to handle typos, partial addresses, and ambiguous inputs gracefully, providing clear feedback to clients. It is US-only by design to simplify validation logic and rely on the reliability of the Smarty US Street API.

## Bootstrap & Usage

1. Clone the repository:
```bash
git clone <repo-url>
cd address-validator
```

2. Install dependencies:  
```bash
npm install
```

3. Create a .env file in the root directory with your Smarty credentials:
```bash
SMARTY_AUTH_ID=your_auth_id
SMARTY_AUTH_TOKEN=your_auth_token
```

4. Start the application:
```bash
SMARTY_AUTH_ID=your_auth_id
SMARTY_AUTH_TOKEN=your_auth_token
```

## Architectural Thought Process

As the architect, the design choices were made with simplicity, maintainability, reliability, and future extensibility in mind:

### Smarty API as the sole validation source: 
I removed local parsers like libpostal to avoid native dependencies and platform-specific installation issues. Smarty provides both parsing and validation, reducing the number of moving parts and ensuring consistent, authoritative results.

### Modular Service Design:
AddressController handles HTTP requests.

AddressService orchestrates the overall validation workflow.

AddressVerificationService contains the business logic to interact with Smarty and determine the status.

SmartyClient encapsulates all external API calls and maps Smarty responses to our ParsedAddress interface.

This separation of concerns makes the code easy to maintain, test, and extend, such as switching providers or adding caching.

### Type Safety and Consistency:

Defined interfaces (ParsedAddress) and DTOs to enforce consistent data structures.

All methods have explicit return types, and any is avoided entirely.

This prevents runtime errors and makes the API predictable for clients.

### Validation Status Design:

Three statuses (VALID, CORRECTED, UNVERIFIED) provide clear guidance to clients.

CORRECTED enables minor typo correction without blocking users.

UNVERIFIED includes an optional reason for transparency.

### Environment-based Configuration:

Smarty credentials are loaded via .env using @nestjs/config.

This avoids hardcoding secrets and ensures the system is secure and configurable across environments.

### Future-proofing and extensibility:

The architecture allows for easy replacement of Smarty with another provider.

Adding international address support or caching repeated lookups can be done with minimal changes.

Modular services make testing isolated components straightforward.