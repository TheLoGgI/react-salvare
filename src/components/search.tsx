import {
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
import { Button } from "."

function Search({
    searchSettings,
    setSearchSettings,
    isLoading,
}: SearchInputProps) {
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
                    height={16}
                    leftIcon={<FontAwesomeIcon icon={faCarrot} />}
                    isActive={buttonState === ACTIONS.INGREDIENTS}
                    onClick={() =>
                        searchToggle(ACTIONS.INGREDIENTS as UnionActionType)
                    }
                >
                    <Text ml="4">Ingredients</Text>
                </Button>
                <Button
                    height={16}
                    leftIcon={<FontAwesomeIcon icon={faUtensils} />}
                    isActive={buttonState === ACTIONS.RECIPIES}
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
                            <FormLabel htmlFor="search" color="text" m="0">
                                Search {searchSettings?.selectedButton}
                            </FormLabel>
                            <Input
                                id="search"
                                type="search"
                                bg="buttonBg"
                                border="none"
                                flexGrow={1}
                                maxW={400}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                        </Flex>
                    </FormControl>
                    <Button
                        mt={4}
                        isLoading={isLoading}
                        cursor="pointer"
                        alignSelf="flex-end"
                        bg="buttonSubmit"
                        color="black"
                        type="submit"
                        _hover={{ bg: "buttonSubmitHover" }}
                    >
                        Search
                    </Button>
                </HStack>
            </form>
        </HStack>
    )
}

export default Search
