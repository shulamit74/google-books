import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import BookList from './containers/BookList/BookList';
import Cart from './containers/BookList/Cart';

function App() {
  return (
    <Router basename='/google-books'>
    <Routes>
      <Route path="/" exact element={<BookList />} />
      <Route path="/cart" exact element={<Cart />} />
    </Routes>
  </Router>
    
  );
}

export default App;
