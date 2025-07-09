import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Chip, Divider } from '@heroui/react';
import { motion } from 'framer-motion';
import { 
  FolderKanban, 
  ListTodo, 
  Zap,
  ArrowRight,
  Target,
  Github,
  Palette,
  Sparkles,
  LayoutDashboard
} from 'lucide-react';
import AppNavbar from '../components/AppNavbar';
import { useAuth } from '../contexts/useAuth';

const Landing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const features = [
    {
      icon: <ListTodo className="w-8 h-8" />,
      title: "Intuitive Task Management",
      description: "Create, edit, and organize tasks with a beautiful interface. Quick status updates keep your workflow moving."
    },
    {
      icon: <FolderKanban className="w-8 h-8" />,
      title: "Project Organization",
      description: "Group tasks by projects with custom colors. Visual indicators help you focus on what matters most."
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Beautiful UI/UX",
      description: "Modern design with light and dark themes. Smooth animations and responsive layouts on all devices."
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Smart Features",
      description: "Card and table views, real-time search, and quick actions. Everything you need to stay productive."
    }
  ];

  const stats = [
    { value: "100%", label: "Free Forever" },
    { value: "0", label: "Hidden Fees" },
    { value: "∞", label: "Tasks & Projects" },
    { value: "24/7", label: "Available" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AppNavbar />

      <section className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Chip 
              startContent={<Zap className="w-4 h-4" />}
              variant="dot"
              color="success"
              className="mb-6"
            >
              100% Free & Open Source
            </Chip>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Simple Task Management
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Made Beautiful</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              A completely free, modern task tracker built with React and HeroUI. 
              No subscriptions, no limits, just pure productivity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link to="/dashboard" className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    color="primary" 
                    radius="full"
                    className="font-semibold w-full sm:w-auto"
                    startContent={<LayoutDashboard className="w-5 h-5" />}
                    endContent={<ArrowRight className="w-5 h-5" />}
                  >
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <Button 
                  size="lg" 
                  color="primary" 
                  radius="full"
                  className="font-semibold w-full sm:w-auto"
                  endContent={<ArrowRight className="w-5 h-5" />}
                  onPress={() => navigate('/register')}
                >
                  Get Started Free
                </Button>
              )}
              <Button 
                size="lg" 
                variant="bordered" 
                radius="full"
                className="font-semibold w-full sm:w-auto"
                startContent={<Github className="w-5 h-5" />}
                as="a"
                href="https://github.com/dgz9/nexus-tracker"
                target="_blank"
              >
                View on GitHub
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</h3>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Built with Modern Technologies
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Clean code, beautiful design, and powerful features - all free and open source
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:scale-[1.02]">
                  <div className="text-blue-600 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Built with Love Using
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Modern technologies for the best developer and user experience
            </p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-6">
            <Chip size="lg" variant="flat">React 18</Chip>
            <Chip size="lg" variant="flat">HeroUI</Chip>
            <Chip size="lg" variant="flat">TailwindCSS</Chip>
            <Chip size="lg" variant="flat">Framer Motion</Chip>
            <Chip size="lg" variant="flat">Node.js</Chip>
            <Chip size="lg" variant="flat">Express</Chip>
            <Chip size="lg" variant="flat">PostgreSQL</Chip>
            <Chip size="lg" variant="flat">Prisma</Chip>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Start Managing Tasks Today
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              No credit card required. No hidden fees. Just sign up and start being productive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                color="default" 
                radius="full"
                className="font-semibold bg-white text-blue-600 w-full sm:w-auto"
                endContent={<ArrowRight className="w-5 h-5" />}
                onPress={() => navigate('/register')}
              >
                Create Free Account
              </Button>
              <Button
                size="lg"
                variant="bordered"
                radius="full"
                className="font-semibold text-white border-white/50 hover:bg-white/10 w-full sm:w-auto"
                startContent={<Github className="w-5 h-5" />}
                as="a"
                href="https://github.com/dgz9/nexus-tracker"
                target="_blank"
              >
                Star on GitHub
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 px-4 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Target className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">NexusTrack</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Free and open source task management for everyone
            </p>
            <div className="flex justify-center gap-4">
              <Button
                isIconOnly
                variant="light"
                radius="full"
                as="a"
                href="https://github.com/dgz9/nexus-tracker"
                target="_blank"
              >
                <Github className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <Divider className="my-8" />
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>Made with ❤️ by developers, for developers</p>
            <p className="mt-2">© 2025 NexusTrack - MIT License</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;