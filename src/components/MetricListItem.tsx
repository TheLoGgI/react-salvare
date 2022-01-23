import { BoxProps, Flex, ListItem, Text, forwardRef } from "@chakra-ui/react"

type MetricItemType = {
    type: string
    unit?: string
    metric: number | undefined
    rest?: BoxProps
}

export const MetricListItem = forwardRef<MetricItemType, "li">(
    ({ type, metric, unit, ...rest }, ref) => (
        <ListItem borderBottom="2px dashed lightgray" ref={ref} {...rest}>
            <Flex justify="space-between" py="2">
                <Text>{type}:</Text>
                {metric?.toFixed(2)} {unit}
            </Flex>
        </ListItem>
    )
)
