import { useSearchParams } from "react-router-dom";
import Profile from "../profile";
import { useEffect, useState } from "react";
import { UserSchemaType } from "../../../general/utils/validations/userSchema";
import { usersData } from "../../utils/dataDummy/usersDataDummy";

interface Props {
  isMine?: boolean;
  initEditing?: boolean;
}
function ViewProfile({ isMine, initEditing = false}: Props) {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const ableToEdit = isMine || (localStorage.getItem("rol") as string) == "A";


  const [user, setUser] = useState<UserSchemaType | undefined>(undefined);

  useEffect(() => {
    let current_id: number;
    if (!id) {
      if (!isMine) return;
      current_id = parseInt(localStorage.getItem("code") as string);
    } else current_id = parseInt(id);
    console.log(current_id);
    const u = usersData.find((s) => s.code == current_id);
    setUser(u);
  }, [id]);

  return (
    <>
      {user && (
        <Profile
          ableToEdit={ableToEdit}
          currentUser={user}
          initEditing={ableToEdit && initEditing}
          isAdmin={(localStorage.getItem("rol") as string) == "A"}
        ></Profile>
      )}
    </>
  );
}

export default ViewProfile;
