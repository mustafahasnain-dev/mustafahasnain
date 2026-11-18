import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Foundation } from "@/components/sections/Foundation";
import { Workflow } from "@/components/sections/Workflow";
import { Architecture } from "@/components/sections/Architecture";
import { Capabilities } from "@/components/sections/Capabilities";
import { Projects } from "@/components/sections/Projects";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Collaboration } from "@/components/sections/Collaboration";
import { Contact, Footer } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Foundation />
        <Workflow />
        <Architecture />
        <Capabilities />
        <Projects />
        <Ecosystem />
        <Collaboration />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
