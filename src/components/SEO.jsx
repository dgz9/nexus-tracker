import Head from 'next/head';

const SEO = ({ 
  title = "NexusTrack - Task Management Made Simple | Free Project Tracker",
  description = "Transform your workflow with NexusTrack's powerful task management. Free forever, open source, beautiful UI. Organize projects, collaborate with teams, and boost productivity.",
  keywords = "task management, project management, free task tracker, team collaboration, productivity tool, workflow management, NexusTrack, open source project management"
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default SEO;