import styled from "styled-components";
import { IStarship } from "../types/Starship";

const Card = styled.div`
  background: white;
  padding: 1em;
  margin: 0.5em;
  border-radius: 0.25em;
  box-shadow: 0 0 0.5em black;
  color: black;
  cursor: pointer;
  width: 75vw;
`;

interface IStarshipCard extends IStarship {
  handleClick: () => void;
}

const StartshipCard = ({
  name,
  manufacturer,
  crew,
  created,
  handleClick,
}: IStarshipCard) => {
  return (
    <Card onClick={handleClick}>
      <h2>{name}</h2>
      <p>Manufacturer: {manufacturer}</p>
      <p>Crew: {crew}</p>
      <p>Created: {new Date(created).toLocaleDateString()}</p>
    </Card>
  );
};

export default StartshipCard;
