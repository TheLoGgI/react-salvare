import { IconButton, useColorModeValue } from "@chakra-ui/react"
import {
    IconDefinition,
    IconName,
    IconPrefix,
} from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

type MenuIconPropsType = {
    icon: IconDefinition | [IconPrefix, IconName]
    to: string
    label?: string
    title: string
}

export default function MenuIcon({
    icon,
    to,
    label = "",
    title,
}: MenuIconPropsType) {
    // const text = useColorModeValue("#B4DCEC", "white")
    return (
        <Link className="menulink-symbol" to={to}>
            <IconButton
                colorScheme="teal"
                aria-label={label}
                size="lg"
                title={title}
                isRound
                icon={<FontAwesomeIcon icon={icon} />}
            />
        </Link>
    )
}
