import { Category, CategoryProperties } from "./category";
import { omit } from "lodash";
import UniqueEntityId from "../../../@core/domain/unique-entity-id.vo";

describe("Category Unit Tests", () => {
  test("constructor of category", () => {
    let category = new Category({ name: "Movie" });
    let props = omit(category.props, "created_at");
    expect(props).toStrictEqual({
      name: "Movie",
      description: null,
      is_active: true,
    });
    expect(category.props.created_at).toBeInstanceOf(Date);

    category = new Category({
      name: "Movie",
      description: "Movie description",
      is_active: false,
    });
    let created_at = new Date();
    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "Movie description",
      is_active: false,
      created_at,
    });

    category = new Category({
      name: "Movie",
      description: "Some description",
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      description: "Some description",
    });

    category = new Category({
      name: "Movie",
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      is_active: true,
    });

    category = new Category({
      name: "Movie",
      created_at,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      created_at,
    });
  });

  test("variations of id prop", () => {
    type CategoryData = { props: CategoryProperties; id?: UniqueEntityId };

    const data: CategoryData[] = [
      { props: { name: "Movie" } },
      { props: { name: "Movie" }, id: null },
      { props: { name: "Movie" }, id: undefined },
      {
        props: { name: "Movie" },
        id: new UniqueEntityId("a9e2250a-6a6e-4d85-bdf9-fae56a25ec7e"),
      },
    ];

    data.forEach((item) => {
      const category = new Category(item.props, item.id as any);
      expect(category.id).not.toBeNull();
      expect(category.id).toBeInstanceOf(UniqueEntityId);
    });
  });

  test("getter of name prop", () => {
    const category = new Category({ name: "Movie" });
    expect(category.name).toBe("Movie");
  });

  test("getter and setter of description prop", () => {
    type CategoryData = { props: CategoryProperties };

    let data: CategoryData[] = [
      { props: { name: "Movie" } },
      { props: { name: "Movie", description: undefined } },
      { props: { name: "Movie", description: null } },
    ];

    data.forEach((item) => {
      const category = new Category(item.props);
      expect(category.description).toBeNull();
    });

    data = [
      { props: { name: "Movie", description: "Movie description" } },
      { props: { name: "Movie" } },
    ];

    data.forEach((item) => {
      const category = new Category(item.props);
      item.props.description =
        item.props.description ??
        (item.props["description"] = "Other description");
      expect(category.description).toBe(item.props.description);
    });
  });

  test("getter and setter of is_active prop", () => {
    let category = new Category({
      name: "Movie",
    });
    expect(category.is_active).toBeTruthy();

    category = new Category({
      name: "Movie",
      is_active: true,
    });
    expect(category.is_active).toBeTruthy();

    category = new Category({
      name: "Movie",
      is_active: false,
    });
    expect(category.is_active).toBeFalsy();
  });
});

test("getter and setter of created_at prop", () => {
  let category = new Category({
    name: "Movie",
  });
  expect(category.created_at).toBeInstanceOf(Date);

  let created_at = new Date();
  category = new Category({
    name: "Movie",
    created_at,
  });
  expect(category.created_at).toBe(created_at);
});
