import {
    Box,
    Button,
    Divider,
    Flex,
    HStack,
    Heading,
    ListItem,
    SimpleGrid,
    Text,
    UnorderedList,
} from "@chakra-ui/react"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"

import { useCurrentUser } from "../../context/userContext"

type GoalCardType = {
    title: string
    description: string
}

const GoalCard: React.FC<GoalCardType> = ({ title, description }) => {
    return (
        <Flex
            fontSize={{ sm: "2xl", lg: "3xl" }}
            p="8"
            bg="cardBg"
            borderRadius="4"
            flexDir="column"
            justify="center"
        >
            <Text fontSize="sm" fontWeight="bold" color="blue.900">
                {title}
            </Text>
            <Text>{description}</Text>
        </Flex>
    )
}

export default function Profil() {
    const currentUser = useCurrentUser()
    const location = useLocation()
    const navigate = useNavigate()
    const { email, username, goals, bodyWeight } = currentUser
    const hasGoals = goals.length > 0

    console.log("currentUser: ", currentUser)
    // if (!currentUser.id) {
    //     // @ts-expect-error
    //     const from = location.state?.from?.pathname || "/"
    //     console.log("location: ", location)
    //     setTimeout(() => {
    //         navigate(from, { replace: false })
    //     }, 0)
    // }

    return (
        <>
            <Heading p="4">Profil</Heading>
            <SimpleGrid p="4" columns={3} spacing={10} as="section">
                <Box fontSize="xl">
                    <Text fontSize="sm" fontWeight="bold" color="blue.500">
                        Account Information
                    </Text>
                    <Text>Name: {username}</Text>
                    <Text>Email: {email}</Text>
                    <Text>Password: ************</Text>
                </Box>

                <Box fontSize="xl">
                    <Text fontSize="sm" fontWeight="bold" color="blue.500">
                        Body
                    </Text>
                    <Text>Gender: Male</Text>
                    <Text>Activity level: Medium</Text>
                    <Text>Age: 25 years</Text>
                </Box>
                <Box fontSize="xl">
                    <Text fontSize="sm" fontWeight="bold" color="blue.500">
                        Measurements
                    </Text>
                    <Text>Weight: 85 kg</Text>
                    <Text>Height: 186 cm</Text>
                    <Text>Waist: 96 cm</Text>
                    <Text>Neck: 50 cm</Text>
                </Box>
            </SimpleGrid>
            <Divider my="10" />
            <Box as="section">
                <Heading p="4">Goals</Heading>
                {hasGoals ? (
                    <SimpleGrid p="4" columns={[1, 2, 3]} spacing={10}>
                        {goals.map((goal, index) => (
                            <GoalCard
                                key={index}
                                title={goal.title}
                                description={goal.description}
                            />
                        ))}
                        {/* <GoalCard
                        title="Decrease calories"
                        description="1800 kcal per day"
                    />
                    <GoalCard
                        title="Gain Mucels"
                        description="40% of body mass"
                    />
                    <GoalCard
                        title="Decrease Fat %"
                        description="Fat % of 20%"
                    /> */}
                    </SimpleGrid>
                ) : (
                    <Box p="4">
                        <Text maxW="400" my="4">
                            Let Salvare help with your goals. Set you goals and
                            make Salvare help you react them.
                        </Text>
                        <Button>Set your goals</Button>
                    </Box>
                )}
            </Box>
            <Divider my="10" />
            <Box as="section" fontSize="xl" p="4" mt="10">
                <Heading>Diet settings</Heading>

                <Box>
                    <Text
                        fontSize="sm"
                        fontWeight="bold"
                        color="blue.500"
                        mt="4"
                    >
                        Macro Nutrients Distribution
                    </Text>
                    <UnorderedList>
                        <ListItem>
                            <Text>Needed Protin Fat: 20% / 360 kcal</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Protein: 50% / 360 kcal</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Carbs: 30% / 360 kcal</Text>
                        </ListItem>
                    </UnorderedList>
                </Box>
                <Box>
                    <Text
                        fontSize="sm"
                        fontWeight="bold"
                        color="blue.500"
                        mt="4"
                    >
                        Macro Intake per day
                    </Text>
                    <UnorderedList>
                        <ListItem>
                            <HStack spacing="4">
                                <Text as="span" d="inline" fontWeight="bold">
                                    Needed protein:
                                </Text>
                                <Text as="span" d="inline">
                                    {bodyWeight ?? 85}kg * 1.6g ={" "}
                                    {(bodyWeight ?? 85) * 1.6} grams per day g
                                </Text>
                            </HStack>
                        </ListItem>
                        <ListItem>
                            <Text>Protein: 50% / 360 kcal</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Carbs: 30% / 360 kcal</Text>
                        </ListItem>
                    </UnorderedList>
                </Box>
            </Box>
        </>
    )
}
