import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStarshipById } from '../api';
import styled from 'styled-components';
import { IStarship } from '../types/Starship';

const Container = styled.div`
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: black;
`;

const StarshipDetails = styled.div`
  margin-top: 20px;
`;

const StarshipPage = () => {
  const { id } = useParams<{ id: string }>();
  const [starship, setStarship] = useState<IStarship | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStarship = async () => {
      setLoading(true);
      
      if (id) {
        try {
          const { data } = await getStarshipById(parseInt(id, 10))

          setStarship(data)
        } catch (error) {
          console.error(error)
          setError('Error fetching starship.')
        } finally {
          setLoading(false)
        }
      }
    }

    fetchStarship()
  }, [id]);

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container>{error}</Container>;
  }

  if (!starship) {
    return <Container>Starship not found.</Container>;
  }

  return (
    <Container>
      <h1>{starship.name}</h1>
      <StarshipDetails>
        <p><strong>Manufacturer:</strong> {starship.manufacturer}</p>
        <p><strong>Crew Size:</strong> {starship.crew}</p>
        <p><strong>Passengers:</strong> {starship.passengers}</p>
        <p><strong>Model:</strong> {starship.model}</p>
        <p><strong>Starship Class:</strong> {starship.starship_class}</p>
        <p><strong>Hyperdrive Rating:</strong> {starship.hyperdrive_rating}</p>
        <p><strong>Cost in Credits:</strong> {starship.cost_in_credits}</p>
        <p><strong>Length:</strong> {starship.length} meters</p>
        <p><strong>Cargo Capacity:</strong> {starship.cargo_capacity} kilograms</p>
        <p><strong>Created:</strong> {new Date(starship.created).toLocaleDateString()}</p>
      </StarshipDetails>
    </Container>
  );
};

export default StarshipPage;
