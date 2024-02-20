import React, { useEffect } from 'react';
import gsap from 'gsap';

const YourComponent = ({ onAnimationComplete }) => {

    useEffect(() => {
        const tl = gsap.timeline()
          .to(".animElement", {duration: 2, y: 100}) 
          .to(".animElement", {duration: 1, x: 100, onComplete: onAnimationComplete}) 
      }, [onAnimationComplete])
    
  useEffect(() => {
    const tl = gsap.timeline({ repeat: 0, repeatDelay: 1 })
      .from(".mask div", {
        xPercent: gsap.utils.wrap([100, -100]),
        stagger: 0.4,
        opacity: 0,
        ease: "circ.inOut"
      })
      .to(
        ".mask div",
        {
          opacity: 0,
          yPercent: gsap.utils.wrap([-100, 100]),
          duration: 1,
          ease: "none"
        },
        ">0.5"
      );

    gsap.fromTo(".bar", { x: -200 }, { x: 200, duration: 20, ease: "none", repeat: 3, yoyo: true, onComplete: onAnimationComplete });
  }, [onAnimationComplete]);

  return (
    <div className="your-container">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@200;300;400&family=Russo+One&display=swap" rel="stylesheet" />

      <div className="contentWrapper">
        <div className="bg"></div>
        <div className="barWrapper">
          <div className="bar"></div>
        </div>
        <div style={{color:'#16A0DB'}} className="contentWrapper ">
          <div className="mainContent flexCenter">
            <div className="maskOut getCreative">
              <div className="mask"><div><span className="thin">Choose your product </span></div></div>
              <div className="mask ml-8"><div>and</div></div>
            </div>
            <div className="maskOut haveFun">
              <div className="mask"><div><span className="thin">get</span></div></div>
              <div className="mask"><div>a quote now</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourComponent;
