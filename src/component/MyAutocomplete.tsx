import React, { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useQuery } from '@apollo/client';
import INFO_PERSON from '../querys';

// Defina a interface para o objeto Character

interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

interface Props {
  //função que recebe uma string como argumento (representando o filtro) e não retorna nenhum valor (void).
  onFilterChange: (filter: string) => void;
}

const MyAutocomplete = ({ onFilterChange }: Props) => {
  // Busca os dados da query GraphQL INFO_PERSON
  const { loading, error, data } = useQuery(INFO_PERSON);

  // Estados locais para o personagem selecionado e o filtro de pesquisa
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  const [searchFilter, setSearchFilter] = useState<string>('');

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occurred...</p>;
  }

  // Extraia os personagens da resposta da query
  const characters: Character[] = data?.characters.results || [];

  // Função para lidar com a seleção do autocompletar
  const handleAutocompleteChange = (
    _: React.ChangeEvent<{}>,
    value: Character | null
  ) => {
    setSelectedCharacter(value);
    // Chama a função onFilterChange com o nome do personagem selecionado ou uma string vazia
    onFilterChange(value ? value.name : '');
  };

  // Filtrar os personagens com base no nome pesquisado
  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div>
      {/* Componente de autocompletar */}
      <Autocomplete
        options={characters}
        getOptionLabel={option => option.name}
        onChange={handleAutocompleteChange}
        onInputChange={(_, newInputValue) => setSearchFilter(newInputValue)}
        renderInput={params => (
          <TextField
            {...params}
            label="Choose a character"
            variant="outlined"
          />
        )}
      />

      {/* Seção para exibir os personagens filtrados */}
      <section className="parent">
        {filteredCharacters.map((person, index) => (
          <div className="card" key={index}>
            <img src={person.image} alt="Avatar" style={{ width: '100%' }} />
            <div className="container">
              <h4>
                <b>{person.name}</b>
              </h4>
              <p>
                <b>GENDER:</b> {person.gender}
              </p>
              <p>
                <b>SPECIE:</b> {person.species}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default MyAutocomplete;
