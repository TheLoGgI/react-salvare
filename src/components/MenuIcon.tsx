import { IconButton } from "@chakra-ui/react"
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
    return (
        <Link to={to}>
            <IconButton
                aria-label={label}
                size="lg"
                title={title}
                isRound
                color="buttonIcon"
                bg={"buttonBg"}
                _hover={{ bg: "buttonBgHover" }}
                icon={<FontAwesomeIcon icon={icon} />}
            />
        </Link>
    )
}
