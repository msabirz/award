import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { _entryList } from '../../../Store/Entry/EntryAction';

function EntryList(props) {
  // const [state, setState] = React.useState({
  // });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(_entryList());
  }, []);
  

  return (
    <MaterialTable
      title="Entry List"
      columns={[
        { 
            title: 'Name', 
            field: 'name',
            render: name => name.first_name +" "+ name.last_name,
          },
          // { 
          //   title: 'Mobile No.', 
          //   field: 'mobile' 
          // },
          { 
            title: 'Email Id', 
            field: 'email' 
          },
          { 
            title: 'Company Name', 
            field: 'company_name' 
          },
          { 
            title: 'Country', 
            field: 'country' 
          },
      ]}
    //   data={[
    //     { entrant_id: 'Mehmet', entrant_system_email: 'Baran', created_entries: 1987, submitted_entries: 63 },
    //     { entrant_id: 'Zerya Betül', entrant_system_email: 'Baran', created_entries: 2017, submitted_entries: 34 },
    //   ]}
      data={props.entryListData}
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
    entryListData: state.entry.entryList
  }
}

export default withRouter(connect(mapStateToProps, { _entryList })(EntryList));