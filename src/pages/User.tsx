import PropTypes from 'prop-types';
import {
  ScrollView,
} from 'react-native';
import HomeStyles from './styles/HomeStyles';
import { ActivityIndicator, Avatar, Divider, MD2Colors, Surface, Text } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { endPoints } from 'constantes';
import useApi from 'hooks/useApi';

function User({route}) {
  const { doGet } = useApi();
  const [infoUser, infoUserSet] = useState({});

  const init = async () => {
    const { params:{ dataUser: data } } = route;
    
    const url = endPoints.github.users;
    const urlUser = `${url}/${data.login}`;
    const dataUser = await doGet({ url: urlUser });
    infoUserSet(dataUser);
  }
  
  useEffect(() => {
    init();
  }, [init]);

  return (
    <ScrollView style={HomeStyles.container}>
      {Object.keys(infoUser).length > 0 ?
      (
        <>
          <Surface style={{display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',}} elevation={1}>
            <Surface elevation={0}>
              <Avatar.Image size={100} source={{ uri: infoUser.avatar_url }} />
            </Surface>
            <Surface elevation={0}>
              <Text variant="headlineSmall">{infoUser.login}</Text>
            </Surface>
          </Surface>
          <Surface elevation={1}>
            <Text variant="titleLarge">name: {infoUser.name}</Text>
            <Divider />
            <Text variant="titleLarge">company: {infoUser.company}</Text>
            <Divider />
            <Text variant="titleLarge">bio: {infoUser.bio}</Text>
            <Divider />
            <Text variant="titleLarge">blog: {infoUser.blog}</Text>
            <Divider />
            <Text variant="titleLarge">location: {infoUser.location}</Text>
            <Divider />
            <Text variant="titleLarge">email: {infoUser.email}</Text>
            <Divider />
            <Text variant="titleLarge">twitter: {infoUser.twitter_username}</Text>
          </Surface>
        </>
      ) : 
      (
        <ActivityIndicator animating={true} color={MD2Colors.red800} />
      )
    }
    </ScrollView>
  );
}

User.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.object.isRequired,
};

export default User;
