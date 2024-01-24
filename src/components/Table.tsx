import { useState, useEffect } from 'react';
import { Avatar, DataTable } from 'react-native-paper';
import PropTypes from 'prop-types';
import { Linking, Text, TouchableOpacity } from 'react-native';
import useToast from 'hooks/useToast';
import { messages } from 'constantes';

const Table = ({items, columns, dataFilter, onPress}) => {
  const { appError } = useToast();
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([10, 50, 100]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);
  const data = items.slice(from, to);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  useEffect(() => {
    if (dataFilter) {
      dataFilter(data);
    }
  }, [items, page, itemsPerPage]);

  const openUrl = async (url) => {
    await Linking.openURL(url);
  }

  const componentCell = (item, column) => {
    let componente;
    if (column.type === 'text') {
      componente=item[column.name];
    }else if (column.type === 'img'){
      componente=(
        <Avatar.Image size={40} source={{ uri: item[column.name] }} />
      );
    }else if (column.type === 'url'){
      componente=(
        <TouchableOpacity
          onPress={() => {
            openUrl(item[column.name]);
          }}
        >
          <Text style={{ fontWeight: 'bold', color: '#8AB4F7' }}>
            {item[column.text]}
          </Text>
        </TouchableOpacity>
      );
    }
    return componente;
  }

  return (
    <DataTable>
      <DataTable.Header>
        {columns.map((column, index) => (
          <DataTable.Title key={`title-${column.name}-${index}`}>{column.text}</DataTable.Title>
        ))}
      </DataTable.Header>

      {data.map((item, indexItem) => (
        <DataTable.Row key={`row-${item.name}-${indexItem}`}>
          {columns.map((column, index) => (
            <DataTable.Cell 
              key={`cell-${item.name}-${column.name}-${index}`} 
              onPress={() => onPress(item)} 
            >
              {componentCell(item, column)}
            </DataTable.Cell>
          ))}
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />
    </DataTable>
  );
};

Table.propTypes = {
  items: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  dataFilter: PropTypes.func,
  onPress: PropTypes.func,
};

export default Table;