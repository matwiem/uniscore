import {
    Badge, Button,
    Card, CardBody, CardFooter,
    CardHeader,
    Heading,
    HStack,
    Stack, Stat, StatLabel, StatNumber, Text
} from '@chakra-ui/react'
import { CheckIcon, ViewOffIcon } from '@chakra-ui/icons'

import { type Discrepancy } from '../../api/discrepancies'
import { useCallback } from 'react'

interface DiscrepancyCardProps {
    discrepancy: Discrepancy
    onResolve?: (discrepancy: Discrepancy) => void
    onIgnore?: (discrepancy: Discrepancy) => void
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
    const { discrepancy, onResolve, onIgnore } = props

    const handleResolve = useCallback(() => {
        if (onResolve != null) {
            onResolve(discrepancy)
        }
    }, [discrepancy, onResolve])

    const handleIgnore = useCallback(() => {
        if (onIgnore != null) {
            onIgnore(discrepancy)
        }
    }, [discrepancy, onIgnore])

    return <Card
        direction={{
            base: 'column',
            sm: 'row'
        }}
        overflow="hidden"
        variant="outline"
        width={'full'}
        data-testid='discrepancy-card'
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
                <Button onClick={handleResolve} mr={3} aria-label='resolve-discrepancy' leftIcon={<CheckIcon />}>
                    Resolve
                </Button>
                <Button onClick={handleIgnore} aria-label='ignore-discrepancy' leftIcon={<ViewOffIcon />}>
                    Ignore
                </Button>
            </CardFooter>
        </Stack>
    </Card>
}
