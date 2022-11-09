import { Button, Dropdown, Menu, Navbar } from 'react-daisyui'
import { Link } from 'react-router-dom'

export const Navigation = () => {
	return (
		<div className="flex w-full px-1 items-center justify-center gap-2 mx-auto max-w-8xl absolute">
			<Navbar>
				<Navbar.Start>
					<Link
						to="/"
						className="btn btn-ghost normal-case text-2xl font-semibold"
					>
						MoviesApp+
					</Link>
				</Navbar.Start>
				<Navbar.End>
					<Link to="/signin" className="btn btn-ghost mr-2">
						Sign in
					</Link>
					<Link to="/signup" className="btn btn-primary">
						Sign up
					</Link>
				</Navbar.End>
			</Navbar>
		</div>
	)
}
