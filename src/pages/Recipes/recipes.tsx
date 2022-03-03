import {
    Box,
    Flex,
    Grid,
    GridItem,
    HStack,
    Heading,
    IconButton,
    Image,
    List,
    ListItem,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Select,
    Text,
    UnorderedList,
} from "@chakra-ui/react"
import { faClock } from "@fortawesome/free-regular-svg-icons"
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons"
import {
    faConciergeBell,
    faFireAlt,
    faPrint,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { capitalize } from "lodash"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { MetricListItem } from "../../components/MetricListItem"
import { RecipesDataContext } from "../../context/DataContext"
import { useRealmApp } from "../../context/userContext"
import {
    RecipesData,
    RecipesImages,
    RecipiesIngredients,
} from "../../types/recipes"

type ingredientsListType = (RecipiesIngredients & { selected: boolean })[]

export default function Recipies() {
    const { id } = useParams()
    const navigate = useNavigate()
    const recipesData = useContext<RecipesData>(RecipesDataContext)
    const [recipeAmount, setRecipeAmount] = useState(1)
    const [ingredientsList, setIngredientsList] = useState<ingredientsListType>(
        []
    )

    const app = useRealmApp()

    const updateSelectedState = (newState: boolean, index: number) => {
        const t = [...ingredientsList]
        t[index].selected = newState
        setIngredientsList(t)
    }

    useEffect(() => {
        if (recipesData === null || JSON.stringify(recipesData) === "{}") {
            navigate("/")
        }
    }, [recipesData, navigate])

    const currentIngredient = recipesData.hits?.find(
        (hit) => hit.recipe.id === id
    )
    // console.log("currentIngredient: ", currentIngredient)

    // Authticate user in Realm
    //      Use realm-web to authenticate user
    //      If user is not authenticated, redirect to login page
    //      If user is authenticated, continue
    //      If user is authenticated, get user data from Realm
    // Read user data from Realm
    // Update Userdata from Realm
    // Delete user data from Realm

    const addFavoriteRecipe = async () => {
        // Access a logged in user's read-only custom data
        // app.currentUser?.refreshCustomData()
        // const customData = app.currentUser?.customData
        // console.log(customData)

        const updateUser = {
            query: {
                email: app.currentUser?.profile.email,
                favoriteRecipes: {
                    $not: { $in: [currentIngredient?.recipe.id] },
                },
            },
            update: {
                $push: {
                    favoriteRecipes: currentIngredient?.recipe.id,
                },
            },
            options: { upsert: false },
        }

        try {
            const mongodb = app.currentUser?.mongoClient("mongodb-atlas")
            const usersCollection = mongodb?.db("salvare").collection("users")

            // console.log("users collection: ", await usersCollection?.find())

            // Updates the user's custom data
            await usersCollection?.updateOne(
                updateUser.query,
                updateUser.update,
                updateUser.options
            )

            // Inserts recipie into recipies collection
            await app.currentUser?.functions.insertRecipie(
                currentIngredient?.recipe
            )
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if (currentIngredient !== undefined) {
            setIngredientsList(
                currentIngredient?.recipe.ingredients.map((item) => {
                    return { ...item, selected: false }
                })
            )
        }
    }, [currentIngredient, currentIngredient?.recipe.ingredients])

    if (currentIngredient === undefined) return <></>

    const totalNutrients = Object.values(
        currentIngredient?.recipe.totalNutrients
    ).filter((item) => item.quantity !== 0)

    const macroAcides = ["Fat", "Energy", "Carbs", "Fiber", "Protein"]
    const primaryNutrients = totalNutrients.filter((item, index) =>
        macroAcides.includes(item.label)
    )
    const filteredNutrients = totalNutrients
        .filter((item) => !macroAcides.includes(item.label))
        .sort((a, b) => {
            if (a.unit === "g") return -1

            if (a.unit === b.unit) {
                return b.quantity - a.quantity
            }

            if (
                (a.unit === "g" && b.unit !== a.unit) ||
                (a.unit === "mg" && b.unit !== a.unit)
            ) {
                return -1
            } else return 1
        })

    const label = currentIngredient.recipe.label

    const pickLargesImage = (images: RecipesImages) => {
        if (images === undefined) return "placeholder.png"
        const imagesArray = Object.values(images)
        // @ts-ignore
        const sorted = imagesArray.sort((a, b) => b.width - a.width)
        // @ts-ignore
        return sorted[0].url
    }

    function NutritionGridItem(index: number, subarray: typeof totalNutrients) {
        return (
            <GridItem key={index}>
                <List>
                    {subarray.map((nutrient, index) => (
                        <MetricListItem
                            key={index + nutrient.label}
                            type={nutrient.label}
                            metric={nutrient.quantity}
                            unit={nutrient.unit}
                        />
                    ))}
                </List>
            </GridItem>
        )
    }

    function SplitNutritionGrid(
        nutrietnsArray: typeof totalNutrients,
        numberOfSplits: number
    ) {
        const ListItemAmount = Math.floor(
            nutrietnsArray.length / numberOfSplits
        )

        const subArrys = new Array(numberOfSplits)
            .fill(1)
            .map((item, index) =>
                nutrietnsArray.slice(
                    index * ListItemAmount,
                    (index + 1) * ListItemAmount
                )
            )

        return subArrys.map((nutrient, index, array) => (
            <GridItem key={index}>
                <List>{NutritionGridItem(index, nutrient)}</List>
            </GridItem>
        ))
    }

    return (
        <Box as="section" p="4" pb="200" mt="10">
            <Flex
                maxW={1600}
                mx="auto"
                alignItems="start"
                justify="space-between"
                w="100%"
                gap="20"
            >
                <Box flexBasis={600} flexGrow={1}>
                    <Flex justify="space-between">
                        <Heading>{label}</Heading>
                        <HStack spacing={4}>
                            <IconButton
                                bg="buttonBg"
                                aria-label="add to favorites"
                                size="lg"
                                title="add to favorites"
                                isRound
                                color="buttonIcon"
                                _hover={{ bg: "buttonBgHover" }}
                                icon={<FontAwesomeIcon icon={faStarRegular} />}
                                onClick={addFavoriteRecipe}
                            />
                            <IconButton
                                bg="buttonBg"
                                aria-label="Print"
                                size="lg"
                                title="Print"
                                isRound
                                color="buttonIcon"
                                _hover={{ bg: "buttonBgHover" }}
                                icon={<FontAwesomeIcon icon={faPrint} />}
                                onClick={() => {
                                    window.print()
                                }}
                            />
                        </HStack>
                    </Flex>
                    <HStack spacing={6} mt="5">
                        <HStack spacing={2}>
                            <FontAwesomeIcon
                                size="2x"
                                color="buttonIcon"
                                icon={faClock}
                            />
                            <Text fontSize="lg">
                                {currentIngredient.recipe.totalTime} min
                            </Text>
                        </HStack>
                        <HStack spacing={2}>
                            <FontAwesomeIcon size="2x" icon={faFireAlt} />
                            <Text fontSize="lg">
                                {Math.round(currentIngredient.recipe.calories)}{" "}
                                cal
                            </Text>
                        </HStack>
                        <HStack spacing={2}>
                            <FontAwesomeIcon size="2x" icon={faConciergeBell} />
                            <Text fontSize="lg">
                                {currentIngredient.recipe.yield} Portions
                            </Text>
                        </HStack>
                    </HStack>
                    <Flex justify="end">
                        <Select
                            placeholder="Select option"
                            w="200"
                            bg="buttonBg"
                            border="none"
                            onChange={(e) => {
                                setRecipeAmount(Number(e.target.value))
                            }}
                        >
                            <option selected value="1">
                                Person 1
                            </option>
                            <option value="2">Person 2</option>
                            <option value="3">Person 3</option>
                            <option value="4">Person 4</option>
                            <option value="5">Person 5</option>
                            <option value="6">Person 6</option>
                            <option value="7">Person 7</option>
                            <option value="8">Person 8</option>
                        </Select>
                    </Flex>
                    <Box>
                        {ingredientsList?.map((ingredient, index) => {
                            const quantity =
                                ingredient.quantity === 0
                                    ? Number(ingredient.weight.toFixed(2))
                                    : Number(ingredient.quantity.toFixed(2))

                            const unit =
                                ingredient.measure === "<unit>"
                                    ? ""
                                    : ingredient.quantity === 0
                                    ? "g"
                                    : ingredient.measure

                            const IngredientSum = (
                                recipeAmount * quantity
                            ).toFixed(2)

                            return (
                                <Popover trigger="hover" isLazy>
                                    <PopoverTrigger>
                                        <Grid
                                            bg={
                                                ingredient.selected
                                                    ? "buttonBgSelected"
                                                    : "buttonBg"
                                            }
                                            p="4"
                                            templateColumns="10% 1fr 20%"
                                            alignItems="center"
                                            w="100%"
                                            minW="600"
                                            borderRadius={4}
                                            my="4"
                                            _hover={{
                                                bg: "buttonBgHover",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => {
                                                updateSelectedState(
                                                    !ingredient.selected,
                                                    index
                                                )
                                            }}
                                        >
                                            <Box
                                                w="4"
                                                h="4"
                                                borderRadius="50%"
                                                border="2px solid"
                                                borderColor="buttonIcon"
                                                bg={
                                                    ingredient.selected
                                                        ? "buttonIcon"
                                                        : "white"
                                                }
                                            ></Box>
                                            <Text fontSize="lg">
                                                {capitalize(ingredient.food)}
                                            </Text>
                                            <Text fontSize="lg" color="muted">
                                                {IngredientSum} {unit}
                                            </Text>
                                        </Grid>
                                    </PopoverTrigger>
                                    <PopoverContent maxW="250" p="4">
                                        <List>
                                            {primaryNutrients.map(
                                                (nutrient, index) => (
                                                    <MetricListItem
                                                        key={
                                                            nutrient.label +
                                                            index
                                                        }
                                                        type={nutrient.label}
                                                        metric={
                                                            nutrient.quantity
                                                        }
                                                        unit={nutrient.unit}
                                                        flexGrow={1}
                                                    />
                                                )
                                            )}
                                        </List>
                                    </PopoverContent>
                                </Popover>
                            )
                        })}
                    </Box>

                    <Box fontSize="2xl" mt="50">
                        <Heading as="h2" my="4">
                            Recipe Description{" "}
                        </Heading>
                        <UnorderedList>
                            {currentIngredient.recipe.ingredientLines.map(
                                (line) => {
                                    return <ListItem>{line}</ListItem>
                                }
                            )}
                        </UnorderedList>
                    </Box>
                </Box>
                <Box minW={300} maxW={600} flexGrow={1}>
                    <Image
                        src={
                            pickLargesImage(
                                currentIngredient?.recipe?.images
                            ) as unknown as string
                        }
                        width="100%"
                        fallbackSrc="placeholder.png"
                        alt="hey"
                    />
                    <Box maxW={1600} mx="auto">
                        <Text my="5" fontWeight="bold">
                            Per 100 g
                        </Text>
                        <Grid
                            gap={2}
                            gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
                        >
                            <List>
                                {primaryNutrients.map((nutrient, index) => (
                                    <MetricListItem
                                        key={nutrient.label + index}
                                        type={nutrient.label}
                                        metric={nutrient.quantity}
                                        unit={nutrient.unit}
                                        flexGrow={1}
                                    />
                                ))}
                            </List>

                            {SplitNutritionGrid(filteredNutrients, 3)}
                        </Grid>
                    </Box>
                </Box>
            </Flex>
        </Box>
    )
}
