module.exports = (app, Item) => {
    // Create Item
    app.post('/items', async (req, res) => {
        try {
            const { name, description, price } = req.body;
            const newItem = new Item({ name, description, price });
            await newItem.save();
            res.status(201).json(newItem);
        } catch (err) {
            res.status(500).json({ error: 'Failed to create item', details: err.message });
        }
    });

    // Get all Items
    app.get('/items', async (req, res) => {
        try {
            const items = await Item.find();
            res.status(200).json(items);
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch items', details: err.message });
        }
    });

    // Get Item by ID
    app.get('/items/:id', async (req, res) => {
        try {
            const item = await Item.findById(req.params.id);
            if (!item) {
                return res.status(404).json({ error: 'Item not found' });
            }
            res.status(200).json(item);
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch item', details: err.message });
        }
    });

    // Update Item by ID
    app.put('/items/:id', async (req, res) => {
        try {
            const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedItem) {
                return res.status(404).json({ error: 'Item not found' });
            }
            res.status(200).json(updatedItem);
        } catch (err) {
            res.status(500).json({ error: 'Failed to update item', details: err.message });
        }
    });

    // Delete Item by ID
    app.delete('/items/:id', async (req, res) => {
        try {
            const deletedItem = await Item.findByIdAndDelete(req.params.id);
            if (!deletedItem) {
                return res.status(404).json({ error: 'Item not found' });
            }
            res.status(200).json({ message: 'Item deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: 'Failed to delete item', details: err.message });
        }
    });
};
