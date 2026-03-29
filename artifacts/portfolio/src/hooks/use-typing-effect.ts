import { useState, useEffect } from "react";

export function useTypingEffect(words: string[], typingSpeed = 100, deletingSpeed = 50, pauseDelay = 2000) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const handleType = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && text === fullText) {
        typeSpeed = pauseDelay;
        setIsDeleting(true);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        typeSpeed = 500;
      }

      timer = setTimeout(handleType, typeSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, words, typingSpeed, deletingSpeed, pauseDelay]);

  return text;
}
