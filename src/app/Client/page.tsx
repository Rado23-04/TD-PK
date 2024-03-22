import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface Pokemon {
  name: string;
  url: string;
}

interface ClientProps {
  pokemons: Pokemon[];
}

const ClientPage: React.FC<ClientProps> = ({ pokemons }) => {
  const [data, setData] = useState<Pokemon[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50&offset=0');
      const newData = await res.json();
      setData(newData.results);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Client Component</h1>
      <ul>
        {data.map((pokemon) => (
          <li key={pokemon.url}>
            <a onClick={() => router.push(`/client/${pokemon.url.split('/')[6]}`)}>
              {pokemon.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientPage;