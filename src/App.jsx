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
						<div className="min-h-screen dark:bg-gray-700">
							<div className="mx-auto max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl px-2 sm:px-4 md:px-0 lg:px-0 xl:px-4">
								<h1 className="dark:text-white">
									Work in progress
								</h1>
							</div>
						</div>
					}
				/>
			</Routes>
		</Flowbite>
	)
}

export default App
