import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { _entrantList } from '../../../Store/Entrant/EntrantAction';

function EntrantList(props) {
  // const [state, setState] = React.useState({
  // });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(_entrantList());
  }, []);
  console.log("data=>", props.entrantListData)

  return (
    <MaterialTable
      title="Entrant List"
      columns={[
        {
          title: 'Entrant ID',
          field: 'entrant_id'
        },
        {
          title: 'Entrant Email',
          field: 'entrant_system_email'
        },
        {
          title: 'Created Entries',
          field: 'created_entries',
        },
        {
          title: 'Submitted Entries',
          field: 'submitted_entries',
        },
      ]}
      data={[
        { entrant_id: 'Mehmet', entrant_system_email: 'Baran', created_entries: 1987, submitted_entries: 63 },
        { entrant_id: 'Zerya Betül', entrant_system_email: 'Baran', created_entries: 2017, submitted_entries: 34 },
      ]}
      // data={props.entrantListData}
      actions={[
        {
          icon: 'edit',
          tooltip: 'Edit Entrant',
          onClick: (rowData) => alert("You saved " + rowData.name)
        },
      ]}
      options={{
        actionsColumnIndex: -1
      }}
    />
  );
}

const mapStateToProps = state => {
  return {
    entrantListData: state.entry.entrantList
  }
}

export default withRouter(connect(mapStateToProps, { _entrantList })(EntrantList));