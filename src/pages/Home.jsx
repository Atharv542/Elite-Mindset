import HeroVideo from '../components/HeroVideo'
import WorkshopScroller from '../components/WorkshopScroller'
import ContactForm from '../components/ContactForm'
import AboutSection from '../components/AboutSection'

export default function Home() {
  return (
    <div className="bg-black">
      <HeroVideo />
      <div className="relative z-10">
        <AboutSection/>
        <WorkshopScroller />
        <ContactForm />
      </div>
    </div>
  )
}
