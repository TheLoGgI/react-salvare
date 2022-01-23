import {
    Box,
    Button,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    useBoolean,
} from "@chakra-ui/react"
import { MouseEventHandler, useCallback, useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as Realm from "realm-web"

// Realm.getApp().logout()
import { useCurrentUser } from "../context/userContext"

type ModalProps = {
    isOpen: boolean
    onOpen?: () => void
    onClose: () => void
}

type Inputs = {
    fullname: string
    email: string
    password: string
}

async function useMongoAnonymousConnect() {
    const app = new Realm.App({ id: "salvare-foodapp-iwodd" })

    const credentials = Realm.Credentials.anonymous()
    console.log("credentials: ", credentials)

    try {
        const user = await app.logIn(credentials)
        const insertUser = await user.functions.insertUser({
            username: "Lasse Aakjær",
            email: "lasse_aakjaer@hotmail.com",
        })
        console.log("insertUser: ", insertUser)
        console.log("user: ", user)
        const usersData = await user.functions.getUsers()
        console.log("usersData: ", usersData)
    } catch (err) {
        console.error("Failed to log in", err)
    }
}

function LoginContent(props: {
    setIsLogin: { toggle: MouseEventHandler<HTMLButtonElement> }
    onClose: () => void
}) {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<Inputs>()
    const [show, setShow] = useBoolean()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const app = new Realm.App({ id: "salvare-foodapp-iwodd" })
        const credentials = Realm.Credentials.emailPassword(
            data.email,
            data.password
        )

        try {
            await app.logIn(credentials)
            props.onClose()
        } catch (err) {
            setError("email", {
                type: "login failed",
                message: "Check your email and try again",
            })
            setError("password", {
                type: "login failed",
                message: "Check Password and try again",
            })
        }
    }

    return (
        <ModalContent>
            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={8}>
                        <FormControl>
                            <FormLabel htmlFor="email">Email address</FormLabel>
                            <Input
                                id="email"
                                type="email"
                                autoComplete="email"
                                {...register("email", { required: true })}
                            />
                            {errors.email?.type && (
                                <FormHelperText color="red.500">
                                    {errors.email.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Box>
                            <FormControl>
                                <FormLabel htmlFor="password">
                                    Password
                                </FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        {...register("password", {
                                            required: true,
                                        })}
                                        pr="4.5rem"
                                        type={show ? "text" : "password"}
                                        placeholder="Enter password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button
                                            h="1.75rem"
                                            size="sm"
                                            onClick={setShow.toggle}
                                        >
                                            {show ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                {errors.password?.type && (
                                    <FormHelperText color="red.500">
                                        {errors.password.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Box>
                    </Stack>
                    <Input
                        bg="teal"
                        color="white"
                        w="full"
                        type="submit"
                        value="Login"
                        mt="8"
                        cursor="pointer"
                    />
                </form>
            </ModalBody>
            <ModalFooter>
                <Flex justify="center" w="full">
                    <Button
                        as="a"
                        colorScheme="teal"
                        variant="ghost"
                        w="full"
                        mr={3}
                        cursor="pointer"
                        onClick={props.setIsLogin.toggle}
                    >
                        Register
                    </Button>
                </Flex>
            </ModalFooter>
        </ModalContent>
    )
}

// async function linkAccounts(user: Realm.User, email: string, password: string) {
//     const emailPasswordUserCredentials = Realm.Credentials.emailPassword(
//       email,
//       password
//     );
//     await user.linkCredentials(emailPasswordUserCredentials);
//   }

function RegisterContent(props: { setIsLogin: any }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    const [show, setShow] = useBoolean()
    console.log("errors: ", errors)

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const app = new Realm.App({ id: "salvare-foodapp-iwodd" })

        // `App.currentUser` updates to match the logged in user
        // assert(user.id === app.currentUser.id);

        try {
            await app.emailPasswordAuth
                .registerUser({
                    email: data.email,
                    password: data.password,
                })
                .then((user) => {
                    console.log("user: ", user)
                })

            const credentials = Realm.Credentials.emailPassword(
                data.email,
                data.password
            )

            const currentUser = await app.logIn(credentials)
            const mongodb = app.currentUser?.mongoClient("mongodb-atlas")

            await mongodb?.db("salvare").collection("users").insertOne({
                uid: currentUser?.id,
                username: data.fullname,
                email: data.email,
                favoriteRecipes: [],
            })

            props.setIsLogin.toggle()
        } catch (err) {
            console.error("Failed to log in", err)
        }
    }

    return (
        <ModalContent>
            <ModalHeader>Register</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={8}>
                        <FormControl>
                            <FormLabel htmlFor="fullname">Full name</FormLabel>
                            <Input
                                {...register("fullname", {
                                    required: true,
                                })}
                                placeholder="Enter name or a nickname"
                                id="fullname"
                                name="fullname"
                                size="md"
                            />
                            <FormHelperText>
                                Your name is also be your username
                            </FormHelperText>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="email">Email address</FormLabel>
                            <Input
                                id="email"
                                type="email"
                                autoComplete="email"
                                {...register("email", {
                                    required: true,
                                })}
                            />
                            <FormHelperText>
                                We'll never share your email.
                            </FormHelperText>
                        </FormControl>
                        <Box>
                            <FormControl>
                                <FormLabel htmlFor="password">
                                    Password
                                </FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        {...register("password", {
                                            required: true,
                                            minLength: 8,
                                        })}
                                        pr="4.5rem"
                                        type={show ? "text" : "password"}
                                        placeholder="Enter password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button
                                            h="1.75rem"
                                            size="sm"
                                            onClick={setShow.toggle}
                                        >
                                            {show ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                {errors.password?.type && (
                                    <FormHelperText color="red.500">
                                        {errors.password?.type ===
                                            "minLength" &&
                                            "Password has to be at least 8 charectors long"}{" "}
                                        {errors.password.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Box>
                    </Stack>
                    <Input
                        bg="teal"
                        color="white"
                        w="full"
                        type="submit"
                        value="Register"
                        mt="8"
                        cursor="pointer"
                    />
                </form>
            </ModalBody>
            <ModalFooter>
                <Flex justify="center" w="full">
                    <Button
                        as="a"
                        colorScheme="teal"
                        variant="ghost"
                        mr={3}
                        w="full"
                        cursor="pointer"
                        onClick={props.setIsLogin.toggle}
                    >
                        Login
                    </Button>
                </Flex>
            </ModalFooter>
        </ModalContent>
    )
}

export function LoginModal({ isOpen, onOpen, onClose }: ModalProps) {
    // const users = mongodb?.db("salvare").collection("users")
    // const anonymousUser = useMongoAnonymousConnect()
    // console.log('anonymousUser: ', anonymousUser);

    // realmConnect()
    // const { data, ...rest } = useFetch()

    // console.log("data: ", data, rest)

    const [isLogin, setIsLogin] = useBoolean(true)

    return (
        <Modal onClose={onClose} size="md" isOpen={isOpen}>
            <ModalOverlay />
            <LoginContent setIsLogin={setIsLogin} onClose={onClose} />
            {!isLogin && <RegisterContent setIsLogin={setIsLogin} />}
        </Modal>
    )
}
