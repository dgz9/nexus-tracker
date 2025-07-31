'use client'
import { Button } from "@heroui/react";

export default function SimpleTest() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Simple HeroUI Test</h1>
      
      <div className="space-y-4">
        <p>If the button below is styled, HeroUI is working:</p>
        
        <Button color="primary">
          HeroUI Primary Button
        </Button>
        
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Regular Tailwind Button
        </button>
      </div>
    </div>
  )
}