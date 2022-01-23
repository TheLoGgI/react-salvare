import "./index.css"

import { ChakraProvider } from "@chakra-ui/react"
import React, { Suspense } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import App from "./App"
import Header from "./components/Header"
// import DataContext from "./context/DataContext"
import ThemeContext from "./context/ThemeContext"
import IngredientsPage from "./routes/ingredient"
import RecipesPage from "./routes/recipes"

const DataContext = React.lazy(() => import("./context/DataContext"))

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider>
            <ThemeContext>
                <Suspense fallback={<h1>Loading posts...</h1>}>
                    <DataContext>
                        <BrowserRouter>
                            <Header />
                            <Routes>
                                <Route path="/" element={<App />}>
                                    <Route
                                        path=":id"
                                        element={<IngredientsPage />}
                                    />
                                    <Route
                                        path="recipes/:id"
                                        element={<RecipesPage />}
                                    />
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </DataContext>
                </Suspense>
            </ThemeContext>
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById("root")
)
