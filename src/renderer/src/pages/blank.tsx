import { Link } from 'react-router-dom'
export function Blank() {
  return (
    <main className="flex-1 flex items-center justify-center text-rotion-400">
      Selecione ou crie um documento
      <p>
        <Link to="/document">acessar documento</Link>
      </p>
    </main>
  )
}
