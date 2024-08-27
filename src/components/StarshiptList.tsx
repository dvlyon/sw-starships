import { useEffect, useState } from "react";
import { getStarships } from "../api";
import StartshipCard from "./StarshipCard";
import { IStarship } from "../types/Starship";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "./Pagination";

const StartshipList = () => {
  const [starships, setStartships] = useState<IStarship[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  const [searchParams, setSearchParam] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    const fetchStartships = async () => {
      setLoading(true);

      try {
        const { data } = await getStarships(Math.ceil(page / 2));
        if (page % 2 === 1) {
          setStartships(data.results.slice(0, 5));
        } else {
          setStartships(data.results.slice(5, 10));
        }
        setTotalPages(Math.ceil(data.count / 5));
      } catch (error) {
        console.error(error);

        setStartships([]);
        setTotalPages(0);
        setError("Error fetching starships.");
      } finally {
        setLoading(false);
      }
    };

    fetchStartships();
  }, [page]);

  const handleStartshipSelect = (url: string) => {
    const id = parseInt(url.split("https://swapi.dev/api/starships/")[1], 10);

    navigate(`/starships/${id}`);
  };

  const handlePageChange = (newPage: number) => {
    setSearchParam({ page: newPage.toString() });
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {starships.map((starship) => (
        <StartshipCard
          key={starship.name}
          {...starship}
          handleClick={() => handleStartshipSelect(starship.url)}
        />
      ))}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default StartshipList;
