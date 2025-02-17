const reRender = async (component) => {
  document.getElementById("app").innerHTML = await component.render();
  await component.afterRender();
};
export default reRender;
