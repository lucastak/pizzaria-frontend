// product.test.js

import { render, fireEvent, waitFor } from "@testing-library/react";
import Product from "../../../src/pages/product";

describe("Product Component", () => {
  it("renders product page", async () => {
    const categoryList = [{ id: "1", name: "Categoria 1" }];
    const element = render(<Product categoryList={categoryList} />);

    await waitFor(() => {
      const pageTitle = element.getByTestId("product-container")
      expect(pageTitle).toBeTruthy();
    });
  });
});
