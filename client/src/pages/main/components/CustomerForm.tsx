import { Box, Snackbar, TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Person } from '@material-ui/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Urls } from '../../../networking/constants';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3),
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
  },
  field: {
    margin: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

function CustomerForm() {
  const classes = useStyles();
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [streetName, setStreetName] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (firstName && lastName && age && phoneNo && streetName && city) {
      const result = await fetch(`${Urls.baseUrl}${Urls.customers}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          city,
          age,
          phoneNo,
          streetName,
        }),
      });

      if (!result.ok) {
        setShowSnackbar(true);
        setSnackbarMessage('Something went wrong');
      } else {
        setShowSnackbar(true);
        setSnackbarMessage('Customer added successfully');
      }

      setAge('');
      setCity('');
      setPhoneNo('');
      setFirstName('');
      setLastName('');
      setStreetName('');
    }
  };

  return (
    <Box className={classes.root}>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Link to="/dashboard">
          <Button variant="contained" color="primary">
            Open Dashboard
          </Button>
        </Link>
      </Box>

      <Typography variant="h1" align="center" gutterBottom>
        Enter Customer Details
      </Typography>

      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          className={classes.field}
          label="First Name"
          variant="outlined"
          InputProps={{ startAdornment: <Person /> }}
          value={firstName}
          onChange={event => setFirstName(event.target.value)}
        />

        <TextField
          className={classes.field}
          label="Last Name"
          variant="outlined"
          InputProps={{ startAdornment: <Person /> }}
          value={lastName}
          onChange={event => setLastName(event.target.value)}
        />

        <TextField
          className={classes.field}
          label="Age"
          variant="outlined"
          InputProps={{ startAdornment: <Person /> }}
          value={age}
          onChange={event => setAge(event.target.value)}
        />

        <TextField
          className={classes.field}
          label="Phone Number"
          variant="outlined"
          InputProps={{ startAdornment: <Person /> }}
          value={phoneNo}
          onChange={event => setPhoneNo(event.target.value)}
        />

        <TextField
          className={classes.field}
          label="City"
          variant="outlined"
          InputProps={{ startAdornment: <Person /> }}
          value={city}
          onChange={event => setCity(event.target.value)}
        />

        <TextField
          className={classes.field}
          label="Street Name"
          variant="outlined"
          InputProps={{ startAdornment: <Person /> }}
          value={streetName}
          onChange={event => setStreetName(event.target.value)}
        />

        <Button className={classes.button} variant="contained" color="primary" type="submit">
          Save
        </Button>
      </form>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        message={snackbarMessage}
      />
    </Box>
  );
}

export default CustomerForm;
