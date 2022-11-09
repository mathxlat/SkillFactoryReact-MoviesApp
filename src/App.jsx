import { Flowbite } from 'flowbite-react'
import { Routes, Route } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import Home from './pages/Home'

function App() {
	return (
		<Flowbite>
			<Navigation />
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
			</Routes>
		</Flowbite>
	)
}

export default App
