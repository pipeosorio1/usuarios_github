import { StyleSheet } from 'react-native';

const HeaderStyles = StyleSheet.create({
  root: {
    backgroundColor: '#ffffff',
  },
  container: {
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    color: '#c61c7e',
    fontSize: 25,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});

export default HeaderStyles;
