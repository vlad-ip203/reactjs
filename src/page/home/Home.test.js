import {render, screen} from "@testing-library/react"
import Home from "./Home"

test("renders learn react link", () => {
    render(<Home/>)
    // noinspection JSCheckFunctionSignatures
    const linkElement = screen.getByText(/Tutorial/i)
    expect(linkElement).toBeInTheDocument()
})