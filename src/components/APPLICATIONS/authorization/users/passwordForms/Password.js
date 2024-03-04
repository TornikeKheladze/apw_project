import { useState } from "react";
import CheckPasswordForm from "./checkPasswordForm/CheckPasswordForm";
import NewPasswordForm from "./newPasswordForm/NewPasswordForm";

const Password = () => {
  const [isUserValid, setIsUserValid] = useState(null);
  return (
    <div>
      {!isUserValid ? (
        <CheckPasswordForm
          isUserValid={isUserValid}
          setIsUserValid={setIsUserValid}
        />
      ) : (
        <NewPasswordForm />
      )}
    </div>
  );
};

export default Password;
