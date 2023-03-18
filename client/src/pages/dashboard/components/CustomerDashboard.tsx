import { Snackbar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useEffect, useState } from 'react';
import { Urls } from '../../../networking/constants';
import CustomerEditForm from './EditForm';

const useStyles = makeStyles(theme => ({
  overLay: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(39, 39, 39, 0.9)',
    zIndex: 10,
  },
  root: {
    flexGrow: 1,
    margin: 'auto',
    maxWidth: 800,
    marginTop: '5rem',
    padding: theme.spacing(2),
    backgroundColor: 'orange',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  header: {
    textAlign: 'center',
    margin: 'auto',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    width: 'fit-content',
    padding: theme.spacing(0.5, 1),
  },
}));

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  phoneNo: string;
  customerAddress: {
    city: string;
    streetName: string;
  };
}

export default function Dashboard() {
  const classes = useStyles();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customersCount, setCustomersCount] = useState(0);
  const [editClicked, setEditClicked] = useState(false);
  const [currentEditCustomer, setCurrentEditCustomer] = useState(0);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    // Fetch the list of customers from the API here
    const fetchCustomers = async () => {
      const response = await fetch('http://localhost:8000/customers');
      const data = await response.json();
      setCustomers(data);
      setCustomersCount(data.length);
    };
    fetchCustomers();
  }, []);

  const handleDelete = (customerId: number) => {
    (async () => {
      await fetch(`${Urls.baseUrl}${Urls.customers}/${customerId}`, {
        method: 'DELETE',
      });
    })();
    const index = customers.findIndex(i => i.id === customerId);
    customers.splice(index, 1);
    setCustomersCount(customersCount - 1);
  };

  const handleEdit = (
    firstName: string,
    lastName: string,
    age: string,
    city: string,
    streetName: string,
    phoneNo: string
  ) => {
    (async () => {
      const results = await fetch(`${Urls.baseUrl}${Urls.customers}/${currentEditCustomer}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          age,
          city,
          streetName,
          phoneNo,
        }),
      });

      if (!results.ok) {
        setShowSnackbar(true);
        setSnackbarMessage('Something went wrong');
      } else {
        const jsonResult = await results.json();
        const index = customers.findIndex(i => i.id === jsonResult.id);
        customers[index] = jsonResult;
        setCustomers(customers);
        setEditClicked(false);
        setShowSnackbar(true);
        setSnackbarMessage('Update Successfull');
      }
    })();
  };

  return (
    <div className={classes.root}>
      {editClicked ? (
        <>
          <div className={classes.overLay} onClick={() => setEditClicked(false)} />
          <CustomerEditForm onEditClicked={handleEdit} />
        </>
      ) : (
        <></>
      )}
      <Typography variant="h5" component="h2" className={classes.header}>
        Total Customers {customersCount}
      </Typography>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        message={snackbarMessage}
      />
      <Grid container spacing={3}>
        {customers.map(customer => (
          <Grid item xs={12} key={customer.id}>
            <Paper className={classes.paper}>
              <Typography variant="h6" component="h3">
                Customer ID: {customer.id}
              </Typography>
              <Typography variant="subtitle1" component="p">
                First Name: {customer.firstName}
              </Typography>
              <Typography variant="subtitle1" component="p">
                Last Name: {customer.lastName}
              </Typography>
              <Typography variant="subtitle1" component="p">
                Age: {customer.age}
              </Typography>
              <Typography variant="subtitle1" component="p">
                Phone Number: {customer.phoneNo}
              </Typography>
              <Typography variant="subtitle1" component="p">
                City: {customer.customerAddress.city}
              </Typography>
              <Typography variant="subtitle1" component="p">
                Street Name: {customer.customerAddress.streetName}
              </Typography>
              <IconButton aria-label="delete" onClick={() => handleDelete(customer.id)}>
                <DeleteIcon />
              </IconButton>
              <IconButton
                aria-label="edit"
                onClick={() => {
                  setCurrentEditCustomer(customer.id);
                  setEditClicked(true);
                }}
              >
                <EditIcon />
              </IconButton>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
