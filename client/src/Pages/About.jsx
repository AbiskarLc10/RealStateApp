import React from 'react'
import {Link} from "react-router-dom"
const About = () => {
  return (
    <div className=' min-h-screen mx-auto max-w-4xl'>
      
      <div className=' flex items-center justify-center flex-col mt-8 mx-6 gap-4 py-3'>
      <h1 className=' text-2xl sm:text-3xl  text-center text-red-600 font-serif'>About RealEstate App</h1>
      <p className=' text-justify font-sans'>
      Welcome to RealEstate App, your premier destination for all your real estate needs. Whether you're searching for a cozy urban apartment, a luxurious suburban mansion, or a serene countryside retreat, AbiskarEstate is your trusted partner in finding the perfect property.
      </p>
      <p>

At RealEstate, we understand that finding your dream home is more than just a transaction — it's a deeply personal journey. That's why we're dedicated to providing you with the tools, support, and expertise you need to make informed decisions and find the home that's right for you.
      </p>
<p>

With our intuitive interface and comprehensive database of listings, exploring properties has never been easier. Our advanced search filters allow you to customize your search based on your specific criteria, whether it's price range, location, or desired amenities. Plus, our team of experienced real estate professionals is here to guide you every step of the way, ensuring a smooth and stress-free experience from start to finish.
</p>
<p>

Whether you're a first-time homebuyer, a seasoned investor, or simply seeking a change of scenery, RealEstate is committed to helping you find your perfect match. Join our community today and embark on your journey toward homeownership with confidence. Welcome to AbiskarEstate — where your dream home awaits. 
</p>
      
    <div className=' flex flex-col gap-4'>
      <h1 className=' text-start text-lg text-teal-500'>I am currently learning to build projects on MERN. You can hire me for such project by going through my CV below:-</h1>
      <a  className=' text-cyan-500 underline' href="https://firebasestorage.googleapis.com/v0/b/real-state-mern-9a523.appspot.com/o/1714109179791abiskar%20cv.png?alt=media&token=be70c45f-ef5a-4d72-8917-d845f901c64a" target='__blank'>Click Here</a>
    </div>
      </div>
    </div>
  )
}

export default About
