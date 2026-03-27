export const getHomeData = async () => {
  const res = await fetch("http://localhost:5000/");
  return res.json();
};