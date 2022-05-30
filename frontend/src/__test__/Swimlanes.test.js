import { render, screen } from '@testing-library/react';
import Swimlanes from '../Swimlanes';

const testBoat = [{boatName:"TestBoat", guideName:"Test Guide", swimlaneID: 0, id:98},{boatName:"Test Boat2", guideName:"Test Guide", swimlaneID: 0, id:99}]

describe("Swimlanes", ()=>{
    //Pass Props to swimlane component and renders all items.
    test('Renders the card with props', async () =>{
        render(<Swimlanes boats={testBoat} />);
        const cardHeader = screen.getByText(/TestBoat/i);
        expect(cardHeader).toBeInTheDocument();
    })

    //Tests that the card list renders multiple cards
    test('Renders the list items for the boat card', async () =>{
        render(<Swimlanes boats={testBoat} />);
        const cardHeaders = screen.getAllByRole("heading")
        expect(cardHeaders.length).toBe(2);
    })

})