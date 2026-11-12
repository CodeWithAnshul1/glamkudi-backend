
import Product from "../models/product.js";

const generatesitemap = async (req, res) => {
  try {
    const products = await Product.find({}).select("_id");

    const producturls = products
      .map(
        (product) => `
          <url>
            <loc>https://glamkudi.in/product/${product._id}</loc>
          </url>
        `
      )
      .join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>https://glamkudi.in/</loc>
        </url>
        ${producturls}
      </urlset>`;

    return res
      .status(200)
      .type("application/xml")
      .send(sitemap);

  } catch (err) {
    console.log(err);
    return res.status(500).send("Unable to generate sitemap");
  }
};

export { generatesitemap };
