import { Box, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Header from "./components/Header"
import Discovery from "./routes/Discovery"
import IngredientsPage from "./routes/ingredient"
import ProfilPage from "./routes/profil"
import RecipesPage from "./routes/recipes"

function App() {
    const bg = useColorModeValue("light.100", "teal.900")
    return (
        <BrowserRouter>
            {/* <Box bg={bg}> */}
            <Header />
            <Routes>
                <Route path="/" element={<Discovery />}>
                    <Route path=":id" element={<IngredientsPage />} />
                    <Route path="recipes/:id" element={<RecipesPage />} />
                </Route>
                <Route path="profil" element={<ProfilPage />} />
            </Routes>
            {/* </Box> */}
        </BrowserRouter>
    )
}

export default App
