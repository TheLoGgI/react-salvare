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
import { useCurrentUser, useRealmApp } from "../context/userContext"

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

function useAnonymousLogin() {
    const app = new Realm.App({ id: "salvare-foodapp-iwodd" })

    const credentials = Realm.Credentials.anonymous()

    useEffect(() => {
        app.logIn(credentials)
            .then((user) => {
                console.log(user)
            })
            .catch((error) => {
                console.log(error)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return app.currentUser
}

export async function linkAccounts(
    user: Realm.User,
    email: string,
    password: string
) {
    const emailPasswordUserCredentials = Realm.Credentials.emailPassword(
        email,
        password
    )
    await user.linkCredentials(emailPasswordUserCredentials)
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
    const app = useRealmApp()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const credentials = Realm.Credentials.emailPassword(
            data.email,
            data.password
        )

        try {
            const user = await app.logIn(credentials)
            const insertUser = await user.functions.insertUser({
                username: "username",
                email: data.email,
            })
            console.log("insertUser: ", insertUser)
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

function RegisterContent(props: {
    setIsLogin: any
    // anonymousUser?: Realm.User
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    const [show, setShow] = useBoolean()
    console.log("errors: ", errors)
    const app = useRealmApp()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log("app: ", app)

        try {
            await app.emailPasswordAuth.registerUser({
                email: data.email,
                password: data.password,
            })

            // TODO: sync user with realm

            // const linkedAccount = await linkAccounts(app.currentUser, data.email, data.password)
            // console.log('linkedAccount: ', linkedAccount);

            // const currentUser = await app.logIn(credentials)
            // const mongodb = app.currentUser?.mongoClient("mongodb-atlas")

            // console.log(
            //     await mongodb?.db("salvare").collection("users").insertOne({
            //         // uid: currentUser?.id,
            //         username: data.fullname,
            //         email: data.email,
            //         favoriteRecipes: [],
            //     })
            // )

            props.setIsLogin.toggle()
        } catch (err) {
            console.error("Failed to registering new user", err)
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
                        w="full"
                        bg="buttonSubmit"
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
    // useAnonymousLogin()

    const [isLogin, setIsLogin] = useBoolean(true)
    const [isPopoverOpen, setIsPopoverOpen] = useBoolean(false)

    return (
        <Modal onClose={onClose} size="md" isOpen={isOpen}>
            <ModalOverlay />
            <LoginContent setIsLogin={setIsLogin} onClose={onClose} />
            {!isLogin && (
                <RegisterContent
                    // anonymousUser={anonymousUser}
                    setIsLogin={setIsLogin}
                />
            )}
        </Modal>
    )
}
