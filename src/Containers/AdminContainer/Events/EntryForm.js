import React, { useState , useEffect} from 'react';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  makeStyles,
  Card,
  CardContent,
  Button,
} from '@material-ui/core';
import 'date-fns';
import Title from '../../../Components/Common/Title';
import Axios from 'axios';
import { base_url } from '../../../Config/AppConfig';
import { getHeaders } from '../../../Store/Common/Common';
import CustomTextfield from '../../../Components/EntryForm/CustomTextfield';
// import TextfieldComponent from './EntryForm/TextfieldComponent';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  Grid: {
    textAlign: "center",
  },
  grid: {
    width: '100%',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function EntryForm(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [jsonData, setValues] = useState([]);

  useEffect(() => {
    entryFormData();
  },[]);



  const entryFormData= async () =>{

     const response = await Axios.post(base_url+'event_form/getEventForm',
     {"event_id":props.history.location.state.id},
     {headers:getHeaders()}
     );

      if(response.status === 200){
        if(response.data.success === true){
          setValues(response.data.data.form_json)
        }
      }else{
        alert('INTERNAL SERVER ERROR');
      }
      
  }

  const updateField = index => e => {   
    let newArr = [...jsonData]; 
    newArr[index].value = e.target.value; 
    setValues(newArr);
  };

  const onSubmit = (event, props) => {
    event.preventDefault();
    console.log("formdata",jsonData)

  };

  const showFormFields = (data,index)=>{
    switch (data.type) {
      case ("text"): return <CustomTextfield formData={data} updateField={updateField(index)} />
      case ("email"): return <CustomTextfield formData={data} updateField={updateField(index)}/>
      default: return null 
    }
  }


  return (
    <div className={classes.root}>
      <Card style={{ padding: 15 }}>
        <CardContent>
          <Title> Add Event Entry Form</Title>
          <form onSubmit={onSubmit}>

          {jsonData.map((data, index) =>showFormFields(data,index))}
          <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>Submit</Button>
          </form>
        </CardContent>
      </Card>

    </div>
  );
}
export default withRouter(connect(null, {})(EntryForm));
