import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// CSS-in-JS styles
const styles = {
  '@keyframes float': {
    '0%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-20px)' },
    '100%': { transform: 'translateY(0px)' }
  },

  '@keyframes pulse': {
    '0%': { boxShadow: '0 0 0 0 rgba(255, 255, 255, 0.3)' },
    '70%': { boxShadow: '0 0 0 20px rgba(255, 255, 255, 0)' },
    '100%': { boxShadow: '0 0 0 0 rgba(255, 255, 255, 0)' }
  },

  timerDisplay: {
    animation: 'pulse 2s infinite'
  },

  floating: {
    animation: 'float 6s ease-in-out infinite'
  },

  bgParticles: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },

  transitionContainer: {
    display: 'flex',
    height: '100vh',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #1e3351 0%, #1a2a40 100%)',
    position: 'relative',
    overflow: 'hidden'
  },

  card: {
    padding: '2.5rem',
    borderRadius: '0.5rem',
    backgroundColor: 'rgba(42, 60, 87, 0.5)',
    backdropFilter: 'blur(10px)',
    width: '500px',
    maxWidth: '90%',
    textAlign: 'center',
    zIndex: 10,
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    animation: 'float 6s ease-in-out infinite'
  },

  title: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '1.5rem'
  },

  timerLabel: {
    color: 'white',
    fontSize: '0.875rem',
    marginBottom: '0.5rem'
  },

  timerValue: {
    color: 'white',
    fontSize: '1.5rem',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    backgroundColor: '#1e3351',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    display: 'inline-block',
    animation: 'pulse 2s infinite'
  },

  button: {
    backgroundColor: 'white',
    color: '#1e3351',
    padding: '0.75rem 2rem',
    borderRadius: '0.375rem',
    fontWeight: '600',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    border: 'none'
  },

  buttonHover: {
    backgroundColor: '#f8f9fa',
    boxShadow: '0 0 15px rgba(255, 255, 255, 0.5)'
  }
};

const Peralihan = () => {
  const [timeLeft, setTimeLeft] = useState(30); // Set initial time to 30 seconds
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (timeLeft === 0) {
      // Navigate to the next page when timer reaches 0
      setTimeout(() => {
        navigate('/Siswa/Tryout/id/subjek/pengerjaan');
      }, 500);
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft, navigate]);
  
  // Format the time as MM:SS
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Pulse animation for timer
  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };

  // Style string for keyframes (can't be directly included in JSX)
  const styleString = `
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
      100% { transform: translateY(0px); }
    }
    
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.3); }
      70% { box-shadow: 0 0 0 20px rgba(255, 255, 255, 0); }
      100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
    }
    
    .timer-display {
      animation: pulse 2s infinite;
    }
    
    .floating {
      animation: float 6s ease-in-out infinite;
    }
  `;
  
  return (
    <>
      <style>{styleString}</style>
      <div style={styles.transitionContainer}>
        {/* Background animation elements */}
        <div style={styles.bgParticles}>
          <AnimatePresence>
            {Array.from({ length: 20 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ 
                  opacity: 0, 
                  x: Math.random() * window.innerWidth, 
                  y: Math.random() * window.innerHeight,
                  scale: Math.random() * 0.5 + 0.5
                }}
                animate={{ 
                  opacity: [0, 0.3, 0],
                  y: [null, Math.random() * window.innerHeight - 200]
                }}
                transition={{ 
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
                className="absolute rounded-full bg-white/10"
                style={{
                  position: 'absolute',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  width: Math.random() * 100 + 20,
                  height: Math.random() * 100 + 20,
                }}
              />
            ))}
          </AnimatePresence>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={styles.card}
          className="floating"
        >
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            style={styles.title}
          >
            Test Potensi Skolastik
          </motion.h1>
          
          <motion.div
            variants={pulseVariants}
            animate="pulse"
            style={{ marginBottom: '1.5rem' }}
          >
            <p style={styles.timerLabel}>Dimulai:</p>
            <motion.div 
              className="timer-display"
              style={styles.timerValue}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              {formatTime()}
            </motion.div>
          </motion.div>
          
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            whileHover={{ scale: 1.05, ...styles.buttonHover }}
            whileTap={{ scale: 0.95 }}
            style={styles.button}
            onClick={() => navigate('/Siswa/Tryout/id/subjek/pengerjaan')}
          >
            Siapkan Diri anda
          </motion.button>
        </motion.div>
      </div>
    </>
  );
};

export default Peralihan;
