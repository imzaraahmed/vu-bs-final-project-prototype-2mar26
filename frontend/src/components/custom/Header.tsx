import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">My App</h1>

        <nav className="flex gap-4">
          <Link to="/">
            <Button variant="ghost">Home</Button>
          </Link>

          <Link to="/about">
            <Button variant="ghost">About</Button>
          </Link>

          <Link to="/contact">
            <Button variant="ghost">Contact</Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}