export const getMenu = async () => {
  const { data } = await api.get("/categories/menu");
  return data;
};