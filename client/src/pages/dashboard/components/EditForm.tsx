import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    position: 'absolute',
    zIndex: 20,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    maxWidth: 500,
    margin: '0 auto',
    backgroundColor: 'orange',
    marginTop: theme.spacing(4),
  },
  textField: {
    backgroundColor: 'grey',
    color: 'white',
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const CustomerEditForm = (props: {
  onEditClicked: (
    firstName: string,
    lastName: string,
    age: string,
    city: string,
    streetName: string,
    phoneNumber: string
  ) => void;
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [streetName, setStreetName] = useState('');

  const classes = useStyles();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onEditClicked(firstName, lastName, age, city, streetName, phoneNo);
    setFirstName('');
    setLastName('');
    setAge('');
    setCity('');
    setPhoneNo('');
    setStreetName('');
  };

  return (
    <Paper className={classes.root} elevation={3}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          variant="outlined"
          className={classes.textField}
          value={firstName}
          onChange={event => setFirstName(event.target.value)}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          className={classes.textField}
          value={lastName}
          onChange={event => setLastName(event.target.value)}
        />
        <TextField
          label="Age"
          variant="outlined"
          type="number"
          className={classes.textField}
          value={age}
          onChange={event => setAge(event.target.value)}
        />
        <TextField
          label="City"
          variant="outlined"
          className={classes.textField}
          value={city}
          onChange={event => setCity(event.target.value)}
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          type="number"
          className={classes.textField}
          value={phoneNo}
          onChange={event => setPhoneNo(event.target.value)}
        />
        <TextField
          label="Street Name"
          variant="outlined"
          className={classes.textField}
          value={streetName}
          onChange={event => setStreetName(event.target.value)}
        />
        <Button variant="contained" color="primary" type="submit" className={classes.button}>
          Save
        </Button>
      </form>
    </Paper>
  );
};

export default CustomerEditForm;
