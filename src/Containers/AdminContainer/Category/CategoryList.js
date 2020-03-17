import React,{useEffect,useState} from 'react';
import {
  makeStyles,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Snackbar
} from '@material-ui/core';
import MySnackbarContentWrapper from '../../../Components/Common/MySnackbarContentWrapper';
import MaterialTable from 'material-table';
import {connect, useDispatch} from 'react-redux';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import { base_url } from '../../../Config/AppConfig';
import { getHeaders } from '../../../Store/Common/Common';


const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
  }));


function CategoryList(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [ form, setValues ] = useState({
      category_name:"",
      CategoryListData:[],
      categoryNameError: false,
      categoryUpdateError: false
    });


    const handleClickOpen = () => {
      setOpen(true);
    }
  
    const handleClose = () => {
      setOpen(false);
    }
    useEffect(() => {
      categoryList();
    },[]);

    const categoryList= () =>{
      new Promise(function(resolve,reject){
        Axios.post(base_url+'category/list',{},{headers:getHeaders()})
        .then(response=>{
          resolve(response);
            setValues({
              ...form,
              CategoryListData: response.data.data
            })
        })
        .catch(err=>{
          reject(err);
        })
        });
    }

    const handleCloseSnackBar =(event, reason)=> {
      if (reason === 'clickaway') {
        return;
      }
      setValues({
        ...form,
        categoryUpdateError: false
      })
    }

    const updateField = (e) => {
      setValues({
        ...form,
        [e.target.name]: e.target.value
      });
    };
  
    // Category Submit
    const onSubmit = (event, props) => {
      event.preventDefault();

      const data = {
        category_name: form.category_name,
      };

      new Promise(function(resolve,reject){
        Axios.post(base_url+'category/is_already_exist',data,{headers:getHeaders()})
      .then(response=>{
        if(response.data.success){
          setValues({
            ...form,
            category_name:"",
            categoryNameError: true
          });
          resolve(response);
        }else{
          submit();
          resolve(response);
        }

      })
      .catch(err=>{
        reject(err);
        setValues({
          ...form,
          categoryNameError: true
        });
        
      })

      });
    };

    const submit = ()=>{
      const data = {...form};

      new Promise(function(resolve,reject){
        Axios.post(base_url+'category/store',data,{headers:getHeaders()})
      .then(response=>{
        resolve(response);
        categoryList();
      })
      .catch(err=>{
        reject(err);
      })
      });

   setOpen(false);
    }

    // category submit end


    // category update
    const updateCategory = row => {
      const data={
        id: row.id,
        category_name: row.name,
      }

      new Promise(function(resolve,reject){
        Axios.post(base_url+'category/is_already_exist',data,{headers:getHeaders()})
      .then(response=>{ 
        if(response.data.success == true){
          setValues({
            ...form,
            category_name:"",
            categoryUpdateError: true
          });
          resolve(response);
        }else{
          new Promise(function(resolve,reject){
            Axios.post(base_url+'category/update',data,{headers:getHeaders()})
          .then(response=>{
            resolve(response);
          })
          .catch(err=>{
            reject(err);
          })
          });
          resolve(response);
        }

      })
      .catch(err=>{
        reject(err);
      })

      });
    }
    // category submit end

    // category delete
    const deleteCategory = row => {
      const data={
        id: row.id,
      }
      new Promise(function(resolve,reject){
        Axios.post(base_url+'category/delete',data,{headers:getHeaders()})
      .then(response=>{
        resolve(response);
      })
      .catch(err=>{
        reject(err);
      })
      });
    }
    // category delete end

    return (
    <div>
      <Paper className={classes.root}>
        <MaterialTable
        title="Category List"
        columns={[
              { 
                title: 'Name', 
                field: 'name' 
              },
        ]}  
        data={form.CategoryListData}    
        actions={[
          {
            icon: ()=><Button variant="contained" color="secondary" > Add Category </Button> ,
            tooltip: 'Add Category',
            isFreeAction: true,
            onClick: () => handleClickOpen()
          },
        ]}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const CategoryListData = form.CategoryListData;
                  const index = CategoryListData.indexOf(oldData);
                  CategoryListData[index] = newData;
                  updateCategory(newData,() => resolve());
                  setValues({ ...form,CategoryListData }, () => resolve());
                }
                resolve()
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  let CategoryListData = form.CategoryListData;
                  const index = CategoryListData.indexOf(oldData);
                  CategoryListData.splice(index, 1);
                  setValues({ ...form, CategoryListData }, () => resolve());
                  deleteCategory(oldData,() => resolve());
                }
                resolve()
              }, 1000)
            }),
        }}
        options={{
          actionsColumnIndex: -1
        }}
      />
      </Paper>
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
        <DialogTitle id="form-dialog-title">Add Event Category</DialogTitle>
        <form onSubmit={onSubmit}>
        <DialogContent>
        <TextField
								required
								fullWidth
								id="category_name"
								label="Category Name"
								name="category_name"
								autoComplete="category_name"
								value={form.category_name}
                onChange={updateField}
							/>
              {form.categoryNameError? 
              <div style={{color:"red"}}>
                Category Name already exits
              </div>
              : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Add Category
          </Button>
        </DialogActions>
        </form>
      </Dialog>

      {form.categoryUpdateError ? 
				<Snackbar
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right'
					}}
					open={form.categoryUpdateError}
					autoHideDuration={6000}
					onClose={handleCloseSnackBar}
				>
					<MySnackbarContentWrapper
						onClose={handleCloseSnackBar}
						variant="error"
						message="Category Already Exist"
					/>
				</Snackbar>
			: null}
    </div>
    );
  }

const mapStateToProps =state=>{
  return{
  //  entryListData: state.entry.entryList
  }
}

export default withRouter(connect(mapStateToProps)(CategoryList));