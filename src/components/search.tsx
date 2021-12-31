import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Stack,
    Text,
} from "@chakra-ui/react"
import { faCarrot, faUtensils } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useReducer, useState } from "react"

type UnionActionType = "ingredients" | "recipies"
type StateReducerType = { ingredients: boolean; recipies: boolean }
type SearchInputProps = {
    setSearchInput: (value: string) => void
    searchInput: string
}

function Search({ setSearchInput, searchInput }: SearchInputProps) {
    const ACTIONS = {
        INGREDIENTS: "ingredients",
        RECIPIES: "recipies",
    }
    const initialState = { ingredients: true, recipies: false }

    function reducer(state: StateReducerType, action: UnionActionType) {
        switch (action) {
            case ACTIONS.INGREDIENTS:
                return { ingredients: true, recipies: false }
            case ACTIONS.RECIPIES:
                return { ingredients: false, recipies: true }
            default:
                return state
        }
    }

    const [buttonState, dispatch] = useReducer(reducer, initialState)
    const [inputValue, setInputValue] = useState("")

    return (
        <HStack spacing={4} p={[2, 4]}>
            <Stack spacing={4} direction="row">
                <Button
                    colorScheme="teal"
                    height={16}
                    leftIcon={<FontAwesomeIcon icon={faCarrot} />}
                    bg={buttonState?.ingredients ? "teal" : "teal.800"}
                    fontWeight={buttonState?.ingredients ? "bold" : "initial"}
                    onClick={() =>
                        dispatch(ACTIONS.INGREDIENTS as UnionActionType)
                    }
                >
                    <Text ml="4">Ingredients</Text>
                </Button>
                <Button
                    colorScheme="teal"
                    height={16}
                    leftIcon={<FontAwesomeIcon icon={faUtensils} />}
                    bg={buttonState?.recipies ? "teal" : "teal.800"}
                    fontWeight={buttonState?.recipies ? "bold" : "initial"}
                    onClick={() =>
                        dispatch(ACTIONS.RECIPIES as UnionActionType)
                    }
                >
                    <Text ml="4">Recipies</Text>
                </Button>
            </Stack>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    setSearchInput(inputValue)
                }}
            >
                <HStack>
                    <FormControl>
                        <Flex flexDirection="column">
                            <FormLabel htmlFor="search" color="blue.50" m="0">
                                Search Ingredients
                            </FormLabel>
                            <Input
                                id="search"
                                type="search"
                                bg="teal.800"
                                border="none"
                                color="blue.100"
                                flexGrow={1}
                                maxW={400}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                        </Flex>
                    </FormControl>
                    <Button
                        mt={4}
                        colorScheme="teal"
                        isLoading={false}
                        cursor="pointer"
                        alignSelf="flex-end"
                        type="submit"
                    >
                        Search
                    </Button>
                </HStack>
            </form>
        </HStack>
    )
}

export default Search
