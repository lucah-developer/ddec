import { CLIENTS, PROJECTS } from "./data/projects";

test("el portfolio conserva los clientes y las obras del prototipo", () => {
  expect(CLIENTS).toHaveLength(6);
  expect(PROJECTS).toHaveLength(31);
  const casa = PROJECTS.find((p) => p.id === "casa-de-la-mujer");
  expect(casa).toBeTruthy();
  expect(casa.photos.length).toBeGreaterThan(3);
  expect(PROJECTS[0].id).toBe("comedor-utn");
  expect(casa.index).toBe(10);
});
