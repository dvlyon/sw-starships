import styled from "styled-components";
import StartshipList from "../components/StarshiptList";

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`;

const HomePage = () => (
  <HomeWrapper>
    <h1>SW - Starships</h1>
    <StartshipList />
  </HomeWrapper>
);

export default HomePage;
