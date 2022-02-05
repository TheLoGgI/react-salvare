import {
    Box,
    Button,
    Flex,
    HStack,
    IconButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Stack,
    Text,
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

    useEffect(() => {
        setIsLoggedIn(app.currentUser?.isLoggedIn)
    }, [app.currentUser?.isLoggedIn])

    async function logout() {
        const logout = await app.currentUser?.logOut()
        setIsLoggedIn(app.currentUser?.isLoggedIn)
    }

    console.log("app: ", app)
    return (
        <>
            <Box as="header" bg="cyan.900">
                <Flex
                    as="nav"
                    justify="space-between"
                    align="center"
                    mx="auto"
                    py="4"
                    px={{ base: 4, "2xl": 10 }}
                >
                    <Link to="/">
                        <Box className="logo"></Box>
                    </Link>

                    <HStack spacing={4}>
                        <Text color="white">
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
                                        icon={
                                            <FontAwesomeIcon
                                                color="#B4DCEC"
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
                                                <Button variant="link">
                                                    Profil
                                                </Button>
                                            </Link>
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
                                icon={
                                    <FontAwesomeIcon
                                        color="#B4DCEC"
                                        icon={faSignInAlt}
                                    />
                                }
                            />
                        )}
                    </HStack>
                </Flex>
            </Box>
            <LoginModal isOpen={isOpen} onClose={onClose} />
        </>
    )
}
