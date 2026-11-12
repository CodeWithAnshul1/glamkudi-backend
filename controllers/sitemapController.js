import Product from "../models/product";

const generatesitemap = async(req , res)=>{
    try{
        const product = await Product.find({}).select("_id");
        
        const producturls = product.map((product)=>` 
            
            <url>
                <loc>https://glamkudi.in/product/${product._id}</loc>
            
            </url>`)
            .join("");

            const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
                <urlset xmlns="http://www.sitemap.org/schema/sitemap/0.9">
                    <url>
                    <loc>https://glamkudi.in/</loc>
                    </url>
                    ${producturls}

                    </urlset>`;

                    res.set("content-Type","application/xml");
                    return res.status(200).json({sitemap:sitemap});

    }catch(err){
        console.log(err);
        return res.status(500).json("unable to generate sitemap");

    }
}
export default generatesitemap;