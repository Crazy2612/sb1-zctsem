import { useState, useCallback } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const useConfetti = () => {
  const [isActive, setIsActive] = useState(false);
  const { width, height } = useWindowSize();

  const triggerConfetti = useCallback(() => {
    setIsActive(true);
    setTimeout(() => setIsActive(false), 3000);
  }, []);

  const ConfettiComponent = isActive ? (
    <Confetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={200}
      gravity={0.3}
    />
  ) : null;

  return { triggerConfetti, ConfettiComponent };
};

export default useConfetti;