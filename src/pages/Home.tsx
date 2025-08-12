import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Dumbbell, MessageCircle, BarChart3, ArrowRight, } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Simple Header */}
      <header className="p-6">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">StayFit</span>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" asChild className="text-gray-600 hover:text-gray-800">
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            Your Personal AI Fitness Coach
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Chat with AI to get personalized workouts. Track your progress. Stay consistent.
            Simple fitness made smarter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg group" asChild>
              <Link to="/register">
                Start Your Journey
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50" asChild>
              <Link to="/login">I have an account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Simple Features */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Everything you need to stay fit
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="flex flex-col items-center text-center p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-xl mb-3 text-gray-800">Chat with AI</h3>
                <p className="text-gray-600">
                  Just ask: "Give me a 30-minute home workout" and get instant personalized routines
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="flex flex-col items-center text-center p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <Dumbbell className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-xl mb-3 text-gray-800">Simple Workouts</h3>
                <p className="text-gray-600">
                  Get clear, easy-to-follow workout plans that fit your schedule and fitness level
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-50 to-pink-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="flex flex-col items-center text-center p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-xl mb-3 text-gray-800">Track Progress</h3>
                <p className="text-gray-600">
                  Mark workouts as complete and watch your consistency streak grow day by day
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works - Simple */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-800">How StayFit works</h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-lg font-bold mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2 text-gray-800">Sign up</h3>
              <p className="text-gray-600 text-sm">Tell us your fitness goals and preferences</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center text-lg font-bold mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2 text-gray-800">Ask AI</h3>
              <p className="text-gray-600 text-sm">Chat to get personalized workout plans</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full flex items-center justify-center text-lg font-bold mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2 text-gray-800">Stay consistent</h3>
              <p className="text-gray-600 text-sm">Complete workouts and track your progress</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to start your fitness journey?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join StayFit today. It's simple, it's smart, and it works.
          </p>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-50 shadow-lg font-semibold" asChild>
            <Link to="/register">Get Started - It's Free</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}