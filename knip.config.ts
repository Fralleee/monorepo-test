import type { KnipConfig } from 'knip'

const config: KnipConfig = {
	$schema: 'https://unpkg.com/knip@latest/schema.json',
	tags: ['-knipignore'],
	ignore: ['**/node_modules/**', '**/*.d.ts', '**/dist/**', '**/.next/**'],
	rules: {
		files: 'error',
		exports: 'error',
		dependencies: 'error',
		unlisted: 'error',
		types: 'error',
		binaries: 'off',
	},
	ignoreDependencies: ['lefthook', 'posthog-node', '@biomejs/biome'],
	typescript: true,
}

export default config
