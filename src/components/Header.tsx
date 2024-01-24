import React from 'react';
import { Appbar } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { pages } from 'constantes';

function Header({ options, route, navigation }) {
  const title = getHeaderTitle(options, route.name);

  const { back = false } = options;

  return (
    <Appbar.Header>
      {back && (<Appbar.BackAction onPress={() => navigation.replace(pages.HOME)} />)}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}

export default Header;
