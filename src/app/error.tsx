'use client'

import { Button } from "@/components/ui/button"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <h2 className="text-2xl font-bold">Une erreur s'est produite</h2>
        <p className="mt-2 text-gray-600">
          Nous sommes désolés, mais quelque chose s'est mal passé.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button onClick={() => reset()}>Réessayer</Button>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            Retour à l'accueil
          </Button>
        </div>
      </div>
    </div>
  )
} 