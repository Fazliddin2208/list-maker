import React from 'react';
import Categories from './components/Categories';
import { Route, Routes} from 'react-router-dom'
import Category from './components/Category';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="/category/:id" element={<Category />} />
      </Routes>
    </div>
  );
}

export default App;
