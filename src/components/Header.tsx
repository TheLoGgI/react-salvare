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
    useBoolean,
    useColorMode,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react"
import {
    faSignInAlt,
    faStar as faStarSolid,
    faUser,
    faWrench,
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

    useEffect(() => {
        setIsLoggedIn(app.currentUser?.isLoggedIn)
    }, [app.currentUser?.isLoggedIn])

    async function logout() {
        await app.currentUser?.logOut()
        setIsLoggedIn(app.currentUser?.isLoggedIn)

        const colorMode = localStorage.getItem("chakra-ui-color-mode")
        localStorage.clear()
        if (colorMode) {
            localStorage.setItem("chakra-ui-color-mode", colorMode)
        }
    }

    const text = useColorModeValue("black", "white")

    return (
        <>
            <Box as="header" bg="#b6c3c8">
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

                        {isLoggedIn ? (
                            <>
                                <MenuIcon
                                    to="/favorite"
                                    icon={faStarSolid}
                                    title="Favoritter"
                                />
                                <Popover>
                                    <PopoverTrigger>
                                        <IconButton
                                            color="buttonIcon"
                                            bg={"buttonBg"}
                                            _hover={{ bg: "buttonBgHover" }}
                                            aria-label="Profil"
                                            size="lg"
                                            title="Profil"
                                            isRound
                                            icon={
                                                <FontAwesomeIcon
                                                    icon={faUser}
                                                />
                                            }
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
                                                    <Button w="100%">
                                                        Profil
                                                    </Button>
                                                </Link>
                                                <Button onClick={logout}>
                                                    Logud
                                                </Button>
                                            </Stack>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            </>
                        ) : (
                            <>
                                <IconButton
                                    title="Login"
                                    color="buttonIcon"
                                    aria-label="Login"
                                    size="lg"
                                    bg={"buttonBg"}
                                    _hover={{ bg: "buttonBgHover" }}
                                    onClick={onOpen}
                                    isRound
                                    icon={
                                        <FontAwesomeIcon icon={faSignInAlt} />
                                    }
                                />
                            </>
                        )}
                        <Popover>
                            <PopoverTrigger>
                                <IconButton
                                    title="Options"
                                    color="buttonIcon"
                                    aria-label="Login"
                                    size="lg"
                                    bg={"buttonBg"}
                                    _hover={{ bg: "buttonBgHover" }}
                                    isRound
                                    icon={<FontAwesomeIcon icon={faWrench} />}
                                />
                            </PopoverTrigger>
                            <PopoverContent>
                                <PopoverArrow />

                                <PopoverBody>
                                    <Stack spacing={4}>
                                        <Button onClick={toggleColorMode}>
                                            Toggle{" "}
                                            {colorMode === "light"
                                                ? "Dark"
                                                : "Light"}{" "}
                                            theme
                                        </Button>
                                    </Stack>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    </HStack>
                </Flex>
            </Box>
            <LoginModal isOpen={isOpen} onClose={onClose} />
        </>
    )
}
