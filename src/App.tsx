import { Box, Button, Grid } from "@chakra-ui/react"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"

import Header from "./components/Header"
import Discovery from "./pages/Discovery"
import IngredientsPage from "./pages/Ingredients"
import ProfilPage from "./pages/Profil"
import RecipesPage from "./pages/Recipes"

// import * as Page from "./pages"

function App() {
    return (
        <Box bg="bg">
            <BrowserRouter>
                <Header />

                <Grid templateColumns="400px auto" gap="10">
                    <Box as="aside">
                        <Box p="4">
                            <Button
                                variant="outline"
                                size="lg"
                                w="full"
                                textAlign="left"
                                my="4"
                            >
                                <Link to="profil">Log Meals Calories</Link>
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                w="full"
                                textAlign="left"
                            >
                                <Link to="analytics">Analytics & Reports</Link>
                            </Button>
                        </Box>
                    </Box>

                    <Box as="main" minH="100vh" bg="#e9eef0">
                        <Routes>
                            <Route path="/" element={<Discovery />}>
                                <Route
                                    path=":id"
                                    element={<IngredientsPage />}
                                />
                                <Route
                                    path="recipes/:id"
                                    element={<RecipesPage />}
                                />
                            </Route>
                            <Route path="profil" element={<ProfilPage />} />
                            <Route path="favorite" element={<ProfilPage />} />
                        </Routes>
                    </Box>
                </Grid>
            </BrowserRouter>
        </Box>
    )
}

export default App
