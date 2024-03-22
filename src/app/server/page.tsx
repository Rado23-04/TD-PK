import { GetServerSideProps } from 'next';
import React from 'react';

interface Pokemon {
  name: string;
  url: string;
}

interface ServerProps {
  pokemons: Pokemon[];
}

const ServerPage: React.FC<ServerProps> = ({ pokemons }) => {
  return (
    <div>
      <h1>Server Component</h1>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.url}>
            <a href={`/server/${pokemon.url.split('/')[6]}`}>{pokemon.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50&offset=0');
  const data = await res.json();
  return {
    props: {
      pokemons: data.results,
    },
  };
};

export default ServerPage;