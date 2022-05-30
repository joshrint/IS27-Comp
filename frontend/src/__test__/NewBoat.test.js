import { render, screen, fireEvent } from '@testing-library/react';
import NewBoat from '../NewBoat';

const show={
    show:true
}
const testGuides=[{
    id:99,
    guideName:"TestGuide1"
}]


describe("NewBoat", ()=> {
    // Test that the boatname input element rendered
    test("Contains the boatname input", () =>{
        render(<NewBoat showNewBoat= {show} guides={testGuides} />)
        const inputElement = screen.getByPlaceholderText(/Add boat name here.../i)
        expect(inputElement).toBeInTheDocument();
    })

    // Test that we are able to change the value of the input element
    test("Should be able to type into the input", async () =>{
        render(<NewBoat showNewBoat= {show} guides={testGuides} />)
        const inputElement = screen.getByPlaceholderText(/Add boat name here.../i)
        fireEvent.change(inputElement, { target: {value: "Test Boat 1"} })
        expect(inputElement.value).toBe("Test Boat 1")
    }) 
})