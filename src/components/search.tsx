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
import React, { useState } from "react"

import { SearchInputProps, UnionActionType } from "../types/search"

function Search({ setSearchSettings, isLoading }: SearchInputProps) {
    const ACTIONS = {
        INGREDIENTS: "ingredients",
        RECIPIES: "recipies",
    }

    const [buttonState, setButtonState] = useState<UnionActionType>(
        ACTIONS.INGREDIENTS as UnionActionType
    )
    const [inputValue, setInputValue] = useState("")

    function searchToggle(action: UnionActionType) {
        setButtonState(action)
        setSearchSettings({
            searchInput: inputValue,
            selectedButton: action,
        })
    }

    return (
        <HStack spacing={4} p={[2, 4]}>
            <Stack spacing={4} direction="row">
                <Button
                    colorScheme="teal"
                    height={16}
                    leftIcon={<FontAwesomeIcon icon={faCarrot} />}
                    bg={
                        buttonState === ACTIONS.INGREDIENTS
                            ? "teal"
                            : "teal.800"
                    }
                    fontWeight={
                        buttonState === ACTIONS.INGREDIENTS ? "bold" : "initial"
                    }
                    onClick={() =>
                        searchToggle(ACTIONS.INGREDIENTS as UnionActionType)
                    }
                >
                    <Text ml="4">Ingredients</Text>
                </Button>
                <Button
                    colorScheme="teal"
                    height={16}
                    leftIcon={<FontAwesomeIcon icon={faUtensils} />}
                    bg={buttonState === ACTIONS.RECIPIES ? "teal" : "teal.800"}
                    fontWeight={
                        buttonState === ACTIONS.RECIPIES ? "bold" : "initial"
                    }
                    onClick={() =>
                        searchToggle(ACTIONS.RECIPIES as UnionActionType)
                    }
                >
                    <Text ml="4">Recipies</Text>
                </Button>
            </Stack>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    setSearchSettings({
                        searchInput: inputValue,
                        selectedButton: buttonState,
                    })
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
                        isLoading={isLoading}
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
