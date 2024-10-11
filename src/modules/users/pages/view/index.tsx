import {  useSearchParams } from "react-router-dom";
import Profile from "../profile";
import { useEffect, useState } from "react";
import { UserSchemaType } from "../../../general/utils/validations/userSchema";
import { studentsData } from "../../utils/dataDummy/studentsDummy";

function ViewProfile() {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [user, setUser] = useState<UserSchemaType | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    const current_id = parseInt(id);
    const u = studentsData.filter((s) => s.code == current_id);
    setUser(u[0]);
  }, [id]);

  return (
    <>{user && <Profile ableToEdit={false} currentUser={user}></Profile>}</>
  );
}

export default ViewProfile;
