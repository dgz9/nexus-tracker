import { Analytics } from '@vercel/analytics/react';
import "./globals.css";
import { Providers } from './providers';

export const metadata = {
  title: "NexusTrack - Task Management Made Simple | Free Project Tracker",
  description: "Transform your workflow with NexusTrack's powerful task management. Free forever, open source, beautiful UI. Organize projects, collaborate with teams, and boost productivity.",
  keywords: "task management, project management, free task tracker, team collaboration, productivity tool, workflow management, NexusTrack, open source project management"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}