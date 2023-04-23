import { useState, useEffect, useCallback } from "react";

import {
  findChampion,
  getImageChampion,
  getChampion,
  sortChampion,
  checkColorSingle,
  checkDate,
  checkColorObjectArray,
  checkResponse,
} from "./db";
import "./index.css";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [championsSelected, setChampionsSelected] = useState<any[]>([]);
  const [name, setName] = useState("");

  const handleChampion = () => {
    setName("");
    const champion = getChampion(name);
    if (champion) {
      setChampionsSelected([...championsSelected, champion]);

      if (checkResponse(champion)) {
        setModalIsOpen(true);
      }
    }
  };

  const resetGame = () => {
    setChampionsSelected([]);
    setName("");
    setModalIsOpen(false);
    saveChampionLocalStorage();
  };

  const saveChampionLocalStorage = useCallback(() => {
    const champion = sortChampion();
    window.localStorage.setItem("champion", JSON.stringify(champion));
  }, []);

  useEffect(() => {
    saveChampionLocalStorage();
  }, [saveChampionLocalStorage]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      {modalIsOpen && (
        <div
          style={{
            position: "absolute",
            marginTop: "5%",
            width: "90%",
            height: "100%",
            background: "rgba(0,0,0,0.9)",
            borderRadius: 20,
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            justifyContent: "center",
            alignItems: "center",
            gap: 50,
            textAlign: "center",
          }}
        >
          <h1>Você acertou!!</h1>
          <img
            width={200}
            src={getImageChampion(
              championsSelected[championsSelected.length - 1].championName
            )}
          />
          <h2 style={{ fontWeight: "bold" }}>
            {championsSelected[championsSelected.length - 1].championName}
          </h2>
          <button onClick={resetGame}>Continuar jogando</button>
        </div>
      )}

      <div style={{ maxWidth: 320, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            type="text"
            placeholder="Procure um campeão"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleChampion}>{">"}</button>
        </div>

        <ul style={{ maxHeight: 300, overflowY: "scroll" }}>
          {findChampion(name).map(({ championName }) => (
            <li
              key={championName}
              onClick={() => setName(championName)}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 10,
                margin: 5,
              }}
            >
              <img width={70} src={getImageChampion(championName)} alt="" />
              {championName}
            </li>
          ))}
        </ul>
      </div>

      <table>
        <thead>
          <th>Campeão</th>
          <th>Genero</th>
          <th>Posição</th>
          <th>Especie</th>
          <th>Mana, energia, etc...</th>
          <th>Range type</th>
          <th>Região</th>
          <th>Ano de Lançamento</th>
        </thead>
        <tbody>
          {championsSelected.map((item) => (
            <tr key={item.championName}>
              <td>
                {
                  <img
                    width={70}
                    src={getImageChampion(item.championName)}
                    alt=""
                  />
                }
              </td>
              <td style={{ color: checkColorSingle(item, "gender") }}>
                {item.gender}
              </td>
              <td
                style={{
                  color: checkColorObjectArray(item, "positions"),
                }}
              >
                {item.positions.map((item: any) => (
                  <>
                    {item} <br />
                  </>
                ))}
              </td>
              <td
                style={{
                  color: checkColorObjectArray(item, "species"),
                }}
              >
                {item.species.map((item: any) => (
                  <>
                    {item} <br />
                  </>
                ))}
              </td>
              <td style={{ color: checkColorSingle(item, "resource") }}>
                {item.resource}
              </td>
              <td
                style={{
                  color: checkColorObjectArray(item, "range_type"),
                }}
              >
                {item.range_type.map((item: any) => (
                  <>
                    {item} <br />
                  </>
                ))}
              </td>
              <td
                style={{
                  color: checkColorObjectArray(item, "regions"),
                }}
              >
                {item.regions.map((item: any) => (
                  <>
                    {item} <br />
                  </>
                ))}
              </td>
              <td>
                {item.release_date.split("-")[0]} {checkDate(item)}{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
