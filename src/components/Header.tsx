import {
    Box,
    Button,
    Flex,
    HStack,
    IconButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Stack,
    Text,
    useColorMode,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react"
import {
    faSignInAlt,
    faStar as faStarSolid,
    faUser,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { useRealmApp } from "../context/userContext"
import { LoginModal } from "./LoginModal"
import MenuIcon from "./MenuIcon"

export default function Header() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const app = useRealmApp()
    const [isLoggedIn, setIsLoggedIn] = useState(app.currentUser?.isLoggedIn)
    const { colorMode, toggleColorMode } = useColorMode()
    console.log("colorMode: ", colorMode)

    useEffect(() => {
        setIsLoggedIn(app.currentUser?.isLoggedIn)
    }, [app.currentUser?.isLoggedIn])

    async function logout() {
        await app.currentUser?.logOut()
        setIsLoggedIn(app.currentUser?.isLoggedIn)
    }

    const text = useColorModeValue("black", "white")

    return (
        <>
            <Box as="header">
                <Flex
                    as="nav"
                    justify="space-between"
                    align="center"
                    mx="auto"
                    py="4"
                    px={{ base: 4, "2xl": 10 }}
                >
                    <Link to="/">
                        <Text
                            fontFamily="montserrat"
                            fontSize="lg"
                            fontWeight="bold"
                        >
                            Salvare
                        </Text>
                    </Link>

                    <HStack spacing={4}>
                        <Text color={text}>
                            {app.currentUser?.profile.email}
                        </Text>
                        <MenuIcon
                            to="/favorite"
                            icon={faStarSolid}
                            title="Favoritter"
                        />

                        {isLoggedIn ? (
                            <Popover>
                                <PopoverTrigger>
                                    <IconButton
                                        colorScheme="teal"
                                        aria-label="Profil"
                                        size="lg"
                                        title="Profil"
                                        isRound
                                        icon={<FontAwesomeIcon icon={faUser} />}
                                    />
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />

                                    <PopoverBody>
                                        <Stack spacing={4}>
                                            <Link
                                                className="menulink-symbol"
                                                to="/profil"
                                            >
                                                <Button variant="link">
                                                    Profil
                                                </Button>
                                            </Link>
                                            <Button onClick={toggleColorMode}>
                                                Toggle{" "}
                                                {colorMode === "light"
                                                    ? "Dark"
                                                    : "Light"}
                                            </Button>
                                            <Button
                                                variant="link"
                                                onClick={logout}
                                            >
                                                Logud
                                            </Button>
                                        </Stack>
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
                        ) : (
                            <IconButton
                                title="Login"
                                colorScheme="teal"
                                aria-label="Login"
                                size="lg"
                                onClick={onOpen}
                                isRound
                                icon={<FontAwesomeIcon icon={faSignInAlt} />}
                            />
                        )}
                    </HStack>
                </Flex>
            </Box>
            <LoginModal isOpen={isOpen} onClose={onClose} />
        </>
    )
}
