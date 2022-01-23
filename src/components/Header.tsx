import { Box, Flex, HStack, IconButton, useDisclosure } from "@chakra-ui/react"
import { faSignInAlt, faStar, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

import { LoginModal } from "./LoginModal"
import MenuIcon from "./MenuIcon"

export default function Header() {
    const { isOpen, onOpen, onClose } = useDisclosure()
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
                        <MenuIcon
                            to="/favorite"
                            icon={faStar}
                            title="Favoritter"
                        />
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
                        {/* <MenuIcon to="/profil" icon={faUser} title="Profil" /> */}
                    </HStack>
                </Flex>
            </Box>
            <LoginModal isOpen={isOpen} onClose={onClose} />
        </>
    )
}
