import {
  getDockerRepositories,
  getDockerTags,
} from "@modules/proyectos/services/get.docker.information";
import { Autocomplete, Grid2, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

type DockerInputsProps = {
  repositoryInitial?: string;
  tagInitial?: string;
  onChange: (repository: string | null, tag: string | null) => void;
};
export const DockerInputs: React.FC<DockerInputsProps> = ({
  repositoryInitial,
  tagInitial,
  onChange,
}) => {
  const [repository, setRepository] = useState<string | null>(null);
  const [repositoryResults, setRepositoryResults] = useState<string[]>([]);
  const [buffer, setBuffer] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTagsInput, setShowTagsInput] = useState<boolean>(false);
  const [tagsResults, setTagsResults] = useState<string[]>([]);
  const [selectTag, setSelectTag] = useState<string | null>(null);

  useEffect(() => {
    if (repositoryInitial && tagInitial) {
      setRepository(repositoryInitial);
      setSelectTag(tagInitial);
    }
  }, []);

  useEffect(() => {
    onChange(repository, selectTag);
  }, [repository, selectTag]);

  useEffect(() => {
    const fetchRepositories = async (query: string) => {
      if (query.trim() === "") {
        setRepositoryResults([]);
        return;
      }

      setIsLoading(true);
      const results = await getDockerRepositories(query);
      setRepositoryResults(results);
      setIsLoading(false);
    };

    const timer = setTimeout(() => {
      fetchRepositories(buffer);
    }, 300);

    return () => clearTimeout(timer);
  }, [buffer]);

  useEffect(() => {
    if (!repository) return;
    const fetchTags = async () => {
      const results = await getDockerTags(repository);
      setTagsResults(results);
    };

    const timer = setTimeout(() => {
      fetchTags();
    }, 300);

    return () => clearTimeout(timer);
  }, [repository]);

  useEffect(() => {
    setShowTagsInput(repository != null);
  }, [repository]);
  return (

    <> <Autocomplete
        freeSolo
        disablePortal
        loading={isLoading}
        options={repositoryResults}
        sx={{ width: 300 }}
        onInputChange={(_e, value) => setBuffer(value ?? "")}
        inputValue={buffer}
        size="small"
        renderInput={(params) => (
          <TextField
            {...params}
            label="Repositorio"
            placeholder="Escribe para buscar..."
            fullWidth
          />
        )}
        onChange={(_e, value) => setRepository(value)}
        value={repository}
      />

      <Autocomplete
        freeSolo
        disablePortal
        options={tagsResults}
        sx={{ width: 300 }}
        disabled={!showTagsInput}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tags"
            placeholder="Escribe para buscar..."
            fullWidth
          />
        )}
        onChange={(_e, value) => setSelectTag(value)}
        value={selectTag}
        size="small"
      /></>
   
  );
};

export default DockerInputs;
