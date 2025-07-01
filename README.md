NestJS Project
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
## Project Overview
This is a NestJS-based application with TypeORM integration. The project includes standard NestJS features and has been configured with specific patches to handle crypto module dependencies.

## Prerequisites
- Node.js v20 or higher (minimum v18 required but v20 recommended)
- npm v10 or higher
- Nest CLI (optional)

## Installation
1. Clone the repository
```bash
git clone <repository-url>
cd my-nest-project
```

2. Install dependencies
```bash
npm install
```
*Note: The installation will automatically apply necessary patches to @nestjs/typeorm*

3. Environment setup
- Copy `.env.example` to `.env`
- Configure your environment variables

## Running the app
```bash
# development
npm run start:dev

# production mode
npm run build
npm run start:prod
```

## Test
```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Patch Information
This project includes a patch for @nestjs/typeorm to handle crypto module dependencies. The patch:
- Replaces `crypto.randomUUID()` with `uuid.v4()`
- Is automatically applied during `npm install` via the postinstall script

Patch file location: `patches/@nestjs+typeorm+11.0.0.patch`

## Notes
1. If you encounter Node.js version warnings, consider upgrading to Node.js v20+
2. The project has been tested with NestJS v11 dependencies
3. For development, ensure you have all required environment variables set
