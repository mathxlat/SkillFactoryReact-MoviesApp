import { Flowbite } from 'flowbite-react'
import { Routes, Route } from 'react-router-dom'

import { Navigation } from './components/Navigation'
import { SignUp } from './components/auth/SignUp'
import { LogIn } from './components/auth/LogIn'
import { ProtectedRoute } from './components/ProtectedRoute'

import { useAuthContext } from './context/AuthProvider'

import Home from './pages/Home'

function App() {
	const { user } = useAuthContext()

	return (
		<Flowbite>
			<Navigation />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route element={<ProtectedRoute isAllowed={!user} />}>
					<Route path="/login" element={<LogIn />} />
					<Route path="/signup" element={<SignUp />} />
				</Route>
			</Routes>
		</Flowbite>
	)
}

export default App
