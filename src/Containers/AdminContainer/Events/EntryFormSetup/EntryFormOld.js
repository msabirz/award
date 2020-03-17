import React, { useState } from 'react';
import ReactDOM from "react-dom";
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../../../../App.css';
import {
  makeStyles,
  Card,
  CardContent,

} from '@material-ui/core';
import Form from "../../../../Components/formGenerationEngine";
import Title from '../../../../Components/Common/Title';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

function EntryFormOld(props) {
  const classes = useStyles();
  const [form, setValues] = useState({
    formId: '1'
  });

  const schema = {
    type: "object",
    required: ["employeeId", "mobileNumber", "gender"],
    properties: {
      employeeId: {
        type: "string",
        title: "Employee Id"
      },
      firstName: {
        type: "string",
        title: "First Name",
      },
      lastName: {
        type: "string",
        title: "Last Name",
      },
      email: {
        type: "string",
        title: "Email/User Name",
        format: "email"
      },
      mobileNumber: {
        type: "string",
        title: "Mobile No."
      },
      callbackNumber: {
        type: "string",
        title: "Callback No."
      },
      gender: {
        type: "string",
        title: "Gender",
        anyOf: [
          {
            type: "string",
            title: "Male",
            enum: ["Male"]
          },
          {
            type: "string",
            title: "Female",
            enum: ["Female"]
          }
        ]
      },
      status: {
        type: "string",
        title: "Status",
        disabled: false,
        anyOf: [
          {
            type: "string",
            title: "Active",
            enum: ["Active"]
          },
          {
            type: "string",
            title: "Inactive",
            enum: ["Inactive"]
          }
        ]
      },
      isMarried: {
        type: "boolean",
        title: "Are you married?"
      },
      multiSelect: {
        type: "array",
          minItems: 2,
          title: "A multiple-choice list",
          items: {
            type: "string",
            enum: ["foo", "bar", "fuzz", "qux"],
          },
      uniqueItems: true
      }
    }
  };

  const uiSchema = {

    status: {
      "ui:widget": "radio"
    },
    multiSelect: {
      "ui:widget": "checkboxes",
      "ui:options": {
        inline: true
      }
    },
  };

  const formData = {
    "employeeId": "",
    "firstName": "",
    "lastName": "",
    "email": "",
    "postalCode": "",
    "mobileNumber": "",
    "callbackNumber": "",
    "gender": "male",
    "status": "",
    "isMarried": false,
    "multiSelect":[]
  }

  const onSubmit = ({ formData }) => {
    console.log("Data submitted: ", formData);
  }

  return (
    <div className={classes.root}>
      <Card style={{ padding: 15 }}>
        <CardContent>
          <Title> Entry Form </Title>
          <Form
            schema={schema}
            formData={formData}
            onSubmit={formData => onSubmit(formData)}
            uiSchema={uiSchema} />
        </CardContent>
      </Card>
    </div>

  );
};

export default withRouter(connect(null)(EntryFormOld));
