import "./css/logo.css"

import { Box, Image, SimpleGrid, Text } from "@chakra-ui/react"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Link, Outlet, useParams } from "react-router-dom"

import Card from "./components/Card"
import Search from "./components/Search"
import { useIngredientData, useRecipesData } from "./context/DataContext"
import { SearchStateType } from "./types/search"

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
    const [searchSettings, setSearchSettings] = useState<SearchStateType>({
        searchInput: "",
        selectedButton: "ingredients",
    })
    console.log("searchSettings: ", searchSettings)
    // const { data, isFetching } = useIngredientData(searchSettings.searchInput)
    const isFetching = false
    const data: any[] = []
    const { data: recipiesData } = useRecipesData(searchSettings.searchInput)
    console.log("recipiesData: ", recipiesData)

    return (
        <>
            <Box as="main" maxW={1600} mx="auto" minH="100vh">
                <Search
                    isLoading={isFetching}
                    searchSettings={searchSettings}
                    setSearchSettings={setSearchSettings}
                />

                <Box p="4">
                    {data?.length === 0 && recipiesData.hits.length === 0 && (
                        <EmptySearchMessage />
                    )}

                    {!id ? (
                        searchSettings.selectedButton === "ingredients" ? (
                            <SimpleGrid
                                autoColumns="true"
                                columns={4}
                                spacing={10}
                            >
                                {data?.map((item, index) => {
                                    const label = item.food.label
                                    const image = item.food.image
                                    const id = item.food.foodId
                                    return (
                                        <Card
                                            key={index + id}
                                            pageLink={id}
                                            image={image}
                                            label={label}
                                            alt={label}
                                        />
                                    )
                                })}
                            </SimpleGrid>
                        ) : (
                            <SimpleGrid
                                autoColumns="true"
                                columns={4}
                                spacing={10}
                            >
                                {recipiesData.hits?.map((item) => {
                                    const label = item.recipe.label
                                    // const calories = item.recipe.calories
                                    const image = item.recipe.image
                                    const id = (
                                        item.recipe.uri as unknown as string
                                    ).split("#")[1]

                                    return (
                                        <Card
                                            key={id}
                                            pageLink={"recipes/" + id}
                                            image={image}
                                            label={label}
                                            alt={label}
                                        />
                                    )
                                })}
                            </SimpleGrid>
                        )
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
            </Box>
            <Box
                w="100%"
                h={400}
                mt={200}
                bgImage="url('salvaregrid.png')"
                bgSize="100%"
            ></Box>
        </>
    )
}

export default App
