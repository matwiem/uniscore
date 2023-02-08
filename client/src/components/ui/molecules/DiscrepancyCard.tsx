import {
    Badge, Button,
    Card, CardBody, CardFooter,
    CardHeader,
    Heading,
    HStack,
    Stack, Stat, StatLabel, StatNumber, Text
} from '@chakra-ui/react'
import { CheckIcon, ViewOffIcon } from '@chakra-ui/icons'

import { type Discrepancy } from '../../../api/discrepancies'

interface DiscrepancyCardProps {
    discrepancy: Discrepancy
}

type ChangeProps = Pick<Discrepancy, 'propertyChange'>

const Change: React.FC<ChangeProps> = (props) => {
    const { change, sourceValue } = props.propertyChange
    if (change.op === 'replace') {
        return (
            <Stat>
                <StatLabel>{change.path}</StatLabel>
                <StatNumber>{sourceValue} → {change.value}</StatNumber>
            </Stat>
        )
    }

    return <Text>Not implemented.</Text>
}

export const DiscrepancyCard: React.FC<DiscrepancyCardProps> = (props) => {
    const { discrepancy } = props

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
                    <Badge>{discrepancy.subjectType}</Badge>
                    <Heading size="sm">{props.discrepancy.subjectId}</Heading>
                </HStack>
            </CardHeader>
            <CardBody py={0}>
                <Change propertyChange={props.discrepancy.propertyChange} />
            </CardBody>

            <CardFooter>
                <Button mr={3} aria-label='resolve-discrepancy' leftIcon={<CheckIcon />}>
                    Resolve
                </Button>
                <Button aria-label='ignore-discrepancy' leftIcon={<ViewOffIcon />}>
                    Ignore
                </Button>
            </CardFooter>
        </Stack>
    </Card>
}
