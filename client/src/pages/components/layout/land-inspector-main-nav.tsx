import { Button } from '@/components/ui/button'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom';

export function LandInspectorMainNav({ }: React.HTMLAttributes<HTMLElement>) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div>
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
                        <NavLink to="/land-inspector/dashboard" location={location}>Home</NavLink>
                        <NavLink to="/land-inspector/dashboard/verify-user" location={location}>Verify User</NavLink>
                        <NavLink to="/land-inspector/dashboard/verify-land" location={location}>Verify Land</NavLink>
                        <NavLink to="/land-inspector/dashboard/transfer-ownership" location={location}>Transfer Ownership</NavLink>
                    </nav>
                    <div className="ml-auto flex items-center space-x-4">
                        <Button className='h-8' onClick={() => {
                            localStorage.clear()
                            navigate('/')
                        }}>Log out</Button>
                    </div>
                </div>

            </div>
            <Outlet />
        </div>
    );
}

function NavLink({ to, children, location }: { to: string, children: React.ReactNode, location: any }) {
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={`text-sm font-medium transition-colors ${isActive ? 'font-bold hover:text-primary' : 'text-muted-foreground hover:text-primary'}`}
        >
            {children}
        </Link>
    );
}
