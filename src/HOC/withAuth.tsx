const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
   // console.log("HOC Called");
    // additonal thing : we can check our redux store to check aqnd validaste everything
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      window.location.replace("/login");
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
