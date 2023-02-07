import {
    Badge, Button,
    Card, CardBody, CardFooter,
    CardHeader,
    Heading,
    HStack,
    Stack, Text
} from '@chakra-ui/react'
import { CheckIcon, ViewOffIcon } from '@chakra-ui/icons'

import { type Discrepancy } from '../../api/discrepancies'

interface DiscrepanciesListItemProps {
    discrepancy: Discrepancy
}

type ChangeProps = Pick<Discrepancy, 'propertyChange'>

const Change: React.FC<ChangeProps> = (props) => {
    const { change, sourceValue } = props.propertyChange
    if (props.propertyChange.change.op === 'replace') {
        return <>
            <Text>property: {change.path}</Text>
            <Text>change: {sourceValue} {'=>'} {change.value}</Text>
        </>
    }

    return <Text>Not implemented.</Text>
}

export const DiscrepanciesListItem: React.FC<DiscrepanciesListItemProps> = (props) => {
    return <Card
        direction={{
            base: 'column',
            sm: 'row'
        }}
        overflow="hidden"
        variant="outline"
        width={'full'}
    >
        <Stack>
            <CardHeader>
                <HStack>
                    <Badge>{props.discrepancy.subjectType}</Badge>
                    <Heading size="sm">{props.discrepancy.subjectId}</Heading>
                </HStack>
            </CardHeader>
            <CardBody py={0}>
                <Change propertyChange={props.discrepancy.propertyChange} />
            </CardBody>

            <CardFooter>
                <Button aria-label='resolve-discrepancy' leftIcon={<CheckIcon />}>
                    Resolve
                </Button>
                <Button aria-label='ignore-discrepancy' leftIcon={<ViewOffIcon />}>
                    Ignore
                </Button>
            </CardFooter>
        </Stack>
    </Card>
}
