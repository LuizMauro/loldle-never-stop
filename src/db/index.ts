import { champions } from "./champions.json";

export const getAllChampions = () => {
  return champions;
};

export const findChampion = (name: string) => {
  if (!name) {
    return [];
  }

  return getAllChampions().filter((champion) =>
    champion.championName.toLowerCase().includes(name.toLowerCase())
  );
};

export const getChampion = (name: string) => {
  return getAllChampions().find(
    (champion) => champion.championName.toLowerCase() === name.toLowerCase()
  );
};

export const getImageChampion = (name: string) => {
  const stringLimpa = name.replace(/\s/g, "");

  if (stringLimpa === "Nunu&Willump") {
    return "https://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/Nunu.png";
  }

  if (stringLimpa === "K'Sante") {
    return "https://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/KSante.png";
  }

  if (stringLimpa === "Cho'Gath") {
    return "https://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/Chogath.png";
  }

  if (stringLimpa === "Dr.Mundo") {
    return "https://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/DrMundo.png";
  }

  if (stringLimpa === "Kai'Sa") {
    return "https://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/Kaisa.png";
  }

  if (stringLimpa === "Kha'Zix") {
    return "https://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/Khazix.png";
  }

  if (stringLimpa === "Kog'Maw") {
    return "https://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/KogMaw.png";
  }

  if (stringLimpa === "LeeSin") {
    return "https://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/LeeSin.png";
  }

  if (stringLimpa === "LeBlanc") {
    return "https://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/Leblanc.png";
  }

  if (stringLimpa === "Rek'Sai") {
    return "https://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/RekSai.png";
  }

  if (stringLimpa === "Rek'Sai") {
    return "https://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/RekSai.png";
  }

  if (stringLimpa === "RenataGlasc") {
    return "https://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/Renata.png";
  }

  if (stringLimpa === "Bel'Veth") {
    return "https://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/Belveth.png";
  }

  if (stringLimpa === "Wukong") {
    return "https://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/MonkeyKing.png";
  }

  if (stringLimpa === "Vel'Koz") {
    return "https://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/Velkoz.png";
  }

  return `https://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/${stringLimpa}.png`;
};

export const sortChampion = () => {
  const numberSort = Math.floor(Math.random() * getAllChampions().length);

  return getAllChampions()[numberSort];
};

export const getChampionLocalStorage = () => {
  const champion = window.localStorage.getItem("champion");

  if (champion) {
    return JSON.parse(champion);
  }
};

export const checkResponse = (champion: any) => {
  const { championName } = getChampionLocalStorage();

  if (championName === champion.championName) {
    return true;
  }

  return false;
};

export const checkColorSingle = (champion: any, key: string) => {
  const singleObject = getChampionLocalStorage()[key];
  if (singleObject === champion[key]) {
    return "green";
  }

  return "red";
};

export const checkColorObjectArray = (champion: any, key: string) => {
  const arrayChampionStorage = getChampionLocalStorage()[key];
  let count = 0;

  arrayChampionStorage.map((item: string) => {
    const find = champion[key].find(
      (p: string) => p.toLowerCase() === item.toLowerCase()
    );

    if (find) {
      count++;
    }
  });

  if (count === 0) {
    return "red";
  }

  if (
    arrayChampionStorage.length === count &&
    champion[key].length === arrayChampionStorage.length
  ) {
    return "green";
  }

  if (count >= 1 && arrayChampionStorage.length > 1) {
    return "orange";
  }
};

export const checkDate = (champion: any) => {
  const { release_date } = getChampionLocalStorage();
  if (release_date.split("-")[0] === champion.release_date.split("-")[0]) {
    return "↔";
  }

  if (release_date.split("-")[0] < champion.release_date.split("-")[0]) {
    return "↓";
  }

  if (release_date.split("-")[0] > champion.release_date.split("-")[0]) {
    return "↑";
  }
};
