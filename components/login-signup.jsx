'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FcGoogle } from 'react-icons/fc'
import { FiPhone } from 'react-icons/fi'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function LoginSignupComponent() {
  const [activeSection, setActiveSection] = useState('login')

  const toggleSection = () => {
    setActiveSection(activeSection === 'login' ? 'signup' : 'login')
  }

  return (
    (<div
      className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 transition-colors duration-300">
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden w-full max-w-md transition-colors duration-300">
        <div className="p-8">
          <AnimatePresence mode="wait">
            {activeSection === 'login' ? (
              <LoginSection key="login" />
            ) : (
              <SignupSection key="signup" />
            )}
          </AnimatePresence>
          <div className="mt-6 text-center">
            <Button
              variant="link"
              onClick={toggleSection}
              className="text-primary hover:text-primary/80 dark:text-primary-foreground dark:hover:text-primary-foreground/80">
              {activeSection === 'login' ? "Don't have an account? Sign up" : "Already have an account? Log in"}
            </Button>
          </div>
        </div>
      </div>
    </div>)
  );
}

function LoginSection() {
  return (
    (<motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="text-gray-800 dark:text-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
      <form className="space-y-4">
        <Input
          type="text"
          placeholder="Phone number or email"
          className="bg-gray-50 dark:bg-gray-700" />
        <Input
          type="password"
          placeholder="Password"
          className="bg-gray-50 dark:bg-gray-700" />
        <Button className="w-full">Log In</Button>
      </form>
      <div className="mt-4 flex items-center justify-between">
        <hr className="w-full border-gray-300 dark:border-gray-600" />
        <span className="px-2 text-gray-500 dark:text-gray-400 text-sm">or</span>
        <hr className="w-full border-gray-300 dark:border-gray-600" />
      </div>
      <div className="mt-4 space-y-2">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
          <FiPhone className="mr-2" />
          Log in with Phone
        </Button>
        <Button
          variant="outline"
          className="w-full flex items-center justify-center bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
          <FcGoogle className="mr-2" />
          Log in with Google
        </Button>
      </div>
    </motion.div>)
  );
}

function SignupSection() {
  return (
    (<motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="text-gray-800 dark:text-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form className="space-y-4">
        <Input
          type="text"
          placeholder="Full Name"
          className="bg-gray-50 dark:bg-gray-700" />
        <Input type="email" placeholder="Email" className="bg-gray-50 dark:bg-gray-700" />
        <Input
          type="password"
          placeholder="Password"
          className="bg-gray-50 dark:bg-gray-700" />
        <Input
          type="password"
          placeholder="Confirm Password"
          className="bg-gray-50 dark:bg-gray-700" />
        <Button className="w-full">Sign Up</Button>
      </form>
      <div className="mt-4 flex items-center justify-between">
        <hr className="w-full border-gray-300 dark:border-gray-600" />
        <span className="px-2 text-gray-500 dark:text-gray-400 text-sm">or</span>
        <hr className="w-full border-gray-300 dark:border-gray-600" />
      </div>
      <div className="mt-4 space-y-2">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
          <FiPhone className="mr-2" />
          Sign up with Phone
        </Button>
        <Button
          variant="outline"
          className="w-full flex items-center justify-center bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
          <FcGoogle className="mr-2" />
          Sign up with Google
        </Button>
      </div>
    </motion.div>)
  );
}