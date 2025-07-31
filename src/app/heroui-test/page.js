'use client'

import { Button, Card, CardBody, CardHeader, Chip, Avatar, Divider } from "@heroui/react";

export default function HeroUITest() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8">HeroUI Component Test</h1>
        
        {/* Buttons Test */}
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold">Buttons</h2>
          </CardHeader>
          <CardBody>
            <div className="flex flex-wrap gap-4">
              <Button color="primary">Primary</Button>
              <Button color="secondary">Secondary</Button>
              <Button color="success">Success</Button>
              <Button color="warning">Warning</Button>
              <Button color="danger">Danger</Button>
              <Button variant="bordered">Bordered</Button>
              <Button variant="light">Light</Button>
              <Button variant="flat">Flat</Button>
              <Button variant="faded">Faded</Button>
              <Button variant="shadow">Shadow</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </CardBody>
        </Card>

        {/* Chips Test */}
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold">Chips</h2>
          </CardHeader>
          <CardBody>
            <div className="flex flex-wrap gap-4">
              <Chip>Default</Chip>
              <Chip color="primary">Primary</Chip>
              <Chip color="secondary">Secondary</Chip>
              <Chip color="success">Success</Chip>
              <Chip color="warning">Warning</Chip>
              <Chip color="danger">Danger</Chip>
            </div>
          </CardBody>
        </Card>

        {/* Avatar Test */}
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold">Avatars</h2>
          </CardHeader>
          <CardBody>
            <div className="flex gap-4 items-center">
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              <Avatar name="Jane Doe" />
              <Avatar name="JD" size="sm" />
              <Avatar name="MD" size="md" />
              <Avatar name="LG" size="lg" />
            </div>
          </CardBody>
        </Card>

        {/* Card Styles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">Daily Mix</p>
              <small className="text-default-500">12 Tracks</small>
              <h4 className="font-bold text-large">Frontend Radio</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <p>Card with custom content and styling</p>
            </CardBody>
          </Card>

          <Card className="py-4" isPressable onPress={() => console.log("Card pressed")}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">Pressable Card</p>
              <small className="text-default-500">Click me!</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <p>This card is interactive</p>
            </CardBody>
          </Card>
        </div>

        {/* Test Tailwind Classes */}
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold">Tailwind CSS Classes Test</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="bg-blue-500 text-white p-4 rounded-lg">
                Blue background with white text
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg">
                Gradient background
              </div>
              <div className="border-2 border-gray-300 dark:border-gray-700 p-4 rounded-lg">
                Bordered box with dark mode support
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}