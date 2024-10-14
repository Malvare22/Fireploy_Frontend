import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Profile from "@modules/users/pages/profile";
import { usersData } from "@modules/users/utils/dataDummy/usersDataDummy";
import { UserSchemaType } from "@modules/general/utils/validations/userSchema";

interface Props {
  isMine?: boolean;
  initEditing?: boolean;
  toRegister?: boolean;
  rol?: "E" | "D";
}

function ViewProfile({
  isMine,
  initEditing = false,
  toRegister = false,
  rol = "E",
}: Props) {
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");

  const templateUser: UserSchemaType = {
    code: 0,
    date: "0-0-0",
    email: "",
    genre: "M",
    img: "",
    name: "",
    lastName: "",
    rol: rol,
  };

  const ableToEdit = isMine || (localStorage.getItem("rol") as string) == "A";

  const [user, setUser] = useState<UserSchemaType | undefined>(undefined);

  useEffect(() => {
    let current_id: number;
    if (!id) {
      if (toRegister) setUser(templateUser);
      if (!isMine) return;
      current_id = parseInt(localStorage.getItem("code") as string);
    } else current_id = parseInt(id);
    console.log(current_id);
    const u = usersData.find((s) => s.code == current_id);
    setUser(u);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      {user && (
        <Profile
          ableToEdit={ableToEdit}
          currentUser={user}
          initEditing={ableToEdit && initEditing}
          isAdmin={(localStorage.getItem("rol") as string) == "A"}
          toRegister={toRegister && (localStorage.getItem("rol") as string) == "A"}
        ></Profile>
      )}
    </>
  );
}

export default ViewProfile;
