import { useState, useEffect} from 'react'
import './App.css'

const pics = [
    "allen_the_alien.png",
    "angstrom_levy.png",
    "Atom_Eve.png",
    "battle_beast.png",
    "conquest.png",
    "immortal.png",
    "Invincible.png",
    "Monster_Girl.png",
    "Omni-Man.png",
    "rexsplode.png",
    "robot.png",
    "Thragg.png",
    "anissa.png",
    "amber.png",
    "cecil.png",
    "debbie.png",
    "donald.png",
    "elephant.png",
    "kate.png",
    "lucan.png",
    "Mauler_Twins.png",
    "Multi_Pauls.png",
    "Oliver.png",
    "Sinclair.png",
    "shrinking-rae.png",
    "Thaedus.png",
    "thula.png",
    "vidor.png",
    "William.png"
  ];

function getPicName(pic) {
  let name = pic.split('.')[0];
  if (name.includes('_')) {
    name = name.split('_').join(' ');
  }
  return name.charAt(0).toUpperCase() + name.slice(1);
}


function GifWindow(props) {
  return (
    <div className="gif-window">
      <div className="image-container" onClick={() => props.clickedPic(props.pic)}>
        <img src={`imgs/${props.pic}`} alt={props.pic} />
        <div className="image-overlay">
          <p className="image-text">{getPicName(props.pic)}</p>
        </div>
      </div>
    </div>
  )
}

function setBestScore(score) {
  const bestScore = localStorage.getItem('bestScore');
  if (bestScore) {
    if (score > bestScore) {
      localStorage.setItem('bestScore', score);
    }
  } else {
    localStorage.setItem('bestScore', score);
  }
}
function getBestScore() {
  const bestScore = localStorage.getItem('bestScore');
  if (bestScore) {
    return bestScore;
  }
  return 0;
}

function App() {
  const [score, setScore] = useState(0);
  const [picsSelected, setPicsSelected] = useState([]);
  const [shuffledPics, setShuffledPics] = useState([]);
  useEffect(() => {
    shufflePics(pics);
  }, []);
  useEffect(() => {
    setBestScore(getBestScore());
  }, []);

  const shufflePics = (pics) => {
    if(pics.filter(pic => !picsSelected.includes(pic)).length == 0){
      alert('You won!');
      resetGame();
      shufflePics(pics);
      return true;
    }

    let shuffled = pics.sort(() => Math.random() - 0.5);
    while (shuffled.filter(pic => !picsSelected.includes(pic)).length < 1){
      shuffled = pics.sort(() => Math.random() - 0.5);
    }
    setShuffledPics(shuffled.slice(0, 9));
  }

  function clickedPic(pictureSelected) {
    if (picsSelected.includes(pictureSelected)) {
      if (score > getBestScore()) {
        setBestScore(score);
      }
      resetGame();
      shufflePics(pics);
      return false
    }
    if (score === 29) {
      alert('You won!');
      resetGame();
      shufflePics(pics);
      return true;
    }
      picsSelected.push(pictureSelected);
      setScore(score + 1);
      shufflePics(pics);
      return true;
    
  }
  
  function resetGame() {
    setPicsSelected([]);
    setScore(0);
  }
  const picsList = shuffledPics.map((pic) => (<GifWindow pic={pic} key={pic} clickedPic={clickedPic} />));

  return (
    <>
    <div className="flex flex-row justify-between items-center h-[10vh]">
      <div className="flex flex-col px-16">
        <h1 className="text-4xl font-bold pt-4">GDA Classified Memory Test</h1>
        <p className="text-sm font-bold pt-4">Click each character once. If you click the same character twice, game over!</p>
      </div>
      <div className="flex flex-col px-16">
      <p className="text-2xl font-bold pt-4">score: {score}</p>
      <p className="text-2xl font-bold pt-2" >best: {getBestScore()}</p>
      </div>
    </div>
    <div className="gif-container">
      {picsList}
    </div>
    </>
  );
}

export default App
