import { ChakraProvider } from "@chakra-ui/react"
import React, { Suspense } from "react"
import ReactDOM from "react-dom"

import App from "./App"
import ThemeContext from "./context/ThemeContext"
import theme from "./theme"

const DataContext = React.lazy(() => import("./context/DataContext"))

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <ThemeContext>
                <Suspense fallback={<h1>Loading posts...</h1>}>
                    <DataContext>
                        <App />
                    </DataContext>
                </Suspense>
            </ThemeContext>
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById("root")
)
