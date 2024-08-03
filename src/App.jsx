import { useState, useEffect } from "react";
import { animales } from "./main";
import correct from "../audio/correct.mp3";
import error from "../audio/error.mp3";

export const App = () => {
  const [animal, setAnimal] = useState(animales[0]);
  const [inputValue, setInputValue] = useState("");
  const [aciertos, setAciertos] = useState(0);
  const [errores, setErrores] = useState(0);
  const [nota, setNota] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const aciertoAudio = new Audio(correct);
  const errorAudio = new Audio(error);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButton = () => {

    const checkResult = inputValue.toLowerCase() === animal.nombreCientifico.toLowerCase();

    if (checkResult) {
      setAciertos(prevAciertos => {
        const nuevosAciertos = prevAciertos + 1;
        const totalIntentos = nuevosAciertos + errores;
        const nuevaNota = (nuevosAciertos / totalIntentos) * 10;
        setNota(nuevaNota.toFixed(2));
        return nuevosAciertos;
      });
      aciertoAudio.play();
    } else {
      setErrores(prevErrores => {
        const nuevosErrores = prevErrores + 1;
        const totalIntentos = aciertos + nuevosErrores;
        const nuevaNota = (aciertos / totalIntentos) * 10;
        setNota(nuevaNota.toFixed(2));
        return nuevosErrores;
      });
      errorAudio.play();
    }

    setInputValue("");
    changeAnimal();
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500);
  };

  const changeAnimal = () => {
    const randomIndex = Math.floor(Math.random() * animales.length);
    setAnimal(animales[randomIndex]);
  };

  const getNotaClass = (nota) => {
    if (nota >= 9) return 'text-green-500';
    if (nota >= 6) return 'text-blue-500';
    if (nota >= 5) return 'text-yellow-500';
    return 'text-red-500';
  };

  const toggleDarkMode = () => {
    setIsDarkMode(true);
  };

  const toggleLightMode = () => {
    setIsDarkMode(false);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
    console.log("changing")
  }, [isDarkMode]);


  return (
    <div className={`${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className={`container ${animate ? 'fade-in' : ''}`}>
        <h1 className="title">Adivina el animal</h1>
        <img src={animal.imagenUrl} alt={animal.nombre} className="animalPic" />
        <input
          type="text"
          placeholder="Nombre del animal..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleButton} className="checkButton">Comprobar</button>
        <div className="results">
          <h3>Aciertos: <span className="text-green-500">{aciertos}</span></h3>
          <h3>Errores: <span className="text-red-500">{errores}</span></h3>
          <h3>Nota: <span className={getNotaClass(nota)}>{nota}</span></h3>
        </div>
      </div>
      <aside>
        <h3>Opciones</h3>
        <div className="colorButtons">
          <button className="lightButton" onClick={toggleLightMode}>Modo claro</button>
          <button className="darkButton" onClick={toggleDarkMode}>Modo oscuro</button>
        </div>
      </aside>
    </div>
  );
};
