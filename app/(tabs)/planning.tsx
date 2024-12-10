import { Text } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import Day from '@/components/ui/Day';

export default function Planning() {
    const colorScheme = useColorScheme();
    
    return (
        <>
            <Text>Planning</Text>
            <Day />
        </>
    );
}
