import {render, screen} from "@testing-library/react"
import App from "./App"

test("renders learn react link", () => {
    render(<App/>)
    // noinspection JSCheckFunctionSignatures
    const linkElement = screen.getByText(/Tutorial/i)
    expect(linkElement).toBeInTheDocument()
})