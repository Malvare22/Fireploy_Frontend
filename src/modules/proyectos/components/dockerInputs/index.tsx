import {
  getDockerRepositories,
  getDockerTags,
} from "@modules/proyectos/services/get.docker.information";
import { Autocomplete, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

type DockerInputsProps = {
  repositoryInitial?: string | null;
  tagInitial?: string | null;
  onChange: (repository: string | null, tag: string | null, ...args: any[]) => void;
};
export const DockerInputs: React.FC<DockerInputsProps> = ({
  repositoryInitial,
  tagInitial,
  onChange,
}) => {
  const [repository, setRepository] = useState<string | null>("");
  const [selectTag, setSelectTag] = useState<string | null>("");
  const [buffer, setBuffer] = useState<string>("");
  const [showTagsInput, setShowTagsInput] = useState<boolean>(false);
  const [tagsResults, setTagsResults] = useState<string[]>([]);

  useEffect(() => {
    if (repositoryInitial && tagInitial) {
      setRepository(repositoryInitial);
      setSelectTag(tagInitial);
    }
  }, []);

  const {
    data: repositoriesDocker,
    error: errorRepositories,
    mutate: mutateRepositories,
    isPending: isPendingRepositories,
  } = useMutation({
    mutationFn: () => getDockerRepositories(buffer ?? ""),
    mutationKey: ["Get Docker Repositories", buffer],
  });

  const {
    data:tagsDocker,
    error: errorTag,
    mutate: mutateTag,
    isPending: isPendingTag,
  } = useMutation({
    mutationFn: () => getDockerTags(repository ?? ''),
    mutationKey: ["Get Docker Tags", repository],
    onSuccess: setTagsResults
  });

  useEffect(() => {
    onChange(repository, selectTag);
  }, [repository, selectTag]);

  useEffect(() => {
    setSelectTag(null);

    if (buffer.trim() === "") {
      return;
    }

    const timer = setTimeout(() => {
      mutateRepositories();
    }, 300);

    return () => clearTimeout(timer);
  }, [buffer]);

  useEffect(() => {
    setShowTagsInput(repository != null);
    if (!repository) {
      return;
    }
    const timer = setTimeout(() => {
      mutateTag();
    }, 300);

    return () => clearTimeout(timer);
  }, [repository]);

  return (
    <>
      <Autocomplete
        freeSolo
        disablePortal
        loading={isPendingRepositories}
        options={repositoriesDocker || []}
        sx={{ width: 300 }}
        onInputChange={(_e, value) => setBuffer(value)}
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
        loading={isPendingTag}
        renderInput={(params) => (
          <TextField {...params} label="Tags" placeholder="Escribe para buscar..." fullWidth />
        )}
        onChange={(_e, value) => setSelectTag(value)}
        value={selectTag}
        size="small"
      />
    </>
  );
};

export default DockerInputs;
