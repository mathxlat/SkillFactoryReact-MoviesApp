import { Flowbite } from 'flowbite-react'
import { Routes, Route } from 'react-router-dom'
import { Navigation } from './components/Navigation'

function App() {
	return (
		<Flowbite>
			<Navigation />
			<Routes>
				<Route
					path="/"
					element={
						<div className="min-h-screen">
							<div className="mx-auto max-w-8xl px-8">
								<h1>Work in progress</h1>
							</div>
						</div>
					}
				/>
			</Routes>
		</Flowbite>
	)
}

export default App
