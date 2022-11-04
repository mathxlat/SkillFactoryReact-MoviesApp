import { useLinkClickHandler, useLocation } from 'react-router-dom'
import { Navbar } from 'flowbite-react'

export const NavLink = ({ to, text }) => {
	const location = useLocation()

	const clickHandler = useLinkClickHandler(to)

	return (
		<Navbar.Link
			onClick={clickHandler}
			href={to}
			active={location.pathname === to}
		>
			{text}
		</Navbar.Link>
	)
}
