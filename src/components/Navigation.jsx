import {
	Navbar,
	Dropdown,
	Avatar,
	Button,
	DarkThemeToggle,
} from 'flowbite-react'

import { NavLink } from './NavLink'

export const Navigation = () => {
	return (
		<div className="bg-white dark:bg-gray-800">
			<Navbar
				fluid={false}
				rounded={false}
				color={'bg-slate-700'}
				className="mx-auto max-w-7xl dark:bg-gray-800"
			>
				<Navbar.Brand href="/">
					{/* <img
						src="https://flowbite.com/docs/images/logo.svg"
						className="mr-3 h-6 sm:h-9"
						alt="Flowbite Logo"
					/> */}
					<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
						Movies App
					</span>
				</Navbar.Brand>
				<div className="flex md:order-2">
					<DarkThemeToggle />
					<Button>Log in</Button>
					<Navbar.Toggle />
				</div>
				<Navbar.Collapse>
					<NavLink to="/" text="Home" />
					<NavLink to="/movies" text="Movies" />
					<NavLink to="/about" text="About" />
				</Navbar.Collapse>
			</Navbar>
		</div>
	)
}
