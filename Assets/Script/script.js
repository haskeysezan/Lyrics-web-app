const lyrics = [
  { line: "সব আলো নিভে যাক <br> আঁধারে", duration: "00:00:00-00:04:95" },
  { line: "শুধু জেগে থাক ঐ দূরের <br> তারারা", duration: "00:04:95-00:10:85" },
  { line: "সব শব্দ থেমে যাক <br>নিস্তব্ধতায়", duration: "00:10:85-00:15:00" },
  { line: "শুধু জেগে থাক এই <br> সাগর <br> আমার পাশে...", duration: "00:15:00-00:22:00" },
  { line: "আহা-হা...<br> আহা-হা... <br>হা-হা...", duration: "00:22:00-00:27:50" },
  { line: "আহা-হা... <br>আহা-হা...", duration: "00:27:50-00:31:50" }
];

const currentLineElem = document.getElementById('current-line');
const startBtn = document.getElementById('start-btn');
const audio = document.getElementById('song'); // Get the audio element
let currentIndex = 0;
let charIndex = 0;
let typingInterval;

function typeWriterEffect(text, speed) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = text;

  const textNodes = Array.from(tempDiv.childNodes);
  currentLineElem.innerHTML = '';
  charIndex = 0;
  let currentNodeIndex = 0;

  function typeNextNode() {
      if (currentNodeIndex < textNodes.length) {
          const node = textNodes[currentNodeIndex];
          if (node.nodeType === Node.TEXT_NODE) {
              typingInterval = setInterval(() => {
                  if (charIndex < node.textContent.length) {
                      currentLineElem.innerHTML += node.textContent.charAt(charIndex);
                      charIndex++;
                  } else {
                      clearInterval(typingInterval);
                      charIndex = 0;
                      currentNodeIndex++;
                      typeNextNode();
                  }
              }, speed);
          } else {
              currentLineElem.appendChild(node.cloneNode());
              currentNodeIndex++;
              typeNextNode();
          }
      } else {
          setTimeout(() => {
              currentIndex++;
              displayLyrics();
          }, 1000);
      }
  }

  typeNextNode();
}

function displayLyrics() {
  if (currentIndex < lyrics.length) {
      const lineDuration = parseDuration(lyrics[currentIndex].duration);
      const typingSpeed = Math.floor(lineDuration / lyrics[currentIndex].line.length);
      typeWriterEffect(lyrics[currentIndex].line, typingSpeed);
  } else {
      currentLineElem.className = 'new-class';
      currentLineElem.innerHTML = "<span class='song-info'>অবাক ভালোবাসা</span> <br> <span class='song-creator'>Warfaze</span>";
  }
}

function parseDuration(duration) {
  const [start, end] = duration.split('-');
  const [startMinutes, startSeconds] = start.split(':').map(Number);
  const [endMinutes, endSeconds] = end.split(':').map(Number);
  const startTime = (startMinutes * 60 + startSeconds) * 1000;
  const endTime = (endMinutes * 60 + endSeconds) * 1000;
  return endTime - startTime;
}

startBtn.addEventListener('click', () => {
  startBtn.style.display = 'none';
  audio.play(); // Play the song when button is clicked
  displayLyrics();
});
