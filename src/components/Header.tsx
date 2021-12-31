import { Box, Flex, HStack } from "@chakra-ui/react"
import { faStar, faUser } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'

import MenuIcon from "./MenuIcon"

export default function Header() {
  return (
    <Box as="header" bg="cyan.900" p="4">
      <Flex as="nav" justify="space-between" align="center">
        <Link to="/">
          <Box className="logo"></Box>
        </Link>

        <HStack spacing={4}>
          <MenuIcon to="/favorite" icon={faStar} title="Favoritter"/>
          <MenuIcon to="/profil" icon={faUser} title="Profil" />
        </HStack>
      </Flex>
    </Box>
  )
}
