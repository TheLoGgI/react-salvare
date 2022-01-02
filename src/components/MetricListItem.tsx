import { Flex, ListItem, Text } from "@chakra-ui/react"

type MetricItemType = {
    type: string
    unit?: string
    metric: number | undefined
}

export function MetricListItem({ type, metric, unit }: MetricItemType) {
    return (
        <ListItem borderBottom="2px dashed lightgray">
            <Flex justify="space-between" py="2">
                <Text>{type}:</Text>
                {metric?.toFixed(2)} {unit}
            </Flex>
        </ListItem>
    )
}
