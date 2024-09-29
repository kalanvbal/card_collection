import { useEffect, useState } from "react";
import "./Communaute.css";
import DetailUser from "../../components/detailUser/DetailUser";

const Communaute = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const reponse = await fetch(process.env.REACT_APP_BACKEND_URL + "users");
      const json = await reponse.json();

      if (reponse.ok) {
        setUsers(json);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="CBL-communate-body">
      <div className="CBL-communate-users">
        {users &&
          users.map((user) => (
            <div key={user._id} className="CBL-communate-user">
              <DetailUser user={user} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Communaute;
