import PropTypes from 'prop-types';
import { Field, Formik } from 'formik';
import {
  ScrollView,
} from 'react-native';
import * as Yup from 'yup';
import useToast from 'hooks/useToast';
import useApi from 'hooks/useApi';
import { endPoints, messages, pages } from 'constantes';
import { Button, Icon } from 'react-native-paper';
import HomeStyles from './styles/HomeStyles';
import { Table, TextField } from 'components';
import { useState } from 'react';
import Graphics from 'components/Graphics';

const initialValues = {
  user: '',
};

const validationSchema = Yup.object({
  user: Yup.string().required('El campo es requerido')
    .min(4, 'El campo debe tener al menos 4 caracteres')
    .notOneOf(['doublevpartners'], 'No se permite el texto "doublevpartners"'),
});

function Home({navigation}) {
  const { appError, appSuccess } = useToast();
  const { doGet } = useApi();
  const [users, setUsers] = useState([]);
  const [usersFilter, setUsersFilter] = useState({});

  const onSubmit = async (
    values: { user: string }
  ) => {
    try {
      const {
        user,
      } = values;

      const data = {
        q: user
      }

      const url = endPoints.github.search;
      const dataGithub = await doGet({ url, data });
      const items = dataGithub.items ?? [];
      
      if (items.length > 0) {
        setUsers(dataGithub.items ?? []);
        appSuccess(messages.github.search.success);
      } else {
        setUsers([]);
        setUsersFilter({});
        appError(messages.github.search.error);
      }

    } catch (error: any) {
      appError(error?.message || messages.dataFetch.fail);
    }
  };

  const getDataGraphic = async (dataTable) => {
    const dataGraphics = {
      labels:[],
      datasets: [
        {
          data: []
        }
      ]
    };

    const url = endPoints.github.users;

    for await (const data of dataTable) {
      dataGraphics.labels.push(data.login);
      const urlUser = `${url}/${data.login}`;
      const dataUser = await doGet({ url: urlUser });
      const { followers } = dataUser;
      dataGraphics.datasets[0].data.push(followers);
    }

    return dataGraphics;
  }

  const setDataGraphics = async (dataTable) => {
    try {
      const dataGraphics = await getDataGraphic(dataTable);
      setUsersFilter(dataGraphics);
    } catch (error: any) {
      appError(error?.message || messages.dataFetch.fail);
    }
  };

  const viewUser = (dataUser) => {
    navigation.replace(pages.USER, { dataUser });
  }

  return (
    <ScrollView style={HomeStyles.container}>
      <>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          >
          {({ handleSubmit, isSubmitting }) => (
            <>
              <Field
                label="Usuario GitHub"
                name="user"
                disabled={isSubmitting}
                component={TextField}
              />
              <Button
                icon={({ size, color }) => (
                  <Icon source="account-search" size={size} color={color} />
                )}
                mode="contained"
                onPress={() => handleSubmit()}
                disabled={isSubmitting}
              >
                Buscar
              </Button>
            </>
          )}
        </Formik>
        {users.length > 0 &&
        (
          <Table 
            items={users}
            dataFilter={setDataGraphics}
            onPress={viewUser}
            columns={
              [
                {text:'id', name:'id', type: 'text'},
                {text:'login', name:'login', type: 'text'},
                {text:'url', name:'html_url', type: 'url'},
                {text:'avatar', name:'avatar_url', type: 'img'}
              ]
            }
          />
        )}
        {Object.keys(usersFilter).length > 0 &&
        (
          <Graphics data={usersFilter}/>
        )}
      </>
    </ScrollView>
  );
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Home;
