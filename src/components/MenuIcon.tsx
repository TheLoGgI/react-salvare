import { IconButton } from "@chakra-ui/react"
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

type MenuIconPropsType = {
    icon: IconDefinition
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
        <Link className="menulink-symbol" to={to}>
            <IconButton
                colorScheme="teal"
                aria-label={label}
                size="lg"
                title={title}
                isRound
                icon={<FontAwesomeIcon color="#B4DCEC" icon={icon} />}
            />
        </Link>
    )
}
