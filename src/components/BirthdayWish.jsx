
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import Countdown from 'react-countdown';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { Facebook, Twitter, Share2 } from 'lucide-react';

function BirthdayWish() {
  const { name: encodedData } = useParams();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [showCake, setShowCake] = useState(false);
  const [particlesLoaded, setParticlesLoaded] = useState(false);
  const [showVirtualGift, setShowVirtualGift] = useState(false);

  let decodedData;
  try {
    decodedData = JSON.parse(atob(encodedData));
  } catch (e) {
    decodedData = { name: encodedData };
  }

  const { name, message, theme, music, photo, birthdayDate } = decodedData;

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    setTimeout(() => setShowCake(true), 1000);
    setTimeout(() => setShowVirtualGift(true), 2000);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const particlesInit = async (engine) => {
    await loadFull(engine);
    setParticlesLoaded(true);
  };

  const getMusicSource = (musicChoice) => {
    switch (musicChoice) {
      case 'party-music':
        return 'https://example.com/party-music.mp3';
      case 'classical':
        return 'https://example.com/classical.mp3';
      default:
        return 'https://example.com/birthday-song.mp3';
    }
  };

  const cakeVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { type: "spring", duration: 1.5 }
    }
  };

  const giftVariants = {
    hidden: { scale: 0, y: 50 },
    visible: {
      scale: 1,
      y: 0,
      transition: { type: "spring", bounce: 0.5 }
    }
  };

  const balloonVariants = {
    float: {
      y: [-20, 20],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  const shareUrl = window.location.href;
  const shareTitle = `Birthday Wishes for ${decodeURIComponent(name)}!`;

  return (
    <div 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: theme || '#FF6B6B' }}
    >
      <Confetti width={windowSize.width} height={windowSize.height} />
      
      {particlesLoaded && (
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            particles: {
              number: { value: 50 },
              color: { value: "#ffffff" },
              shape: { type: "star" },
              move: { enable: true, speed: 3 }
            }
          }}
        />
      )}

      <div className="absolute inset-0 z-0">
        {photo ? (
          <img src={photo} alt="Custom birthday background" className="w-full h-full object-cover opacity-20" />
        ) : (
          <img  alt="Birthday celebration background" className="w-full h-full object-cover opacity-20" src="https://images.unsplash.com/photo-1684132163488-f361d468533b" />
        )}
      </div>

      {/* Animated Balloons */}
      <div className="absolute top-0 left-0 right-0 flex justify-around">
        {[..."🎈🎈🎈"].map((balloon, index) => (
          <motion.div
            key={index}
            variants={balloonVariants}
            animate="float"
            className="text-6xl"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {balloon}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center p-8"
      >
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-6xl font-bold text-white mb-6 text-shadow-lg"
        >
          Happy Birthday!
        </motion.h1>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl text-white font-semibold mb-8"
        >
          Dear {decodeURIComponent(name)}
        </motion.div>

        {birthdayDate && (
          <div className="mb-6 text-white">
            <h3 className="text-xl mb-2">Countdown to Your Special Day:</h3>
            <Countdown
              date={new Date(birthdayDate)}
              renderer={({ days, hours, minutes, seconds }) => (
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <div className="text-2xl font-bold">{days}</div>
                    <div className="text-sm">Days</div>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <div className="text-2xl font-bold">{hours}</div>
                    <div className="text-sm">Hours</div>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <div className="text-2xl font-bold">{minutes}</div>
                    <div className="text-sm">Minutes</div>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <div className="text-2xl font-bold">{seconds}</div>
                    <div className="text-sm">Seconds</div>
                  </div>
                </div>
              )}
            />
          </div>
        )}

        <AnimatePresence>
          {showCake && (
            <motion.div
              variants={cakeVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="text-7xl mb-8"
            >
              🎂
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-xl text-white leading-relaxed mb-8">
            {message ? decodeURIComponent(message) : 
              "May your day be filled with joy, laughter, and unforgettable moments. Wishing you all the happiness in the world! 🎉🎂✨"}
          </p>
        </motion.div>

        {showVirtualGift && (
          <motion.div
            variants={giftVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <div className="text-6xl animate-bounce">🎁</div>
            <p className="text-white mt-2">A special gift for you!</p>
          </motion.div>
        )}

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 space-y-4"
        >
          <div className="text-3xl animate-bounce">
            🎁 🎈 🎂 🎉 🎊
          </div>
        </motion.div>

        {/* Social Share Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <FacebookShareButton url={shareUrl} quote={shareTitle}>
            <div className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors">
              <Facebook className="text-white" size={24} />
            </div>
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl} title={shareTitle}>
            <div className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors">
              <Twitter className="text-white" size={24} />
            </div>
          </TwitterShareButton>
          <WhatsappShareButton url={shareUrl} title={shareTitle}>
            <div className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors">
              <Share2 className="text-white" size={24} />
            </div>
          </WhatsappShareButton>
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-50">
          <AudioPlayer
            autoPlay
            src={getMusicSource(music)}
            showJumpControls={false}
            customStyles={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default BirthdayWish;
