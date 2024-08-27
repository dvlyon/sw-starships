import axios from "axios";
import { IStarship } from "./types/Starship";

const api = axios.create({
  baseURL: "https://swapi.dev/api/",
});

interface IStarshipResponse {
  results: IStarship[];
  count: number;
}

export const getStarships = (page: number = 1) => {
  return api.get<IStarshipResponse>(`starships/?page=${page}`);
};

export const getStarshipById = (id: number) => {
  return api.get<IStarship>(`starships/${id}/`);
};
