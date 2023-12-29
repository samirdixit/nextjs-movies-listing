import React from "react";
import Image from "next/image";
import iconLogout from "@/app/assets/images/icon-logout.svg";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";

const Logout = () => {
  const router = useRouter();

  // handler function for logging out and removing the token from localstorage
  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    router.push('/');
  };

  return (
    <>
      <Button variant="link" className="fw-semibold text-decoration-none p-0"  onClick={handleLogout}>
        <span className="d-none d-md-inline-block">Logout</span>
        <Image
          src={iconLogout}
          width={32}
          height={32}
          alt="icon-logout"
          className="ms-2"
        />
      </Button>
    </>
  );
};

export default Logout;
