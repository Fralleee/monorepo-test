'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Building2, Syringe, Link2, Home, LogOut } from 'lucide-react'
import { useSlashID } from '@slashid/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigation = [
	{ name: 'Dashboard', href: '/', icon: Home },
	{ name: 'Clinics', href: '/clinics', icon: Building2 },
	{ name: 'Treatments', href: '/treatments', icon: Syringe },
	{ name: 'Clinic Treatments', href: '/treatments-by-clinic', icon: Link2 },
]

export function Sidebar() {
	const pathname = usePathname()
	const { logOut, user } = useSlashID()
	const router = useRouter()

	const handleLogout = async () => {
		await logOut()
		router.replace('/login')
	}

	return (
		<div className="flex h-full w-64 flex-col border-r bg-card">
			<div className="flex h-14 items-center border-b px-4">
				<h1 className="text-lg font-semibold">Acme Backoffice</h1>
			</div>

			<nav className="flex-1 space-y-1 p-4">
				{navigation.map((item) => {
					const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
					return (
						<Link
							key={item.name}
							href={item.href}
							className={cn(
								'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
								isActive
									? 'bg-primary text-primary-foreground'
									: 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
							)}
						>
							<item.icon className="h-4 w-4" />
							{item.name}
						</Link>
					)
				})}
			</nav>

			<div className="border-t p-4">
				{user && (
					<div className="mb-3 text-xs text-muted-foreground">
						<div className="truncate">ID: {user.ID}</div>
					</div>
				)}
				<Button variant="outline" className="w-full" onClick={handleLogout}>
					<LogOut className="mr-2 h-4 w-4" />
					Sign out
				</Button>
			</div>
		</div>
	)
}
