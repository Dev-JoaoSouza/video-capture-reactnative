import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ComponentProps } from 'react';

export interface IButtonCamera {
    name: ComponentProps<typeof MaterialCommunityIcons>['name'];
    func: () => void;
}