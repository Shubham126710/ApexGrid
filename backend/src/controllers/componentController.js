const componentService = require("../services/componentService");

const getAllComponents = async (req, res) => { try { res.json(await componentService.getAllComponents(req.user?.teamId)); } catch (error) { res.status(500).json({ error: error.message }); } };
const getComponentById = async (req, res) => { try { const data = await componentService.getComponentById(req.params.id); if (!data) return res.status(404).json({ error: "Not found" }); res.json(data); } catch (error) { res.status(500).json({ error: error.message }); } };
const createComponent = async (req, res) => { try { res.status(201).json(await componentService.createComponent(req.body)); } catch (error) { res.status(500).json({ error: error.message }); } };
const updateComponent = async (req, res) => { try { res.json(await componentService.updateComponent(req.params.id, req.body)); } catch (error) { res.status(500).json({ error: error.message }); } };
const deleteComponent = async (req, res) => { try { await componentService.deleteComponent(req.params.id); res.status(204).send(); } catch (error) { res.status(500).json({ error: error.message }); } };

module.exports = { getAllComponents, getComponentById, createComponent, updateComponent, deleteComponent };
