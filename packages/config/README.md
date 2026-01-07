# @acme/config

Shared TypeScript configurations for the Acme CRM monorepo.

## Overview

This package provides centralized TypeScript configurations that:
- Ensure consistent compiler settings across all packages and apps
- Extend a strict base configuration
- Provide framework-specific presets (Next.js, Node.js)
- Reduce duplication and maintenance burden

## Project Structure

```
├── tsconfig.base.json      # Base TypeScript configuration
├── tsconfig.nextjs.json    # Next.js specific config
├── tsconfig.node.json      # Node.js/NestJS config
└── package.json            # Package exports
```

## Configurations

### Base Configuration (`tsconfig.base.json`)

Strict TypeScript settings shared by all packages:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "skipLibCheck": true,

    // Strict type checking
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,

    // Output settings
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,

    // Module settings
    "isolatedModules": true,
    "verbatimModuleSyntax": true
  }
}
```

### Next.js Configuration (`tsconfig.nextjs.json`)

Extends base with Next.js-specific settings:

```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "jsx": "preserve",
    "incremental": true,
    "noEmit": true,

    // Path aliases
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },

    // Next.js plugin
    "plugins": [
      { "name": "next" }
    ]
  }
}
```

### Node.js Configuration (`tsconfig.node.json`)

For NestJS and other Node.js packages:

```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "module": "CommonJS",
    "moduleResolution": "Node",
    "outDir": "./dist",
    "rootDir": "./src",

    // Decorator support for NestJS
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## Usage

### In Next.js Apps

```json
// apps/test-app/tsconfig.json
{
  "extends": "@acme/config/tsconfig.nextjs.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### In NestJS API

```json
// apps/api/tsconfig.json
{
  "extends": "@acme/config/tsconfig.node.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### In Shared Packages

```json
// packages/auth/tsconfig.json
{
  "extends": "@acme/config/tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Package Exports

```json
// package.json
{
  "name": "@acme/config",
  "exports": {
    "./tsconfig.base.json": "./tsconfig.base.json",
    "./tsconfig.nextjs.json": "./tsconfig.nextjs.json",
    "./tsconfig.node.json": "./tsconfig.node.json"
  }
}
```

## Compiler Options Explained

### Target & Module

| Option | Value | Purpose |
|--------|-------|---------|
| `target` | ES2022 | Modern JavaScript features |
| `module` | ESNext | ESM modules (bundler handles) |
| `moduleResolution` | Bundler | Modern resolution for bundlers |

### Strict Mode

| Option | Value | Purpose |
|--------|-------|---------|
| `strict` | true | Enable all strict checks |
| `noUncheckedIndexedAccess` | true | Require undefined checks on array access |
| `noImplicitOverride` | true | Require explicit override keyword |

### Interop

| Option | Value | Purpose |
|--------|-------|---------|
| `esModuleInterop` | true | CommonJS/ESM interop |
| `skipLibCheck` | true | Skip .d.ts checking for speed |
| `isolatedModules` | true | Required for bundlers |
| `verbatimModuleSyntax` | true | Strict import/export syntax |

### Output

| Option | Value | Purpose |
|--------|-------|---------|
| `declaration` | true | Generate .d.ts files |
| `declarationMap` | true | Source maps for .d.ts |
| `sourceMap` | true | Source maps for debugging |

## Customizing Configurations

### Adding a Path Alias

In your app's `tsconfig.json`:

```json
{
  "extends": "@acme/config/tsconfig.nextjs.json",
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@lib/*": ["./src/lib/*"]
    }
  }
}
```

### Overriding Strict Settings

If you need to temporarily relax a setting:

```json
{
  "extends": "@acme/config/tsconfig.base.json",
  "compilerOptions": {
    "noUncheckedIndexedAccess": false
  }
}
```

### Adding Types

```json
{
  "extends": "@acme/config/tsconfig.node.json",
  "compilerOptions": {
    "types": ["node", "jest"]
  }
}
```

## Best Practices

### Do

- Always extend one of the shared configs
- Override only what's necessary
- Keep `include`/`exclude` in the extending config
- Use path aliases consistently

### Don't

- Disable strict mode settings without good reason
- Copy settings that are already in the base config
- Mix CommonJS and ESM settings

## Adding a New Configuration

If you need a new base config (e.g., for a different framework):

### 1. Create the Config File

```json
// tsconfig.deno.json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "lib": ["ES2022", "Deno.NS"],
    "noEmit": true
  }
}
```

### 2. Add to Package Exports

```json
// package.json
{
  "exports": {
    "./tsconfig.base.json": "./tsconfig.base.json",
    "./tsconfig.nextjs.json": "./tsconfig.nextjs.json",
    "./tsconfig.node.json": "./tsconfig.node.json",
    "./tsconfig.deno.json": "./tsconfig.deno.json"
  }
}
```

### 3. Use in App

```json
// apps/deno-app/tsconfig.json
{
  "extends": "@acme/config/tsconfig.deno.json"
}
```

## Dependencies

This package has no runtime dependencies. It only provides configuration files.

## Related Files

- Root `biome.json` - Linting and formatting configuration
- Root `turbo.json` - Build pipeline configuration
- Root `knip.config.ts` - Unused code detection configuration
