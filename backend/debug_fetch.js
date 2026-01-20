
const run = async () => {
    try {
        const res = await fetch('http://localhost:5000/api/advisory?category=All Crops'); // Or just base url if supported, but server filters
        // The server code: const { search, category, ... } = req.query; if (category && category !== "All Crops") query.category = category;
        // If I pass nothing, it should return all.
        const resAll = await fetch('http://localhost:5000/api/advisory');
        const data = await resAll.json();
        console.log("Total Count:", data.length);
        if (data.length > 0) {
            console.log("First Item Paths:", data.map(d => d.path));
            console.log("First Item Sample:", JSON.stringify(data[0], null, 2));
        }
    } catch (err) {
        console.error(err);
    }
};
run();
