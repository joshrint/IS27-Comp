import { fireEvent, render, screen } from '@testing-library/react';
import Home from '../Home';

describe('Home', () =>{
  //Test to ensure the new boat button renders.
  test('renders New Boat button', () => {
    render(<Home />);
    const linkElement = screen.getByText(/New Boat/i);
    expect(linkElement).toBeInTheDocument();
  });

  // Tests that clicking the new boat button opens the form and shows the Back button exists
  test('clicking New Boat button opens the new boat menu', () =>{
    render(<Home />);
    const newBoatButton = screen.getByRole('button', { name: /New Boat/i });
    fireEvent.click(newBoatButton);
    const newBoatForm = screen.getByRole('button', {name: /Back/i}); 
    expect(newBoatForm).toBeInTheDocument();
  });
});