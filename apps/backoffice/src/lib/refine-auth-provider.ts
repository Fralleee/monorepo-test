import type { AuthProvider } from '@refinedev/core'

// Auth provider that works with SlashID
// The actual auth is handled by SlashID SDK, this just provides the interface for Refine
export const authProvider: AuthProvider = {
	// biome-ignore lint/suspicious/useAwait: required for interface
	login: async () => {
		// Redirect to login page - actual login is handled by SlashID Form
		return {
			success: true,
			redirectTo: '/login',
		}
	},
	// biome-ignore lint/suspicious/useAwait: required for interface
	logout: async () => {
		// Logout is handled by SlashID SDK in the component
		return {
			success: true,
			redirectTo: '/login',
		}
	},
	// biome-ignore lint/suspicious/useAwait: required for interface
	check: async () => {
		// This is called on every route to check if user is authenticated
		// We check for the SlashID cookie
		if (typeof window !== 'undefined') {
			const orgId = process.env.NEXT_PUBLIC_SLASHID_ORG_ID
			const cookieName = `@slashid/USER_TOKEN/${orgId}`
			const hasCookie = document.cookie.includes(cookieName)

			if (hasCookie) {
				return {
					authenticated: true,
				}
			}
		}

		return {
			authenticated: false,
			redirectTo: '/login',
		}
	},
	// biome-ignore lint/suspicious/useAwait: required for interface
	getPermissions: async () => {
		// TODO: Implement role-based permissions
		return null
	},
	// biome-ignore lint/suspicious/useAwait: required for interface
	getIdentity: async () => {
		// Identity is provided by SlashID SDK via useSlashID hook
		return null
	},
	// biome-ignore lint/suspicious/useAwait: required for interface
	onError: async (error) => {
		if (error.status === 401 || error.status === 403) {
			return {
				logout: true,
				redirectTo: '/login',
			}
		}

		return { error }
	},
}
