function logOut() {
  const out = document.getElementById("logout-button");
  if(out) {
    out.addEventListener("click", function() {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.reload();

    })
  }
}

export default logOut;