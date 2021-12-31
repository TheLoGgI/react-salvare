import "./css/logo.css"

import { Box, Image, SimpleGrid, Text } from "@chakra-ui/react"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Link, Outlet, useParams } from "react-router-dom"

import Card from "./components/Card"
import Search from "./components/Search"
import { useIngredientData } from "./context/DataContext"

function EmptySearchMessage() {
    return (
        <>
            <Text fontSize="3xl" color="blue.50">
                Find your ingredients or recipes for your next meal
            </Text>
            <Image src="recipies.example.png" alt="recipies example" />
        </>
    )
}

function App() {
    const { id } = useParams()
    const [searchInput, setSearchInput] = useState("")
    const { data } = useIngredientData(searchInput)
    console.log("data: ", data)

    return (
        <Box as="main" bg="#1A2C33" minH="100vh">
            <Search searchInput={searchInput} setSearchInput={setSearchInput} />

            <Box p="4">
                {data?.length === 0 ? <EmptySearchMessage /> : null}

                {!id ? (
                    <SimpleGrid autoColumns="true" columns={4} spacing={10}>
                        {data?.map((item, index) => {
                            const label = item.food.label
                            const image = item.food.image
                            const id = item.food.foodId
                            return (
                                <Card
                                    key={index + id}
                                    ingredientId={id}
                                    image={image}
                                    label={label}
                                    alt={label}
                                />
                            )
                        })}
                    </SimpleGrid>
                ) : (
                    <Link to="/">
                        <FontAwesomeIcon
                            size="3x"
                            color="#B4DCEC"
                            icon={faArrowLeft}
                        />
                    </Link>
                )}
            </Box>

            <Outlet />

            <Box
                w="100%"
                h={400}
                mt={200}
                bgImage="url('salvaregrid.png')"
                bgSize="110%"
            ></Box>
        </Box>
    )
}

export default App
