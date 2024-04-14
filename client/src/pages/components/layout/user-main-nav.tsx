import { Button } from '@/components/ui/button'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom';

// import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function UserMainNav({ }: React.HTMLAttributes<HTMLElement>) {
    const navigate = useNavigate();
    const location = useLocation();
    const privateKey = localStorage.getItem('key')

    return (
        <div>
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
                        <NavLink to="/user/dashboard" location={location}>Home</NavLink>
                        <NavLink to="/user/dashboard/add-lands" location={location}>Add Lands</NavLink>
                        <NavLink to="/user/dashboard/my-lands" location={location}>My Lands</NavLink>
                        <NavLink to="/user/dashboard/land-gallery" location={location}>Land Gallery</NavLink>
                        <NavLink to="/user/dashboard/recieved-request" location={location}>My Received Request</NavLink>
                        <NavLink to="/user/dashboard/sent-request" location={location}>My Sent Request</NavLink>
                    </nav>
                    <div className="ml-auto flex items-center space-x-4">

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">{privateKey}</Button>
                            </DropdownMenuTrigger>
                        </DropdownMenu>
                        <Button className='h-9' onClick={() => {
                            localStorage.clear()
                            navigate('/')
                        }}>Log out</Button>
                    </div>
                </div>

            </div>
            <Outlet />
        </div >
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
