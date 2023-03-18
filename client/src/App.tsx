import { BrowserRouter, Route } from 'react-router-dom';
import CustomerDashBoard from './pages/dashboard/components/CustomerDashboard';
import CustomerForm from './pages/main/components/CustomerForm';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" exact component={CustomerForm} />
        <Route path="/dashboard" exact component={CustomerDashBoard} />
      </div>
    </BrowserRouter>
  );
}

export default App;
