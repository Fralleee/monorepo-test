'use client'

import { useSlashID } from '@slashid/react'
import { useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function SessionInfo() {
  const { user, sdkState, isAuthenticated } = useSlashID()

  const groups = useMemo(() => {
    if (!user) return []
    try {
      return user.getGroups()
    } catch {
      return []
    }
  }, [user])

  if (!isAuthenticated || !user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Session</CardTitle>
          <CardDescription>Not authenticated</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">SDK State: {sdkState}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Session</CardTitle>
        <CardDescription>Authenticated via SlashID</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-sm">
          <span className="font-medium">User ID:</span>{' '}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">{user.ID}</code>
        </div>
        <div className="text-sm">
          <span className="font-medium">Groups:</span>{' '}
          {groups.length > 0 ? groups.join(', ') : 'None'}
        </div>
        <div className="text-sm">
          <span className="font-medium">SDK State:</span> {sdkState}
        </div>
      </CardContent>
    </Card>
  )
}
