'use client'
import { Button, Card, CardBody } from "@heroui/react";

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Tailwind CSS v4 + HeroUI + Next.js Test
        </h1>
        
        <Card className="mb-4">
          <CardBody>
            <p className="text-gray-700 dark:text-gray-300">
              This is a test page to verify that Tailwind CSS v4 and HeroUI are working correctly.
            </p>
          </CardBody>
        </Card>
        
        <div className="flex gap-4">
          <Button color="primary">Primary Button</Button>
          <Button color="secondary">Secondary Button</Button>
          <Button color="success">Success Button</Button>
        </div>
        
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="bg-blue-500 text-white p-4 rounded">Blue Box</div>
          <div className="bg-green-500 text-white p-4 rounded">Green Box</div>
          <div className="bg-red-500 text-white p-4 rounded">Red Box</div>
        </div>
      </div>
    </div>
  );
}