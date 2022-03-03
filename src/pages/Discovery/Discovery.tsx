import { Box, Button, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Link, Outlet, useParams } from "react-router-dom"

import Card from "../../components/Card"
import Search from "../../components/Search"
import { useIngredientData, useRecipesData } from "../../context/DataContext"
import { SearchStateType } from "../../types/search"

function EmptySearchMessage() {
    return (
        <>
            <Text fontSize="3xl">
                Find your ingredients or recipes for your next meal
            </Text>
            <Box>
                <Image mt="8" src="recipies.png" alt="recipies example" />
            </Box>
        </>
    )
}

function Discovery() {
    const { id } = useParams()
    const [searchSettings, setSearchSettings] = useState<SearchStateType>({
        searchInput: "",
        selectedButton: "ingredients",
    })
    const { data, isFetching } = useIngredientData(searchSettings.searchInput)
    const { data: recipiesData, next: nextRecipiePage } = useRecipesData(
        searchSettings.searchInput,
        true
    )
    // console.log("recipiesData: ", recipiesData)

    function paginatePage() {
        nextRecipiePage()
    }

    return (
        <>
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
                        <SimpleGrid autoColumns="true" columns={4} spacing={10}>
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
                        <>
                            <SimpleGrid
                                autoColumns="true"
                                columns={4}
                                spacing={10}
                            >
                                {recipiesData.hits?.map((item, index) => {
                                    const label = item.recipe.label
                                    const image = item.recipe.image
                                    const id = (
                                        item.recipe.uri as unknown as string
                                    ).split("#")[1]

                                    return (
                                        <Card
                                            key={id + index}
                                            pageLink={"recipes/" + id}
                                            image={image}
                                            label={label}
                                            alt={label}
                                        />
                                    )
                                })}
                            </SimpleGrid>
                            {recipiesData.hits?.length !== 0 && (
                                <Button
                                    colorScheme="teal"
                                    size="lg"
                                    mx="auto"
                                    mt="8"
                                    isLoading={isFetching}
                                    onClick={paginatePage}
                                    d="block"
                                >
                                    Show more
                                </Button>
                            )}
                        </>
                    )
                ) : (
                    <Box d="inline-block">
                        <Link to="/">
                            <Flex align="center" gap="4">
                                <FontAwesomeIcon
                                    size="3x"
                                    color="text"
                                    icon={faArrowLeft}
                                />
                                <Text fontSize="2xl" verticalAlign="center">
                                    Go back
                                </Text>
                            </Flex>
                        </Link>
                    </Box>
                )}
            </Box>

            <Outlet />
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

export default Discovery
