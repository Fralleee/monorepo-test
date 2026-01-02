// Re-export types for convenience
export type { SessionUser, UserRole, SessionConfig } from '../types.js'

// Re-export session utilities
export { verifyToken, getSessionFromCookieHeader, extractTokenFromCookieHeader } from '../session.js'
export { getCookieName, getDefaultConfig } from '../config.js'

// Note: React-specific hooks like useSlashID should be imported directly from @slashid/react
// This module provides types and server-side utilities that can be used alongside the React SDK
