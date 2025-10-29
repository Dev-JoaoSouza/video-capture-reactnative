import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { styles } from './styles';
import { IButtonCamera } from './types';
import { TouchableOpacity } from 'react-native';

const ButtonCamera = ({name, func}: IButtonCamera) => {
    return(
        <TouchableOpacity onPress={func}>
            <MaterialCommunityIcons name={name} style={styles.icon}/>
        </TouchableOpacity>
    )
}

export { ButtonCamera }