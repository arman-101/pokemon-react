import { useEffect, useState } from "react";
import "../styles/Game.css";

export default function Game() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState(new Set());
  const [offset, setOffset] = useState(0);
  const limit = 12;
  const [pokeData, setPokeData] = useState([]);
  const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

  const shuffleArray = (array) => {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok)
          throw new Error("Failed to fetch Pokemon through URL");
        const data = await response.json();

        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            try {
              const res = await fetch(pokemon.url);
              if (!res.ok) throw new Error(`Failed to fetch ${pokemon.name}`);
              const d = await res.json();

              return {
                id: d.id,
                image: d.sprites.front_default,
                text: d.name.charAt(0).toUpperCase() + d.name.slice(1),
              };
            } catch (error) {
              console.error("Error fetching Pokemon details", error);
              return null;
            }
          })
        );

        setPokeData(pokemonDetails.filter((p) => p !== null));
      } catch (error) {
        console.error("Error fetching Pokemon", error);
      }
    };

    fetchPokemons();
  }, [apiUrl]);

  const handleCardClick = (id) => {
    if (clickedCards.has(id)) {
      setScore(0);
      setClickedCards(new Set());
    } else {
      const newScore = score + 1;
      setScore(newScore);
      setBestScore(Math.max(newScore, bestScore));

      const newClickedCards = new Set([...clickedCards, id]);
      setClickedCards(newClickedCards);

      if (newClickedCards.size === limit) {
        alert("You've won!");
        setScore(0);
        setClickedCards(new Set());
      }
    }
    // shuffle
    setPokeData(shuffleArray(pokeData));
  };

  const handleNewPokemon = () => {
    setOffset((prevOffset) => prevOffset + limit);
    setClickedCards(new Set());
    setScore(0);
  };

  return (
    <div className="game">
      <div className="data">
        <p>Score: {score}</p>
        <button className="new-button" onClick={handleNewPokemon}>
          New Pokemon
        </button>
        <p>Best Score: {bestScore}</p>
      </div>

      <div className="cards">
        {pokeData.map((poke) => (
          <div
            className="cards-box"
            key={poke.id}
            onClick={() => handleCardClick(poke.id)}
          >
            <img src={poke.image} alt={poke.text} />
            <p>{poke.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
