import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero"; // Lo creamos
import About from "@/components/About"; // Lo creamos
import Skills from "@/components/Skills"; // Lo creamos
import Projects from "@/components/Projects"; // Lo creamos
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}