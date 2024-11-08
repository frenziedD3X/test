module.exports = (app, Item) => {

    // Create Item (POST)
    app.post('/items', async (req, res) => {
        try {
            const newItem = new Item(req.body);
            await newItem.save();
            res.status(201).json(newItem);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    // Get all Items (GET)
    app.get('/items', async (req, res) => {
        try {
            const items = await Item.find();
            res.status(200).json(items);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    // Get a specific Item by ID (GET)
    app.get('/items/:id', async (req, res) => {
        try {
            const item = await Item.findById(req.params.id);
            if (!item) return res.status(404).json({ message: "Item not found" });
            res.status(200).json(item);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    // Update Item (PUT)
    app.put('/items/:id', async (req, res) => {
        try {
            const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedItem) return res.status(404).json({ message: "Item not found" });
            res.status(200).json(updatedItem);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    // Delete Item (DELETE)
    app.delete('/items/:id', async (req, res) => {
        try {
            const deletedItem = await Item.findByIdAndDelete(req.params.id);
            if (!deletedItem) return res.status(404).json({ message: "Item not found" });
            res.status(200).json({ message: "Item deleted successfully" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
};
